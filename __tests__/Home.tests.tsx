import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/index";

afterEach(cleanup);

describe("rendering", () => {
  it("Should render 選択した品物 text", () => {
    render(<Home />);
    expect(screen.getByText("選択した品物")).toBeInTheDocument();
  });
});
