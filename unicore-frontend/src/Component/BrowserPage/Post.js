import React, { useState, useEffect } from "react";
import Reply from "./Reply";
import ReplyInput from "./ReplyInput";
import { repliesData } from "./data"; // 导入测试回复数据
import axios from "axios";
import "./Post.css";

const Post = ({ post, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [activeReplyInput, setActiveReplyInput] = useState({}); // 记录当前激活的回复输入框
  const [currentPage, setCurrentPage] = useState(1); // 当前页数
  const [hasLoadedReplies, setHasLoadedReplies] = useState(false); // 新增状态，检查是否已加载过回复

  useEffect(() => {
    // 仅在组件加载时设置初始状态，不再依赖 showReplies
  }, [post.ID]);

  // 请求回复数据的函数
  const fetchReplies = async (postId, page) => {
    try {
      const filteredReplies = repliesData.filter(
        (reply) => reply.ID === postId
      );
      //const response = await axios.get(`/api/replies/${postId}?page=${page}`); // 假设API的路由是/api/replies/:postId
      const startIndex = (page - 1) * 1; // 假设每页显示1条数据
      const endIndex = startIndex + 1;
      const mockdata = filteredReplies.slice(startIndex, endIndex);
      //setPosts(prevPosts => [...prevPosts, ...response.data]);
      setReplies((prevReplies) => [...prevReplies, ...mockdata]);
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

  const toggleInput = (contentId) => {
    setActiveReplyInput((prevState) => ({
      ...prevState,
      [contentId]: !prevState[contentId], // 切换指定selfcontent_id的激活状态
    }));
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <span className="post-header-id">Postid:{post.ID}</span>
        <span className="post-header-timestamp">
          Time：{post.timestamp}
        </span>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <button onClick={toggleReplies}>
        {showReplies ? "隐藏回复" : "查看回复"}
      </button>
      <button onClick={() => toggleInput(post.selfcontent_id)}>
        {activeReplyInput[post.selfcontent_id] ? "取消输入" : "输入回复"}
      </button>
      {activeReplyInput[post.selfcontent_id] && (
        <ReplyInput
          postId={post.ID}
          replyContentId={post.selfcontent_id}
          onReply={onReply}
        />
      )}
      {showReplies && replies.length > 0 && (
        <>
          {replies.map((reply) => (
            <div key={reply.selfcontent_id}>
              <Reply reply={reply} />
              <button onClick={() => toggleInput(reply.selfcontent_id)}>
                {activeReplyInput[reply.selfcontent_id]
                  ? "取消输入"
                  : "输入回复"}
              </button>
              {activeReplyInput[reply.selfcontent_id] && (
                <ReplyInput
                  postId={post.ID}
                  replyContentId={reply.selfcontent_id}
                  onReply={onReply}
                />
              )}
            </div>
          ))}
          <button onClick={loadMoreReplies}>加载更多回复</button>
        </>
      )}
    </div>
  );
};

export default Post;
