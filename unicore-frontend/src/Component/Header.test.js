import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import React from "react";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Header component", () => {
  beforeEach(() => {
    useNavigate.mockClear();
  });

  test("renders header correctly", () => {
    render(<Header />);
    const logoButton = screen.getByText("UNICORE");
    expect(logoButton).toBeInTheDocument();
    const aboutLink = screen.getByText("About Us");
    expect(aboutLink).toBeInTheDocument();
    const contactLink = screen.getByText("Contact Us");
    expect(contactLink).toBeInTheDocument();
  });

  test("navigates to home page when logo button is clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(<Header />);
    const logoButton = screen.getByText("UNICORE");
    fireEvent.click(logoButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
