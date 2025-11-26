import { render, screen, fireEvent } from "@testing-library/react";
import Account from "./Account";
import React from "react";
import { BrowserRouter } from "react-router-dom";

jest.unmock("axios");
import axios from "axios";
jest.mock("axios");
const mockAxios = {
  post: jest.fn(),
  get: jest.fn(),
};
axios.create.mockImplementation(() => mockAxios);

describe("Account Component", () => {
  test("renders email field with correct value", () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    );
    const emailField = screen.getByLabelText("email");
    expect(emailField).toHaveValue(localStorage.getItem("email"));
    expect(emailField).toBeDisabled();
  });

  test("opens dialog when 'Change Password' button is clicked", () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    );
    const changePasswordButton = screen.getByText("Change Password");
    fireEvent.click(changePasswordButton);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  test("closes dialog when 'Cancel' button is clicked", () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    );
    const changePasswordButton = screen.getByText("Change Password");
    fireEvent.click(changePasswordButton);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    const dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  test("submits form and calls API when 'Submit' button is clicked with matching passwords", () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    );
    const changePasswordButton = screen.getByText("Change Password");
    fireEvent.click(changePasswordButton);
    const oldPasswordField = screen.getByLabelText("Old Password");
    const newPasswordField = screen.getByLabelText("New Password");
    const confirmPasswordField = screen.getByLabelText("New Password Again");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(oldPasswordField, { target: { value: "oldpassword" } });
    fireEvent.change(newPasswordField, { target: { value: "newpassword" } });
    fireEvent.change(confirmPasswordField, {
      target: { value: "newpassword" },
    });

    fireEvent.click(submitButton);

    // Add assertions for API call and response handling
  });
});

// Integration Test
describe("Account Component Integration Test", () => {
  test("successfully changes password when form is submitted with matching passwords", () => {
    // Mock the API call and response
    // Render the Account component
    // Simulate user interaction and form submission
    // Assert that the password is successfully changed
  });
});
