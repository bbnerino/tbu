import { styled } from "styled-components";
import COLOR from "../../_constants/colors";
import { Time } from "../../../@types/time";

interface Props {
  time: Time;
  setTime: React.Dispatch<React.SetStateAction<Time>>;
  idx?: string;
}

const TimeInput = ({ time, setTime, idx }: Props) => {
  const { hour, minute } = time;

  const handleInput =
    (type: "hour" | "minute") => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") return setTime({ ...time, [type]: "" });
      if (e.target.value === "00") return setTime({ ...time, [type]: "00" });
      const timeNum = Number(e.target.value);

      if (type === "hour") {
        if (timeNum === 0) return setTime({ ...time, hour: 0 });
        if (timeNum > 23) return setTime({ ...time, hour: 23 });
        setTime({ ...time, hour: timeNum || "" });
      }
      if (type === "minute") {
        if (timeNum === 0) return setTime({ ...time, minute: 0 });
        if (timeNum > 59) return setTime({ ...time, minute: 59 });
        setTime({ ...time, minute: timeNum || "" });
      }
    };

  return (
    <Wrap>
      <input
        value={hour}
        id={`${idx}-hour-input`}
        onChange={handleInput("hour")}
        placeholder="hh"
      />
      <div className="divide">:</div>
      <input value={minute} onChange={handleInput("minute")} placeholder="mm" />
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
