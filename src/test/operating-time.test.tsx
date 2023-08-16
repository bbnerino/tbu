/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import OperatingTimePage from "../page/operating-time";
import userEvent from "@testing-library/user-event";

describe("OperatingTime", () => {
  test("렌더링 확인", async () => {
    render(<OperatingTimePage />);
    const $title = await screen.findByTestId("header-nav");
    expect($title).toBeInTheDocument();
  });

  test("7개의 input 을 갖는지 확인", async () => {
    render(<OperatingTimePage />);
    const $inputText = await screen.findAllByTestId("insert-time-input");
    expect($inputText).toHaveLength(7);
  });

  test("추가 버튼 누르면 input 추가되는지 확인", async () => {
    render(<OperatingTimePage />);
    const $addButton = await screen.findByTestId("monday-0-plus-icon");
    act(() => {
      userEvent.click($addButton);
    });
    const $inputText = await screen.findAllByTestId("insert-time-input");
    expect($inputText).toHaveLength(8);
  });

  test("시간 입력 칸 누르면 input 창 띄워지는지 확인", async () => {
    render(<OperatingTimePage />);
    const $inputText = await screen.findAllByTestId("insert-time-input");
    act(() => {
      userEvent.click($inputText[0]);
    });

    const $hourInput = await screen.findByTestId("monday-0-start-hour-input");
    const $minuteInput = await screen.findByTestId("monday-0-end-minute-input");

    expect($hourInput).toBeInTheDocument();
    expect($minuteInput).toBeInTheDocument();

    // const
    expect($hourInput).toHaveFocus();
  });
});
