import { DayOfWeek, DaytoKorean } from "../../../@types/day";
import { OperatingTime } from "../../../@types/operating-time";
import { Duration, Time, TimeService } from "../../../@types/time";
import TimeCell from "./TimeCell";
import { styled } from "styled-components";

interface Props {
  day: DayOfWeek;
  operatingTime: OperatingTime;
  setOperatingTime: React.Dispatch<React.SetStateAction<OperatingTime>>;
  durations: Duration[];
  disabled: boolean;
  entireError: string;
  setEntireError: React.Dispatch<React.SetStateAction<string>>;
}

const DayCell = ({
  day,
  operatingTime,
  setOperatingTime,
  durations,
  disabled,
  entireError,
  setEntireError,
}: Props) => {
  const addDuration = (day: DayOfWeek) => {
    setOperatingTime({
      ...operatingTime,
      [day]: [...durations, new Duration()],
    });
  };

  const removeDuration = (day: DayOfWeek, index: number) => {
    let newDurations = operatingTime[day].filter((dur, i) => i !== index);
    if (newDurations.length === 0) {
      newDurations = [new Duration()];
    }
    setOperatingTime({
      ...operatingTime,
      [day]: newDurations,
    });
  };

  const handleOperatingTime = (idx: number, startTime: Time, endTime: Time) => {
    const newOperatingTime = { ...operatingTime };
    newOperatingTime[day][idx] = {
      startTime,
      endTime,
    };
    newOperatingTime[day] = TimeService.sortOperatingTime(
      newOperatingTime[day]
    );

    setOperatingTime(newOperatingTime);
  };

  return (
    <Wrap>
      <h1>{DaytoKorean[day]}</h1>
      {durations.map((duration, idx) => (
        <TimeCell
          key={idx}
          day={day}
          addFunction={!idx ? () => addDuration(day) : undefined}
          removeFunction={() => removeDuration(day, idx)}
          handleOperatingTime={handleOperatingTime}
          idx={idx}
          durations={durations}
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
