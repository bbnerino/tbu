import { useEffect, useState } from "react";
import { Duration, Time } from "../../../@types/time";
import { DayOfWeek } from "../../../@types/day";
import ErrorMessage from "../../../library/components/message/error.message";
import { OperationFunction } from "../script/_DurationList";
import { _TimeCell } from "../script/_TimeCell";
import InputBox from "./InputBox";
import IconBox from "./IconBox";
import * as S from "../styles/TimeCell.style";

interface Props {
  idx: number;
  day: DayOfWeek;
  duration: Duration;
  disabled: boolean;
  operationFunction: OperationFunction;
  sortOperatingTime: (idx: number, startTime: Time, endTime: Time) => void;
  handleOverLapTime: (idx: number, start: Time, end: Time) => boolean;
}
const TimeCell = ({
  idx,
  day,
  duration,
  disabled,
  operationFunction,
  sortOperatingTime,
  handleOverLapTime,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [startTime, setStartTime] = useState<Time>(duration.startTime);
  const [endTime, setEndTime] = useState<Time>(duration.endTime);
  const [error, setError] = useState("");

  useEffect(() => {
    setStartTime(duration.startTime);
    setEndTime(duration.endTime);
  }, [duration]);
  const { checkIsEmpty, checkIsSomeEmpty, checkIsUnCorrectTime } = _TimeCell({
    day,
    idx,
    setIsFocus,
  });

  useEffect(() => {
    // 모두 빈칸일 때 에러 메시지 제거 후 종료
    if (checkIsEmpty(startTime) && checkIsEmpty(endTime)) return setError("");

    if (checkIsSomeEmpty(startTime, endTime)) {
      return setError("범위를 모두 입력해주세요.");
    }

    // // 시작 시간이 끝 시간보다 늦을 때 에러 메시지 출력 후 종료
    if (checkIsUnCorrectTime(startTime, endTime)) {
      return setError("시간을 확인해주세요.");
    }

    // 겹치는 시간이 존재할 때 에러 메시지 출력 후 종료
    if (handleOverLapTime(idx, startTime, endTime)) {
      return setError("겹치는 시간이 존재합니다.");
    }

    sortOperatingTime(idx, startTime, endTime);
    setError("");
  }, [startTime, endTime]);

  const inputProps = {
    disabled,
    day,
    idx,
    startTime,
    checkIsEmpty,
    endTime,
    setStartTime,
    setEndTime,
    setIsFocus,
    isFocus,
    error,
  };
  const iconProps = { idx, day, disabled, operationFunction };
  return (
    <S.Wrap data-testid="time-cell">
      <S.TimeCellWrap>
        <InputBox {...inputProps} />
        <IconBox {...iconProps} />
      </S.TimeCellWrap>
      <ErrorMessage dataTestId={`${day}-${idx}-error`}>{error}</ErrorMessage>
    </S.Wrap>
  );
};

export default TimeCell;
