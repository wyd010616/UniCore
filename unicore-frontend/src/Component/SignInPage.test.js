import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignInPage from "./SignInPage";
import React from "react";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("SignInPage component", () => {
  beforeEach(() => {
    useNavigate.mockReturnValue(jest.fn());
  });

  test("renders sign in form correctly", () => {
    render(<SignInPage />);
    const emailInput = screen.getByLabelText("User email*");
    const passwordInput = screen.getByLabelText("password*");
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  test("updates email input value correctly", () => {
    render(<SignInPage />);
    const emailInput = screen.getByLabelText("User email*");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });

  test("updates password input value correctly", () => {
    render(<SignInPage />);
    const passwordInput = screen.getByLabelText("password*");

    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(passwordInput.value).toBe("password123");
  });

  test("calls axios post with correct data on form submission", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        status_code: 0,
        message: "Login successful",
        token: "jwt-token",
        user: {
          user_id: "123",
          school: "Some School",
        },
      },
    });

    render(<SignInPage />);
    const emailInput = screen.getByLabelText("User email*");
    const passwordInput = screen.getByLabelText("password*");
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("/user/login", {
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  test("displays success message and navigates to browser page on successful login", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        status_code: 0,
        message: "Login successful",
        token: "jwt-token",
        user: {
          user_id: "123",
          school: "Some School",
        },
      },
    });

    render(<SignInPage />);
    const emailInput = screen.getByLabelText("User email*");
    const passwordInput = screen.getByLabelText("password*");
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText("Login successful")).toBeInTheDocument();
      expect(useNavigate).toHaveBeenCalledWith("/browser");
    });
  });

  test("displays error message on failed login", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        status_code: 1,
        message: "Invalid credentials",
      },
    });

    render(<SignInPage />);
    const emailInput = screen.getByLabelText("User email*");
    const passwordInput = screen.getByLabelText("password*");
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
