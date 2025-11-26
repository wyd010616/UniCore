import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostPage from "./PostPage";
import React from "react";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("PostPage component", () => {
  beforeEach(() => {
    render(<PostPage />);
  });

  test("renders textarea correctly", () => {
    const textarea = screen.getByPlaceholderText(
      "say something, we are all ears :)"
    );
    expect(textarea).toBeInTheDocument();
  });

  test("updates content state on textarea change", () => {
    const textarea = screen.getByPlaceholderText(
      "say something, we are all ears :)"
    );
    fireEvent.change(textarea, { target: { value: "Test post content" } });
    expect(textarea.value).toBe("Test post content");
  });

  test("calls axios.post and navigate on button click", () => {
    const textarea = screen.getByPlaceholderText(
      "say something, we are all ears :)"
    );
    fireEvent.change(textarea, { target: { value: "Test post content" } });

    const postButton = screen.getByText("POST");
    fireEvent.click(postButton);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("post/create", {
      content: "Test post content",
      user_id: localStorage.getItem("user_id"),
      type: "0",
    });

    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledWith("/browser");
  });

  test("displays alert when content is empty", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const postButton = screen.getByText("POST");
    fireEvent.click(postButton);

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith("nothing to say...?");
  });
});
