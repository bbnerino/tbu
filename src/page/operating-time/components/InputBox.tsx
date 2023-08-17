import React, { useMemo } from "react";
import TimeInput from "../../../library/components/input/time-input";
import { DayOfWeek } from "../../../@types/day";
import { Time } from "../../../@types/time";
import COLOR from "../../../library/_constants/colors";
import * as S from "../styles/InputBox.style";

interface Props {
  disabled: boolean;
  day: DayOfWeek;
  idx: number;
  startTime: Time;
  endTime: Time;
  setStartTime: React.Dispatch<React.SetStateAction<Time>>;
  setEndTime: React.Dispatch<React.SetStateAction<Time>>;
  setIsFocus: (isFocus: boolean) => void;
  isFocus: boolean;
  error: string;
  checkIsEmpty: (time: Time) => boolean;
}

const InputBox = ({
  disabled,
  day,
  idx,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  setIsFocus,
  isFocus,
  error,
  checkIsEmpty,
}: Props) => {
  const handleFocus = (idx: number) => () => {
    document.getElementById(`${day}-${idx}-start-hour-input`)?.focus();
    setIsFocus(true);
  };

  const getStyle = (isFocus: boolean, disabled: boolean, error: string) => {
    return {
      backgroundColor: disabled ? COLOR.disabledBackground : COLOR.main,
      border: isFocus
        ? `1px solid ${COLOR.primary}`
        : error
        ? `1px solid ${COLOR.incorrect}`
        : `1px solid ${COLOR.border}`,
    };
  };

  const inputStyle = useMemo(() => {
    return getStyle(isFocus, disabled, error);
  }, [disabled, isFocus, error]);

  const checkAllEmptyAndNoFocus = () => {
    return checkIsEmpty(startTime) && checkIsEmpty(endTime) && !isFocus;
  };

  return (
    <S.InputWrap
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      style={inputStyle}
    >
      {checkAllEmptyAndNoFocus() && (
        <S.InputBlock
          data-testid={`insert-time-input-${day}-${idx}`}
          onClick={handleFocus(idx)}
        >
          시간 입력
        </S.InputBlock>
      )}
      <TimeInput
        disabled={disabled}
        identify={`${day}-${idx}-start`}
        time={startTime}
        setTime={setStartTime}
      />
      ~
      <TimeInput
        disabled={disabled}
        identify={`${day}-${idx}-end`}
        time={endTime}
        setTime={setEndTime}
      />
    </S.InputWrap>
  );
};

export default InputBox;
