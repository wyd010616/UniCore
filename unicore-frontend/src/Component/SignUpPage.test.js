import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import SignUpPage from "./SignUpPage";
import React from "react";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("SignUpPage component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
  });

  test("renders the first step correctly", () => {
    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);
    const emailInput = screen.getByLabelText("Student Email Address*");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput).toBeInTheDocument();
  });

  test("moves to the next step when 'Sign Up' button is clicked", async () => {
    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);
    const emailInput = screen.getByLabelText("Student Email Address*");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      const passwordInput = screen.getByLabelText("Set Password*");
      expect(passwordInput).toBeInTheDocument();
    });
  });

  test("moves to the previous step when 'Back' button is clicked", async () => {
    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);
    const emailInput = screen.getByLabelText("Student Email Address*");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      const backButton = screen.getByText("Back");
      fireEvent.click(backButton);
      const emailInput = screen.getByLabelText("Student Email Address*");
      expect(emailInput).toBeInTheDocument();
    });
  });

  test("moves to the next step when 'Next' button is clicked", async () => {
    const emailInput = screen.getByLabelText("Student Email Address*");
    const signUpButton = screen.getByText("Sign Up");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);

      const verificationCodeInput = screen.getByLabelText(
        "Confirm Verification Code Sent to Your Email*"
      );
      expect(verificationCodeInput).toBeInTheDocument();
    });
  });

  test("submits the form and calls handleSI function when 'Sign In' button is clicked", async () => {
    const emailInput = screen.getByLabelText("Student Email Address*");
    const signUpButton = screen.getByText("Sign Up");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      const nextButton = screen.getByText("Next");
      fireEvent.click(nextButton);

      const verificationCodeInput = screen.getByLabelText(
        "Confirm Verification Code Sent to Your Email*"
      );
      fireEvent.change(verificationCodeInput, { target: { value: "123456" } });

      const signInButton = screen.getByText("Sign In");
      fireEvent.click(signInButton);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("/user/login", {
        email: "test@example.com",
        password: "",
      });
    });
  });

  // Add more tests for other functionality as needed
});
