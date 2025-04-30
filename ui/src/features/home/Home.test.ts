import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils"; // Utility to render with Redux store
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for testing React Router
import Home from "./Home";

describe("Home Component Integration Test", () => {
  it("renders the Home component and submits the form", async () => {
    // Render the component with Redux and React Router context
    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check if the username and password fields are rendered
    expect(screen.getByLabelText(/UserName/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/UserName/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Assert that the form submission triggers navigation or Redux action
    // (You can mock the `navigate` function or Redux action to verify this)
    expect(await screen.findByText(/This field is required/i)).not.toBeInTheDocument();
  });
});