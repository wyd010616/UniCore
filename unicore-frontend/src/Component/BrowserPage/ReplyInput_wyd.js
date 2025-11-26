import React, { useState } from "react";
import "./ReplyInput_wyd.css";

const ReplyInput = ({ parent_id, reply_to, reply_to_whom, onReply }) => {
  const [content, setContent] = useState("");

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    if (content.trim() === "") {
      return;
    }
    const replyData = {
      reply_to: reply_to.toString(), // 直接回复的目标（无论回复的是主帖还是已有回复）的自身post_id
      parent_id: parent_id.toString(), // 所在主帖的post_id
      user_id: localStorage.getItem("user_id"),
      content:
        reply_to === parent_id ? content : `Re ${reply_to_whom}: ${content}`, // 如果回复的是回复，则在开头加上被回复人的昵称（reply_to等于parent_id代表回复的是主帖）
    };
    onReply(replyData);
    setContent("");
  };

  return (
    <div className="container-replyinput">
      <textarea
        className="input-reply"
        value={content}
        onChange={handleInputChange}
        placeholder="kind words bond; harsh words wound :D"
      ></textarea>
      <button onClick={handleSubmit} className="btnrplyinput-submit">
        submit
      </button>
    </div>
  );
};

export default ReplyInput;
