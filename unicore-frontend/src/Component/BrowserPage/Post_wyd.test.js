import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Post from "./Post_wyd";
import React from "react";

jest.mock("axios");

describe("Post component", () => {
  const post = {
    ID: 1,
    content: "Test post",
    like: false,
    like_count: 0,
    reply: 0,
    school: "Test School",
    create_time: "2022-01-01",
  };

  test("renders post correctly", () => {
    render(<Post post={post} />);
    const postContent = screen.getByText("Test post");
    expect(postContent).toBeInTheDocument();
    const likeButton = screen.getByRole("button", { name: "0" });
    expect(likeButton).toBeInTheDocument();
  });

  test("toggles replies when 'show comments' button is clicked", () => {
    render(<Post post={post} />);
    const showCommentsButton = screen.getByRole("button", {
      name: "0 comments",
    });
    fireEvent.click(showCommentsButton);
    const hideCommentsButton = screen.getByRole("button", {
      name: "hide comments",
    });
    expect(hideCommentsButton).toBeInTheDocument();
  });

  test("handles like button click correctly", () => {
    render(<Post post={post} />);
    const likeButton = screen.getByRole("button", { name: "0" });
    fireEvent.click(likeButton);
    expect(axios.post).toHaveBeenCalledWith("/like/add", {
      post_id: "1",
      user_id: localStorage.getItem("user_id"),
    });
    fireEvent.click(likeButton);
    expect(axios.post).toHaveBeenCalledWith("/like/delete", {
      post_id: "1",
      user_id: localStorage.getItem("user_id"),
    });
  });
});
