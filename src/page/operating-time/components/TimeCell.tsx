import { useState } from "react";
import styled from "styled-components";
import COLOR from "../../../library/_constants/colors";
import { Time } from "../../../@types/time";
import TimeInput from "../../../library/components/input/time-input";
import Icon from "../../../library/components/icon/icon";

interface Props {
  time?: Time;
  setTime?: React.Dispatch<React.SetStateAction<Time>>;
  idx: string;
  deleteTime?: () => void;
  addTime?: () => void;
}

const TimeCell = ({ time, setTime, idx }: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [startTime, setStartTime] = useState<Time>(new Time());
  const [endTime, setEndTime] = useState<Time>(new Time());
  const [error, setError] = useState("");

  const checkIsAllEmpty = () => {
    if (
      startTime.hour === "" &&
      startTime.minute === "" &&
      endTime.hour === "" &&
      endTime.minute === ""
    ) {
      return true;
    }
    return false;
  };

  const handleFocus = (idx: string) => () => {
    document.getElementById(`${idx}-hour-input`)?.focus();
    setIsFocus(true);
  };

  return (
    <Wrap>
      <TimeCellWrap>
        <InputWrap
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={isFocus ? "focus" : ""}
        >
          {checkIsAllEmpty() && !isFocus && (
            <Block onClick={handleFocus(idx)}>시간 입력</Block>
          )}
          <TimeInput time={startTime} idx={idx} setTime={setStartTime} /> ~
          <TimeInput time={endTime} setTime={setEndTime} />
        </InputWrap>

        <IconWrap>
          <Icon color="disabled">
            <Icon.Delete />
          </Icon>
          <Icon color="disabled">
            <Icon.Plus />
          </Icon>
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
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  background-color: ${COLOR.main};
`;

const InputWrap = styled.div`
  width: 190px;
  height: 25px;
  display: flex;
  align-items: center;
  padding: 9px 3px;
  border-radius: 5px;
  border: 1px solid ${COLOR.border};
  &.focus {
    border: 1px solid ${COLOR.primary};
  }
  position: relative;
`;
const IconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  justify-content: space-between;
  width: 60px;
`;

const Block = styled.div`
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
