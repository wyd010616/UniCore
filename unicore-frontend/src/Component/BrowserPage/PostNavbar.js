import React, { useState } from "react";
import axios from "../../http.js"; // 引入axios

const Navbar = ({ userid }) => { // 从 props 中接收 userid
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim() === "") {
      console.log("请输入帖子内容");
      alert("write something...");
      return;
    }

    const newPost = {
      content: content,
      user_id: "1003", // 修改此处为使用传入的userid
      type: "0"
    };

    console.log("新帖子对象：", newPost);

    // 使用axios发送POST请求
    axios.post('post/create', newPost)
      .then(response => {
        console.log('帖子创建成功:', response.data);
        // 可以在这里处理服务器的响应，比如显示创建成功的消息
      })
      .catch(error => {
        console.log('帖子创建失败:', error);
        // 可以在这里处理错误情况，比如显示错误消息
      });

    // 清空输入框
    setContent("");
  };

  return (
    <div className="navbar">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="输入帖子内容"
      />
      <button onClick={handlePost}>发帖</button>
    </div>
  );
};

export default Navbar;
