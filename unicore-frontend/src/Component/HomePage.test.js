import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import React from "react";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("HomePage component", () => {
  beforeEach(() => {
    useNavigate.mockClear();
  });

  test("renders the component correctly", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch("Getting Started with  UniCore");
  });

  test("navigates to signup page when 'Sign Up' button is clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);
    render(<HomePage />);
    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);
    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });

  test("navigates to signin page when 'Sign In' button is clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);
    render(<HomePage />);
    const signInButton = screen.getByText("Sign In");
    fireEvent.click(signInButton);
    expect(mockNavigate).toHaveBeenCalledWith("/signin");
  });

  test("displays alert when 'Learn More' button is clicked", () => {
    window.alert = jest.fn();
    render(<HomePage />);
    const learnMoreButton = screen.getByText("Learn More");
    fireEvent.click(learnMoreButton);
    expect(window.alert).toHaveBeenCalledWith("Learn More");
  });
});
