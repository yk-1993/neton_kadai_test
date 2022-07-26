import { render, screen, cleanup, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/index";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

// Test suite.
describe("Home component test.", () => {
  // クリーンアップ
  beforeEach(() => {
    cleanup();
  });
  afterEach(cleanup);

  // Test case1.
  it("[計算]ボタンが表示されているか.", async () => {
    act(() => {
      // レンダリング
      render(<Home />);
    });
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  // Test case2.
  it("[最大重量（W）を入力]inputが表示されているか.", async () => {
    act(() => {
      // レンダリング
      render(<Home />);
    });
    const { container } = render(<Home />);
    // 重さの総和（W）入力ボックスを取得できるか
    expect(getByTestId(container, "input-w")).toBeInTheDocument();
    // 初期値が0であるか
    expect(getByTestId(container, "input-w")).toHaveValue(0);
  });
  // Test case3.
  it("選んだ品物の重さ・価値が表示されており、初期値が0か.", async () => {
    act(() => {
      // レンダリング
      render(<Home />);
    });

    const { container } = render(<Home />);
    // 選んだ品物の重さの総和（weight）テキストを取得できるか
    expect(getByTestId(container, "bagInWeight")).toBeInTheDocument();
    // 初期値が0であるか
    expect(getByTestId(container, "bagInWeight").innerHTML).toBe("0");
    // 選んだ品物の価値(value)の総和テキストを取得できるか
    expect(getByTestId(container, "bagInValue")).toBeInTheDocument();
    // 初期値が0であるか
    expect(getByTestId(container, "bagInValue").innerHTML).toBe("0");
  });
  // Test case4.
  it("Wに100を入力し、[計算]ボタン押下後、重さの総和が99・価値の総和が2093で出力されるか.", async () => {
    act(() => {
      // レンダリング
      render(<Home />);
    });
    const { container } = render(<Home />);
    const bagInWeight = getByTestId(container, "bagInWeight");
    const bagInValue = getByTestId(container, "bagInValue");
    // expect(screen.getByText("計算")).toBeInTheDocument();

    // 重さの総和（W）入力ボックスを取得
    const inputValue = getByTestId(container, "input-w");
    // Wに100を入力
    await userEvent.type(inputValue, "100");
    // [計算]ボタンを取得
    const calcBtn = getByTestId(container, "button");
    // [計算]ボタンをクリック
    await userEvent.click(calcBtn);
    // 重さの総和が99となっているか
    expect(bagInWeight.innerHTML).toBe("99");
    // 価値の総和が2093となっているか
    expect(bagInValue.innerHTML).toBe("2093");
  });
});
