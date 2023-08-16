import { DayOfWeek, DaytoKorean } from "../../../@types/day";
import { Duration, Time } from "../../../@types/time";
import { TimeServiceType } from "../../../@types/time.service";
import TimeCell from "./TimeCell";
import { styled } from "styled-components";

interface Props {
  day: DayOfWeek;
  handleOperatingTime: (
    day: DayOfWeek,
    idx: number,
    start: Time,
    end: Time
  ) => void;
  addDuration: (day: DayOfWeek) => void;
  removeDuration: (day: DayOfWeek, index: number) => void;
  durations: Duration[];
  disabled: boolean;
  timeService: TimeServiceType;
}

const DayCell = ({
  day,
  handleOperatingTime,
  addDuration,
  removeDuration,
  durations,
  disabled,
  timeService,
}: Props) => {
  return (
    <Wrap>
      <h1>{DaytoKorean[day]}</h1>
      {durations.map((duration, idx) => (
        <TimeCell
          timeService={timeService}
          key={idx}
          day={day}
          addFunction={!idx ? () => addDuration(day) : undefined}
          removeFunction={() => removeDuration(day, idx)}
          handleOperatingTime={handleOperatingTime}
          idx={idx}
          duration={duration}
          disabled={disabled}
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
