import { render, screen, waitFor } from "@testing-library/react";
import axios from "../http.js";
import Profile from "./ProfilePage";
import React from "react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../http.js", () => ({
  get: jest.fn(),
}));

describe("Profile component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders user info correctly", async () => {
    const mockUserInfo = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    axios.get.mockResolvedValueOnce({ data: { user: mockUserInfo } });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockUserInfo.name)).toBeInTheDocument();
      expect(screen.getByText(mockUserInfo.email)).toBeInTheDocument();
    });
  });

  test("handles error when getting user info", async () => {
    const errorMessage = "Error getting user info";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
