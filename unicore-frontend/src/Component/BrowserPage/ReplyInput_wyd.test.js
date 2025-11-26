import { render, screen, fireEvent } from "@testing-library/react";
import ReplyInput from "./ReplyInput_wyd";
import React from "react";

describe("ReplyInput component", () => {
  const mockOnReply = jest.fn();

  beforeEach(() => {
    render(
      <ReplyInput
        parent_id={1}
        reply_to={2}
        reply_to_whom="John Doe"
        onReply={mockOnReply}
      />
    );
  });

  test("renders textarea correctly", () => {
    const textarea = screen.getByPlaceholderText(
      "kind words bond; harsh words wound :D"
    );
    expect(textarea).toBeInTheDocument();
  });

  test("updates content state on input change", () => {
    const textarea = screen.getByPlaceholderText(
      "kind words bond; harsh words wound :D"
    );
    fireEvent.change(textarea, { target: { value: "Test reply content" } });
    expect(textarea.value).toBe("Test reply content");
  });

  test("calls onReply with correct reply data on submit", () => {
    const textarea = screen.getByPlaceholderText(
      "kind words bond; harsh words wound :D"
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(textarea, { target: { value: "Test reply content" } });
    fireEvent.click(submitButton);

    expect(mockOnReply).toHaveBeenCalledTimes(1);
    expect(mockOnReply).toHaveBeenCalledWith({
      reply_to: "2",
      parent_id: "1",
      user_id: localStorage.getItem("user_id"),
      content: "Re John Doe: Test reply content",
    });
  });
});
