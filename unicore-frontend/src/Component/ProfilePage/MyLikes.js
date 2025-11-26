import React, { useState, useEffect } from "react";
import Postcard from "./Post";
import Post from "../BrowserPage/Post_wyd.js";
import { Typography, Divider, Box } from "@mui/material";
import axios from "../../http.js";

function MyLikesOrPosts({ type, count }) {
  // 每次变换type，整个组件都会重新渲染（并调用fetchPosts），所以不需要useEffect包裹fetchPosts
  const [likedPosts, setLikedPosts] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const params = new URLSearchParams({ user_id, page: 1 });

  useEffect(() => {
    axios
      .get(type === "posts" ? `/post/user?${params}` : `/post/like?${params}`)
      .then((res) => {
        console.log(res);
        setLikedPosts(res.data.post_list || []);
      });
  }, [type]); // 当type变化时重新获取数据

  return (
    <div className="my-likes-container">
      <Box marginBottom={2}>
        <Typography variant="h7" component="span">
          {count}{" "}
          {count === 1
            ? type === "likes"
              ? "Like"
              : "Post"
            : type === "likes"
            ? "Likes"
            : "Posts"}
        </Typography>
      </Box>
      {likedPosts.map((post) => (
        <Post key={post.ID} post={post} />
        // <Postcard post={post} />
      ))}
    </div>
  );
}

export default MyLikesOrPosts;
