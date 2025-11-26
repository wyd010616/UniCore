import { render, screen, waitFor } from "@testing-library/react";
import axios from "../../http.js";
import MyLikesOrPosts from "./MyLikes";
import React from "react";

jest.mock("../../http.js");

describe("MyLikesOrPosts component", () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  test("renders correctly with liked posts", async () => {
    const mockPosts = [
      { ID: 1, title: "Post 1" },
      { ID: 2, title: "Post 2" },
    ];
    axios.get.mockResolvedValueOnce({ data: { post_list: mockPosts } });

    render(<MyLikesOrPosts type="likes" count={2} />);

    await waitFor(() => {
      const postElements = screen.getAllByTestId("post");
      expect(postElements).toHaveLength(2);
      expect(screen.getByText("2 Likes")).toBeInTheDocument();
    });
  });

  test("renders correctly with no liked posts", async () => {
    axios.get.mockResolvedValueOnce({ data: { post_list: [] } });

    render(<MyLikesOrPosts type="likes" count={0} />);

    await waitFor(() => {
      expect(screen.getByText("0 Likes")).toBeInTheDocument();
      expect(screen.queryByTestId("post")).toBeNull();
    });
  });

  test("fetches posts when type changes", async () => {
    const mockPosts = [
      { ID: 1, title: "Post 1" },
      { ID: 2, title: "Post 2" },
    ];
    axios.get.mockResolvedValueOnce({ data: { post_list: mockPosts } });

    const { rerender } = render(<MyLikesOrPosts type="likes" count={2} />);

    await waitFor(() => {
      expect(screen.getByText("2 Likes")).toBeInTheDocument();
      expect(screen.getAllByTestId("post")).toHaveLength(2);
    });

    axios.get.mockResolvedValueOnce({ data: { post_list: [] } });

    rerender(<MyLikesOrPosts type="posts" count={0} />);

    await waitFor(() => {
      expect(screen.getByText("0 Posts")).toBeInTheDocument();
      expect(screen.queryByTestId("post")).toBeNull();
    });

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith("/post/like?user_id=123&page=1");
    expect(axios.get).toHaveBeenCalledWith("/post/user?user_id=123&page=1");
  });
});
