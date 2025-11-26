import React, { useState, useEffect } from "react";
import Reply from "./Reply";
import ReplyInput from "./ReplyInput_wyd";
import { repliesData } from "./data"; // 导入测试回复数据
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import axios from "../../http.js";
import "./Post_wyd.css";
import { getUniversityNameById } from "../../utils/universities";

const Post = ({ post }) => {
  console.log("post_wyd:", post);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [activeReplyInput, setActiveReplyInput] = useState({}); // 记录当前激活的回复输入框
  const [currentPage, setCurrentPage] = useState(1); // 当前页数
  const [hasLoadedReplies, setHasLoadedReplies] = useState(false); // 新增状态，检查是否已加载过回复
  const [isLiked, setisLiked] = useState(false); //检验是否点赞

  useEffect(() => {
    // 仅在组件加载时设置初始状态，不再依赖 showReplies
    setisLiked(post.like);
  }, [post.ID]);

  // // update reply after post a new reply
  // useEffect(() => {
  //   // 每次回复数据发生变化时，更新回复列表
  //   console.log("Replies updated:", replies);
  // }, [replies]);

  // 处理用户提交回复的函数
  const handleReply = async (replyData) => {
    console.log("New reply:", replyData);
    const response = await axios.post("/reply/create", replyData); // 将回复发送到后端保存
    console.log("Reply created:", response.data);
    setReplies((prevReplies) => [...prevReplies, ...[response.data.reply]]); // 更新回复列表
  };

  // 请求回复数据的函数
  const fetchReplies = async (postId, page) => {
    try {
      // const filteredReplies = repliesData.filter(
      //   (reply) => reply.ID === postId
      // );
      const response = await axios.get(
        `/reply/get?parent_id=${postId}&page=${page}`
      );
      // const startIndex = (page - 1) * 1; // 假设每页显示1条数据
      // const endIndex = startIndex + 1;
      // const mockdata = filteredReplies.slice(startIndex, endIndex);
      setReplies((prevReplies) => [...prevReplies, ...response.data.repl_list]);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  // 加载更多回复数据
  const loadMoreReplies = () => {
    const nextPage = currentPage + 1;
    fetchReplies(post.ID, nextPage);
    setCurrentPage(nextPage);
  };

  const toggleReplies = () => {
    if (!hasLoadedReplies && !showReplies) {
      // 第一次尝试显示回复时加载数据
      fetchReplies(post.ID, 1);
      setHasLoadedReplies(true); // 设置已加载回复的状态
    }
    setShowReplies(!showReplies);
  };

  const toggleInput = (replyId) => {
    setActiveReplyInput((prevState) => ({
      ...prevState,
      [replyId]: !prevState[replyId], // 切换指定回复ID的激活状态
    }));
  };

  const handleLike = () => {
    // Toggle the 'liked' state
    setisLiked(!isLiked);
    if (!isLiked) {
      post.like_count = post.like_count + 1;
      // 同时把这个post_id消息传到后端，记录在用户的喜欢列表
      axios.post("/like/add", {
        post_id: post.ID.toString(),
        user_id: localStorage.getItem("user_id"),
      });
    } else {
      post.like_count = post.like_count - 1;
      axios.post("/like/delete", {
        post_id: post.ID.toString(),
        user_id: localStorage.getItem("user_id"),
      });
    }
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <span className="post-header-id">PostId:{post.ID}</span>
        <span className="post-header-school">
          {getUniversityNameById(post.school)}
        </span>
        <span className="post-header-timestamp">Time：{post.create_time}</span>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="btn-commmentlike">
        <button onClick={toggleReplies} className="postbtn-show">
          {showReplies ? "hide comments" : post.reply + " comments"}
        </button>
        <button className="btn-like" onClick={handleLike}>
          {isLiked ? (
            <ThumbUpAltIcon
              fontSize="inherit"
              sx={{ fontSize: "20px", marginRight: "5px" }}
            />
          ) : (
            <ThumbUpOffAltIcon
              fontSize="inherit"
              sx={{ fontSize: "20px", marginRight: "5px" }}
            />
          )}
          {post.like_count}
        </button>
      </div>
      {/* 展开评论&发出评论 */}
      {showReplies && (
        <ReplyInput
          parent_id={post.ID} // 由于是直接回复主帖，parent_id = reply_to = 主帖的id
          reply_to={post.ID} // reply_to就是回复目标的id
          reply_to_whom={post.nick_name} // 回复的用户的昵称
          onReply={handleReply}
        />
      )}
      {/* <button onClick={() => toggleInput(post.selfcontent_id)} className="postbtn-mkrply">
      {activeReplyInput[post.selfcontent_id] ? "clear input" : "make comments"} 
      </button>
      {activeReplyInput[post.selfcontent_id] && (
        <ReplyInput postId={post.ID} replyContentId={post.selfcontent_id} onReply={onReply} />
      )} */}
      {showReplies && replies.length > 0 && (
        <>
          {replies.map((reply) => (
            <div key={reply.selfcontent_id} className="reply-section">
              <Reply reply={reply} />
              <button
                onClick={() => toggleInput(reply.ID)}
                className="postbtn-show"
              >
                {activeReplyInput[reply.ID] ? "clear input" : "reply"}
              </button>
              {activeReplyInput[reply.ID] && (
                <ReplyInput
                  parent_id={reply.parent_id} // 回复所在的主帖的帖子id，和原有回复的parent_id一致（都在同一个主帖）
                  reply_to={reply.ID} // **对已有的回复进行回复**，即直接回复目标的id
                  reply_to_whom={reply.nick_name} // 回复的用户的昵称
                  onReply={handleReply}
                />
              )}
            </div>
          ))}
          <button onClick={loadMoreReplies} className="postbtn-load">
            load more comments...
          </button>
        </>
      )}
    </div>
  );
};

export default Post;
