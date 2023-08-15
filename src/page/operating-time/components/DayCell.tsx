import {
  DayOfWeek,
  OperatingTime,
  OperatingTimeForm,
} from "../../../@types/time";
import TimeCell from "./TimeCell";
import { styled } from "styled-components";

interface Props {
  day: OperatingTime;
  operatingTime: OperatingTimeForm;
  setOperatingTime: React.Dispatch<React.SetStateAction<OperatingTimeForm>>;
  addDuration: (day: DayOfWeek) => void;
  removeDuration: (day: DayOfWeek, idx: number) => void;
}

const DayCell = ({
  day,
  operatingTime,
  setOperatingTime,
  addDuration,
  removeDuration,
}: Props) => {
  return (
    <Wrap>
      <h1>{day.getKoreanName()}</h1>
      {day.duration.map((duration, idx) => (
        <TimeCell
          addFunction={() => addDuration(day.name)}
          removeFunction={() => removeDuration(day.name, idx)}
          duration={duration}
          key={idx}
          idx={day.name + idx}
        />
      ))}
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 350px;
  margin: 30px 50px;
  min-height: 100px;
  max-height: 350px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: rgb(255, 255, 255);
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(219, 219, 219, 0.514);
    border-radius: 10px;
    height: 10px;
  }
`;
export default DayCell;
