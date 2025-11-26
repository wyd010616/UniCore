import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import BrowserPage_wyd from "./BrowserPage_wyd";
import React from "react";

jest.mock("axios");

describe("BrowserPage_wyd component", () => {
  const mockPosts = [
    {
      ID: 1,
      title: "Post 1",
      content: "Some post content",
    },
    {
      ID: 2,
      title: "Post 2",
      content: "Some post content",
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: { post_list: mockPosts } });
  });

  test("renders posts correctly", async () => {
    render(<BrowserPage_wyd />);

    // Wait for posts to be rendered
    await waitFor(() => {
      const postElements = screen.getAllByTestId("post");
      expect(postElements.length).toBe(mockPosts.length);
    });
  });

  test("loads more posts when 'load more' button is clicked", async () => {
    render(<BrowserPage_wyd />);

    // Wait for initial posts to be rendered
    await waitFor(() => {
      const postElements = screen.getAllByTestId("post");
      expect(postElements.length).toBe(mockPosts.length);
    });

    // Mock the response for the second page of posts
    const mockNextPagePosts = [
      {
        ID: 3,
        title: "Post 3",
        content: "Some post content",
      },
      {
        ID: 4,
        title: "Post 4",
        content: "Some post content",
      },
    ];
    axios.get.mockResolvedValueOnce({ data: { post_list: mockNextPagePosts } });

    // Click the 'load more' button
    fireEvent.click(screen.getByText("load more..."));

    // Wait for the second page of posts to be rendered
    await waitFor(() => {
      const postElements = screen.getAllByTestId("post");
      expect(postElements.length).toBe(
        mockPosts.length + mockNextPagePosts.length
      );
    });
  });
});
