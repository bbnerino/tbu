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
  operatingTime: OperatingTimeForm;
  setOperatingTime: React.Dispatch<React.SetStateAction<OperatingTimeForm>>;
  durations: Duration[];
  disabled: boolean;
}

const DayCell = ({
  day,
  operatingTime,
  setOperatingTime,
  durations,
  disabled,
}: Props) => {
  const addDuration = (day: DayOfWeek) => {
    const durations = operatingTime[day];
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

  return (
    <Wrap>
      <h1>{DaytoKorean[day]}</h1>
      {durations.map((duration, idx) => (
        <TimeCell
          key={idx}
          day={day}
          operatingTime={operatingTime}
          setOperatingTime={setOperatingTime}
          addFunction={idx === 0 ? () => addDuration(day) : undefined}
          removeFunction={() => removeDuration(day, idx)}
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
