import {
  DayOfWeek,
  DaytoKorean,
  Duration,
  OperatingTimeForm,
} from "../../../@types/time";
import TimeCell from "./TimeCell";
import { styled } from "styled-components";

interface Props {
  day: DayOfWeek;
  durations: Duration[];
  addDuration: (day: DayOfWeek) => void;
  removeDuration: (day: DayOfWeek, idx: number) => void;
  operatingTime: OperatingTimeForm;
  setOperatingTime: React.Dispatch<React.SetStateAction<OperatingTimeForm>>;
}

const DayCell = ({
  day,
  durations,
  addDuration,
  removeDuration,
  operatingTime,
  setOperatingTime,
}: Props) => {
  return (
    <Wrap>
      <h1>{DaytoKorean[day]}</h1>
      {durations.map((duration, idx) => (
        <TimeCell
          day={day}
          operatingTime={operatingTime}
          setOperatingTime={setOperatingTime}
          addFunction={() => addDuration(day)}
          removeFunction={() => removeDuration(day, idx)}
          duration={duration}
          key={idx}
          idx={idx}
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
