import React, { useState, useEffect } from "react";
import Post from "./Post_wyd";
// import Navbar from "./PostNavbar";
import AppHeader from "../AppHeader";
import "./BrowserPage_wyd.css"; // 导入样式文件
import axios from "../../http.js";

const BrowserPage_wyd = ({  searchResults, setSearchResults}) => {
  //请求Post数据

  const [posts, setPosts] = useState([]); // 存储所有帖子数据的状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页数

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      // 如果有searchResults且其中有内容，则直接使用searchResults
      setPosts(searchResults);
      console.log("setSearchResults-browser:", searchResults);
    } else if (posts.length === 0) {
      // 如果searchResults为空，则从后端拉取帖子内容
      fetchPosts(1);
    }
  }, [searchResults]);

  // 请求获取帖子数据的函数
  const fetchPosts = async (page) => {
    try {
      // 发送请求获取帖子数据
      const user_id = localStorage.getItem("user_id");
      const response = await axios.get("/post/public", {
        params: { user_id, page },
      });
      console.log(response.data);
      // 合并新获取到的数据和已有的数据
      // 这里可以根据需要修改，比如按照分页来获取数据等
      // const startIndex = (page - 1) * 1; // 假设每页显示1条数据
      // const endIndex = startIndex + 1;
      const mockdata = response.data.post_list;
      // const mockdata = postsData.slice(startIndex, endIndex);
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

  return (
    <div className="container-bp">
         <AppHeader setSearchResults={setSearchResults} />
      <div className="main-bp">
        {/* 遍历帖子数据，为每个帖子渲染一个Post组件 */}
        {posts.map((post) => (
          <Post key={post.ID} post={post} />
        ))}
        <button className="btn-load" onClick={loadMorePosts}>
          load more...
        </button>
      </div>
    </div>
  );
};

export default BrowserPage_wyd;