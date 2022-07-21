import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/index";

describe("rendering", () => {
  it("Should render Hello text", () => {
    render(<Home />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
