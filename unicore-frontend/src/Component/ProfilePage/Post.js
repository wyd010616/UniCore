// import { Link } from "react-router-dom";
import React from "react";
import "./Post.css";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Avatar,
  IconButton,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";

function PostCard({ post }) {
  console.log(post);
  return (
    <Card
      key={post.ID}
      variant="outlined"
      style={{ marginBottom: "16px", cursor: "pointer" }}
      //   onClick={() => window.open(post.url, "_blank")}
    >
      <CardActionArea>
        <CardContent style={{ display: "flex", alignItems: "center" }}>
          {/* 上部分：发帖人的头像、昵称和时间 */}
          <Avatar sx={{ marginRight: "10px" }}>{post.nick_name[0]}</Avatar>
          <div>
            <Typography variant="subtitle1">{post.nick_name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {post.create_time}
            </Typography>
          </div>
        </CardContent>
        <CardContent>
          {/* 下部分：帖子标题，并设置超链接点击跳转到帖子 */}
          <Typography variant="h6">
            <Link href={"/"} target="_blank" rel="noopener noreferrer">
              {post.content}
            </Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* 下部分：赞成和反对按钮以及评论图标 */}
        <div>
          <Button
            startIcon={<FavoriteIcon />}
            size="small"
            style={{ marginRight: "8px" }}
          >
            Favoriite
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton size="small">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {post.comments} replies
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
}

export default PostCard;
