/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import OperatingTimePage from "../page/operating-time";
import userEvent from "@testing-library/user-event";

describe("OperatingTime Render", () => {
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
    act(() => userEvent.click($addButton));
    const $inputText = await screen.findAllByTestId("insert-time-input");
    expect($inputText).toHaveLength(8);
  });

  test("시간 입력 칸 누르면 input 창 띄워지는지 확인", async () => {
    render(<OperatingTimePage />);
    const $inputText = await screen.findAllByTestId("insert-time-input");
    act(() => userEvent.click($inputText[0]));

    const $hourInput = await screen.findByTestId("monday-0-start-hour-input");
    const $minuteInput = await screen.findByTestId("monday-0-end-minute-input");

    expect($hourInput).toBeInTheDocument();
    expect($minuteInput).toBeInTheDocument();

    // const
    expect($hourInput).toHaveFocus();
  });
});

describe("OperatingTime Error", () => {
  test("아무것도 입력 안했을 때 에러메세지 뜨는지 확인", async () => {
    render(<OperatingTimePage />);
    const $errText = await screen.findByTestId("entire-error");
    expect($errText).toHaveTextContent("운영 시간을 입력해주세요.");
  });

  test("시간 입력 시 에러 확인", async () => {
    render(<OperatingTimePage />);
    const $inputText = await screen.findAllByTestId("insert-time-input");
    act(() => userEvent.click($inputText[0]));

    const $startHourInput = await screen.findByTestId(
      "monday-0-start-hour-input"
    );

    // 시간 하나만 입력 시 에러
    act(() => userEvent.type($startHourInput, "3"));
    const $errText = await screen.findByTestId("monday-0-error");
    expect($errText).toHaveTextContent("범위를 모두 입력해주세요.");

    // 시간 범위 안 맞을 시 에러
    const $endHourInput = await screen.findByTestId("monday-0-end-hour-input");
    act(() => userEvent.type($endHourInput, "2"));

    expect($errText).toHaveTextContent("시간을 확인해주세요.");

    // 시간 범위 맞을 시 에러 없어짐
    act(() => userEvent.type($endHourInput, "4"));
    expect($errText).not.toBeInTheDocument();
  });
});
