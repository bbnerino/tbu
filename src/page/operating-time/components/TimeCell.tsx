import { useEffect, useState } from "react";
import styled from "styled-components";
import COLOR from "../../../library/_constants/colors";
import { Duration, Time, TimeService } from "../../../@types/time";
import TimeInput from "../../../library/components/input/time-input";
import Icon from "../../../library/components/icon/icon";
import { DayOfWeek } from "../../../@types/day";

interface Props {
  idx: number;
  addFunction?: () => void;
  removeFunction: () => void;
  day: DayOfWeek;
  durations: Duration[];
  duration: Duration;
  disabled: boolean;
  handleOperatingTime: (idx: number, startTime: Time, endTime: Time) => void;
}

const TimeCell = ({
  idx,
  addFunction,
  removeFunction,
  day,
  durations,
  duration,
  disabled,
  handleOperatingTime,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [startTime, setStartTime] = useState<Time>(duration.startTime);
  const [endTime, setEndTime] = useState<Time>(duration.endTime);
  const [error, setError] = useState("");

  useEffect(() => {
    setStartTime(duration.startTime);
    setEndTime(duration.endTime);
  }, [duration]);

  const checkIsAllEmpty = () =>
    TimeService.checkIsEmpty(startTime) && TimeService.checkIsEmpty(endTime);

  const handleFocus = (idx: number) => () => {
    document.getElementById(`${day + idx}-hour-input`)?.focus();
    setIsFocus(true);
  };

  useEffect(() => {
    // 모두 빈칸일 때 에러 메시지 제거 후 종료
    if (checkIsAllEmpty()) return setError("");

    // 시작 시간이 끝 시간보다 늦을 때 에러 메시지 출력 후 종료
    if (!TimeService.checkIsCorrectTime(startTime, endTime)) {
      return setError("올바른 시간을 입력해주세요.");
    }

    // 겹치는 시간이 존재할 때 에러 메시지 출력 후 종료
    if (!TimeService.checkIsOverTime(durations, idx, startTime, endTime)) {
      return setError("겹치는 시간이 존재합니다.");
    }

    handleOperatingTime(idx, startTime, endTime);
    setError("");
  }, [startTime, endTime]);

  const inputStyle = {
    backgroundColor: disabled ? COLOR.disabledBackground : COLOR.main,
    border: isFocus
      ? `1px solid ${COLOR.primary}`
      : error
      ? `1px solid ${COLOR.incorrect}`
      : `1px solid ${COLOR.border}`,
  };

  return (
    <Wrap>
      <TimeCellWrap>
        <InputWrap
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          style={inputStyle}
        >
          {checkIsAllEmpty() && !isFocus && (
            <InputBlock onClick={handleFocus(idx)}>시간 입력</InputBlock>
          )}
          <TimeInput
            disabled={disabled}
            identify={day + idx}
            time={startTime}
            setTime={setStartTime}
          />
          ~
          <TimeInput disabled={disabled} time={endTime} setTime={setEndTime} />
        </InputWrap>

        <IconWrap>
          <Icon.Delete
            onClick={disabled ? undefined : removeFunction}
            color="disabled"
          />
          {addFunction && (
            <Icon.Plus
              onClick={disabled ? undefined : addFunction}
              color="disabled"
            />
          )}
        </IconWrap>
      </TimeCellWrap>

      <Message>{error}</Message>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const InputWrap = styled.div`
  width: 190px;
  height: 25px;
  display: flex;
  align-items: center;
  padding: 9px 3px;
  border-radius: 5px;
  position: relative;
`;
const Message = styled.div`
  color: ${COLOR.incorrect};
  font-size: 12px;
  margin: 5px;
`;

const TimeCellWrap = styled.div`
  display: flex;
  align-items: center;
  width: 270px;
  padding: 10px;
  background-color: ${COLOR.main};
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  justify-content: space-between;
  width: 60px;
`;

const InputBlock = styled.div`
  width: 160px;
  padding: 8px 11px;
  height: 24px;
  border-radius: 3px;
  position: absolute;
  background: ${COLOR.main};
  left: 0;
  cursor: pointer;
  color: ${COLOR.textLight};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  align-items: center;
`;

export default TimeCell;
