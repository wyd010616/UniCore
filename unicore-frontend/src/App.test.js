import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import React from "react";

describe("App component", () => {
  test("renders home page when the path is '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const homePageElement = screen.getByText("Home Page");
    expect(homePageElement).toBeInTheDocument();
  });

  test("renders sign up page when the path is '/signup'", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );
    const signUpPageElement = screen.getByText("Sign Up Page");
    expect(signUpPageElement).toBeInTheDocument();
  });

  // Add more tests for other routes as needed
});
