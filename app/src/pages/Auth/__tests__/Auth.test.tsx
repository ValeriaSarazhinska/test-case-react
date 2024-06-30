import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "../Auth";

describe("Auth Component", () => {
	test("renders login form", () => {
		render(
			<Router>
				<Auth />
			</Router>,
		);

		expect(screen.getByPlaceholderText(/Username/i)).toBeTruthy();
		expect(screen.getByPlaceholderText(/Password/i)).toBeTruthy();
		expect(screen.getByText(/Login/i)).toBeTruthy();
	});

	test("displays error message when fields are empty", () => {
		render(
			<Router>
				<Auth />
			</Router>,
		);

		fireEvent.click(screen.getByText(/Login/i));
		expect(
			screen.getByText(/Please enter username and password/i),
		).toBeTruthy();
	});

	test("navigates to home on successful login", () => {
		render(
			<Router>
				<Auth />
			</Router>,
		);

		fireEvent.change(screen.getByPlaceholderText(/Username/i), {
			target: { value: "testuser" },
		});
		fireEvent.change(screen.getByPlaceholderText(/Password/i), {
			target: { value: "password" },
		});

		fireEvent.click(screen.getByText(/Login/i));
		expect(localStorage.getItem("token")).toBeTruthy();
	});
});
