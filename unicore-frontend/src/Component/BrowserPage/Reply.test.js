import { render, screen } from "@testing-library/react";
import Reply from "./Reply";
import React from "react";
import { getUniversityNameById } from "../../utils/universities";

describe("Reply component", () => {
  const reply = {
    ID: 1,
    school: 112,
    create_time: "2022-01-01",
    content: "Some reply content",
    nick_name: "John Doe",
  };

  test("renders reply ID correctly", () => {
    render(<Reply reply={reply} />);
    const replyId = screen.getByText(`post_id: ${reply.ID}`);
    expect(replyId).toBeInTheDocument();
  });

  test("renders reply school correctly", () => {
    render(<Reply reply={reply} />);
    const replySchool = screen.getByText(getUniversityNameById(reply.school));
    expect(replySchool).toBeInTheDocument();
  });

  test("renders reply content correctly", () => {
    render(<Reply reply={reply} />);
    const replyContent = screen.getByText(
      `[${reply.nick_name}] ${reply.content}`
    );
    expect(replyContent).toBeInTheDocument();
  });

  test("renders reply create time correctly", () => {
    render(<Reply reply={reply} />);
    const replyTime = screen.getByText(`date: ${reply.create_time}`);
    expect(replyTime).toBeInTheDocument();
  });
});
