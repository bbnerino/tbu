/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import OperatingTimePage from "../page/operating-time";
import userEvent from "@testing-library/user-event";
import "../global.type.d.ts";

describe("OperatingTime Render", () => {
  test("렌더링 확인", async () => {
    render(<OperatingTimePage />);
    const $title = await screen.findByTestId("header-nav");
    expect($title).toBeInTheDocument();
  });

  test("7개의 time-cell 을 갖는지 확인", async () => {
    render(<OperatingTimePage />);
    const $timeCell = await screen.findAllByTestId("time-cell");
    expect($timeCell).toHaveLength(7);
  });

  test("추가 버튼 누르면 time-cell 추가되는지 확인", async () => {
    render(<OperatingTimePage />);
    const $addButton = await screen.findByTestId("monday-0-plus-icon");
    act(() => userEvent.click($addButton));
    const $timeCell = await screen.findAllByTestId("time-cell");
    expect($timeCell).toHaveLength(8);
  });

  test("시간 입력 칸 누르면 input 창 띄워지는지 확인", async () => {
    render(<OperatingTimePage />);
    const $inputLabel = await screen.findByTestId("insert-time-input-monday-0");
    act(() => userEvent.click($inputLabel));

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
    const $inputLabel = await screen.findByTestId("insert-time-input-monday-0");
    act(() => userEvent.click($inputLabel));

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

  test("시간 입력 시 겹치는 시간 확인", async () => {
    render(<OperatingTimePage />);
    const $inputLabel = await screen.findByTestId("insert-time-input-monday-0");
    act(() => userEvent.click($inputLabel));

    const $startHourInput1 = await screen.findByTestId(
      "monday-0-start-hour-input"
    );
    act(() => userEvent.type($startHourInput1, "3"));

    const $endHourInput1 = await screen.findByTestId("monday-0-end-hour-input");
    act(() => userEvent.type($endHourInput1, "4"));

    const $addButton = await screen.findByTestId("monday-0-plus-icon");
    act(() => userEvent.click($addButton));

    const $inputLabel2 = await screen.findByTestId(
      "insert-time-input-monday-1"
    );
    act(() => userEvent.click($inputLabel2));

    const $startHourInput2 = await screen.findByTestId(
      "monday-1-start-hour-input"
    );

    act(() => userEvent.type($startHourInput2, "3"));

    const $endHourInput2 = await screen.findByTestId("monday-1-end-hour-input");
    act(() => userEvent.type($endHourInput2, "4"));

    const $errText = await screen.findByTestId("monday-1-error");
    expect($errText).toHaveTextContent("겹치는 시간이 존재합니다.");
  });

  test("시간 입력 시 순서 변경 확인", async () => {
    render(<OperatingTimePage />);
    const $inputLabel1 = await screen.findByTestId(
      "insert-time-input-monday-0"
    );
    act(() => userEvent.click($inputLabel1));

    // 3~4 입력 후 1~2 입력 시 순서 변경
    const $startHourInput1 = await screen.findByTestId(
      "monday-0-start-hour-input"
    );
    act(() => userEvent.type($startHourInput1, "3"));

    const $endHourInput1 = await screen.findByTestId("monday-0-end-hour-input");
    act(() => userEvent.type($endHourInput1, "4"));

    // 추가
    const $addButton = await screen.findByTestId("monday-0-plus-icon");
    act(() => userEvent.click($addButton));

    // 1~2 입력
    const $inputLabel2 = await screen.findByTestId(
      "insert-time-input-monday-1"
    );
    act(() => userEvent.click($inputLabel2));

    const $startHourInput2 = await screen.findByTestId(
      "monday-1-start-hour-input"
    );

    act(() => userEvent.type($startHourInput2, "1"));

    // 변경된 순서 확인
    expect($startHourInput1).toHaveValue("1");
    expect($startHourInput2).toHaveValue("3");
  });
});
