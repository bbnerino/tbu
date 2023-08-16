import { styled } from "styled-components";
import COLOR from "../../library/_constants/colors";
import { useEffect, useState } from "react";
import Navbar from "../../library/components/nav/Navbar";
import CheckAll from "../../library/components/input/check-all";
import DayCell from "./components/DayCell";
import { DayOfWeek, week } from "../../@types/day";
import {
  AllTimeOperatingTime,
  OperatingTime,
} from "../../@types/operating-time";

const OperatingTimePage = () => {
  const [checkAllTime, setCheckAllTime] = useState(false);
  const [operatingTime, setOperatingTime] = useState<OperatingTime>(
    new OperatingTime()
  );
  const [entireError, setEntireError] = useState("");

  useEffect(() => {
    if (checkAllTime) setOperatingTime(new AllTimeOperatingTime());
    else setOperatingTime(new OperatingTime());
  }, [checkAllTime]);

  const contentStyle = {
    border: entireError
      ? `1px solid ${COLOR.incorrect}`
      : `1px solid ${COLOR.border}`,
  };

  return (
    <Wrap>
      <Navbar>운영 시간</Navbar>
      <AllYearRoundWrap>
        <CheckAll
          title="연중무휴"
          state={checkAllTime}
          setState={setCheckAllTime}
        />
      </AllYearRoundWrap>

      <ContentWrap style={contentStyle}>
        {week.map((day: DayOfWeek) => (
          <DayCell
            key={day}
            disabled={checkAllTime}
            day={day}
            operatingTime={operatingTime}
            setOperatingTime={setOperatingTime}
            durations={operatingTime[day]}
            entireError={entireError}
            setEntireError={setEntireError}
          />
        ))}
      </ContentWrap>
    </Wrap>
  );
};

const Wrap = styled.section`
  background-color: ${COLOR.background};
  min-height: 100vh;
`;
const ContentWrap = styled.article`
  min-height: 50vh;
  padding: 0 20px;
  background-color: ${COLOR.white};
  display: flex;
  flex-wrap: wrap;
`;
const AllYearRoundWrap = styled.div`
  padding: 24px;
`;
export default OperatingTimePage;
