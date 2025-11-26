import React from "react";
import "./Reply.css";
import { getUniversityNameById } from "../../utils/universities";

const Reply = ({ reply }) => {
  return (
    <div className="container-reply">
      <p className="reply-id">post_id: {reply.ID}</p>
      <p className="reply-school">{getUniversityNameById(reply.school)}</p>
      <p className="reply-content">
        [{reply.nick_name}] {reply.content}
      </p>
      <p className="reply-time">date: {reply.create_time}</p>
    </div>
  );
};

export default Reply;
