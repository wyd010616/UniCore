import React, { useState } from "react";

const ReplyInput = ({ postId, replyContentId, onReply }) => {
  const [content, setContent] = useState("");

  const handleInputChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    if (content.trim() === "") {
      return;
    }
    const replyData = {
      post_id: postId,
      replycontent_id: replyContentId,
      self_id: 123, // 假设当前用户的ID为123
      content: content
    };
    onReply(replyData);
    setContent("");
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={handleInputChange}
        placeholder="输入回复内容"
      ></textarea>
      <button onClick={handleSubmit}>提交回复</button>
    </div>
  );
};

export default ReplyInput;