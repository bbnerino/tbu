import React, { useEffect } from "react";
import { OperatingTime } from "../../../@types/operating-time";
import TimeCell from "./TimeCell";
import { styled } from "styled-components";

interface Props {
  day: OperatingTime;
}

const DayCell = ({ day }: Props) => {
  return (
    <Wrap>
      <h1>{day.name}</h1>
      {day.duration.map((duration, idx) => (
        <TimeCell key={idx} idx={day.name + idx} />
      ))}
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 350px;
  margin: 0 50px;
`;
export default DayCell;
