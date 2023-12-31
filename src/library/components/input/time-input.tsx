import { styled } from "styled-components";
import COLOR from "../../_constants/colors";
import { Time } from "../../../@types/time";
import { _timeInput } from "./_timeInput";

interface Props {
  time: Time;
  setTime: React.Dispatch<React.SetStateAction<Time>>;
  identify?: string;
  disabled: boolean;
}

const TimeInput = ({ time, setTime, identify, disabled }: Props) => {
  const { hour, minute } = time;

  const { setHour, setMinute } = _timeInput({ setTime });

  const handleHourInput = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(e.target.value);
  };

  const handleMinuteInput = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(e.target.value);
  };

  return (
    <Wrap>
      <input
        value={hour}
        onChange={handleHourInput()}
        placeholder="hh"
        disabled={disabled}
        id={`${identify}-hour-input`}
        data-testid={`${identify}-hour-input`}
      />
      <span>:</span>
      <input
        value={minute}
        onChange={handleMinuteInput()}
        placeholder="mm"
        disabled={disabled}
        id={`${identify}-minute-input`}
        data-testid={`${identify}-minute-input`}
      />
    </Wrap>
  );
};
const Wrap = styled.div`
  margin-right: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  input {
    width: 25px;
    border: none;
    padding-left: 10px;
    background: none;
    &:focus {
      outline: none;
    }
    font-weight: 400;
    line-height: 20px;
    font-size: 14px;
    &::placeholder {
      color: ${COLOR.neutrals};
    }
  }
`;

export default TimeInput;
