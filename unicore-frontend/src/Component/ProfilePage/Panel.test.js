import { render, screen, fireEvent } from "@testing-library/react";
import Panel from "./Panel";
import React from "react";

describe("Panel component", () => {
  test("renders tabs correctly", () => {
    const userInfo = {
      like_count: 5,
      post_count: 10,
    };
    render(<Panel userInfo={userInfo} />);

    const favoritesTab = screen.getByText("Favorites");
    expect(favoritesTab).toBeInTheDocument();

    const myPostsTab = screen.getByText("My Posts");
    expect(myPostsTab).toBeInTheDocument();
  });

  test("changes tab when clicked", () => {
    const userInfo = {
      like_count: 5,
      post_count: 10,
    };
    render(<Panel userInfo={userInfo} />);

    const favoritesTab = screen.getByText("Favorites");
    const myPostsTab = screen.getByText("My Posts");

    fireEvent.click(myPostsTab);
    expect(favoritesTab).not.toHaveClass("Mui-selected");
    expect(myPostsTab).toHaveClass("Mui-selected");

    fireEvent.click(favoritesTab);
    expect(favoritesTab).toHaveClass("Mui-selected");
    expect(myPostsTab).not.toHaveClass("Mui-selected");
  });
});
