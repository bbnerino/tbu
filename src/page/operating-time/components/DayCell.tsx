import { OperatingTime } from "../../../@types/time";
import TimeCell from "./TimeCell";
import { styled } from "styled-components";

interface Props {
  day: OperatingTime;
}

const DayCell = ({ day }: Props) => {
  return (
    <Wrap>
      <h1>{day.getKoreanName()}</h1>
      {day.duration.map((duration, idx) => (
        <TimeCell duration={duration} key={idx} idx={day.name + idx} />
      ))}
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 350px;
  margin: 0 50px;
`;
export default DayCell;
