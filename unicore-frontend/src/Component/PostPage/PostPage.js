import React, { useState } from "react";
import AppHeader from "../AppHeader.jsx";
import axios from "../../http.js"; // 引入axios
import "./PostPage.css";
import { useNavigate } from "react-router-dom";

const PostPage = ({ userid }) => {
  // 从 props 中接收 userid
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePost = () => {
    if (content.trim() === "") {
      console.log("请输入帖子内容"); //这个只会打印在控制台
      alert("nothing to say...?");
      return;
    }

    const newPost = {
      content: content,
      user_id: localStorage.getItem("user_id"), // 从 localStorage 中获取 user_id
      type: "0", // public post
    };

    console.log("新帖子对象：", newPost);

    // 使用axios发送POST请求
    axios
      .post("post/create", newPost)
      .then((response) => {
        console.log("帖子创建成功:", response.data);
        // 可以在这里处理服务器的响应，比如显示创建成功的消息

        navigate("/browser"); // 跳转到主页
      })
      .catch((error) => {
        console.log("帖子创建失败:", error);
        // 可以在这里处理错误情况，比如显示错误消息
      });

    // 清空输入框
    setContent("");
  };

  return (
    <div className="container-pp">
      <AppHeader />
      <main className="main-pp">
        <textarea
          class="input-pp"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="say something, we are all ears :)"
        />
        <button className="btn-post" onClick={handlePost}>
          POST
        </button>
      </main>
    </div>
  );
};

export default PostPage;
