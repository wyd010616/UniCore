import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "./AppHeader";
import React from "react";
import BrowserPage_wyd from "./BrowserPage/BrowserPage_wyd";

describe("AppHeader Component", () => {
  test("navigates to the correct page when logo is clicked", () => {
    const navigateMock = jest.fn();
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("email", "aaa@a.ca");
    render(
      <BrowserRouter>
        <BrowserPage_wyd />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("UNICORE"));
    expect(screen.getByText("load more...")).toBeInTheDocument();
  });

  test("opens user menu when settings icon is clicked", () => {
    render(
      <BrowserRouter>
        <AppHeader setSearchResults={() => {}} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /open settings/i }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  test("updates search term when input value changes", () => {
    render(
      <BrowserRouter>
        <AppHeader setSearchResults={() => {}} />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText("Search…");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput).toHaveValue("test");
  });
});
