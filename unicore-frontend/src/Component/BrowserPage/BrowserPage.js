import React, { useState, useEffect } from "react";
import Post from "./Post";
import Navbar from "./PostNavbar";
import { postsData } from "./data";
import axios from "../../http.js";

import "./BrowserPage.css"; // 导入样式文件
import AppHeader from "../AppHeader";

const ParentComponent = () => {
  //请求Post数据
  const [posts, setPosts] = useState([]); // 存储所有帖子数据的状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页数

  useEffect(() => {
    // 初始化加载第一页的帖子数据
    fetchPosts(1);
  }, []); // 只在组件加载时执行一次

  // 请求获取帖子数据的函数
  const fetchPosts = async (page) => {
    try {
      // 发送请求获取帖子数据
      //const response = await axios.get(`/api/posts?page=${page}`);
      // 合并新获取到的数据和已有的数据
      // 这里可以根据需要修改，比如按照分页来获取数据等
      const startIndex = (page - 1) * 1; // 假设每页显示1条数据
      const endIndex = startIndex + 1;
      const mockdata = postsData.slice(startIndex, endIndex);
      //setPosts(prevPosts => [...prevPosts, ...response.data]);
      setPosts((prevPosts) => [...prevPosts, ...mockdata]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // 加载更多帖子数据
  const loadMorePosts = () => {
    const nextPage = currentPage + 1;
    fetchPosts(nextPage);
    setCurrentPage(nextPage);
  };
  // 处理用户提交回复的函数
  const handleReply = (replyData) => {
    console.log("New reply:", replyData);
    // 在这里可以执行一些操作，比如将回复发送到后端保存
  };

  return (
    <div className="container">
      <AppHeader />
      <Navbar /> {/* 导航栏组件 */}
      {/* 遍历帖子数据，为每个帖子渲染一个Post组件 */}
      {posts.map((post) => (
        <Post key={post.ID} post={post} onReply={handleReply} />
      ))}
      <button onClick={loadMorePosts}>加载更多</button>
    </div>
  );
};

export default ParentComponent;
