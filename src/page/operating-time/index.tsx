import { styled } from "styled-components";
import COLOR from "../../library/_constants/colors";
import { useEffect, useState } from "react";
import Navbar from "../../library/components/nav/Navbar";
import CheckAll from "../../library/components/input/CheckAll";
import DayCell from "./components/DayCell";
import { DayOfWeek, Duration, OperatingTimeForm } from "../../@types/time";

const OperatingTimePage = () => {
  const [checkAllYearRound, setCheckAllYearRound] = useState(false);
  const [operatingTime, setOperatingTime] = useState<OperatingTimeForm>(
    new OperatingTimeForm()
  );

  useEffect(() => {
    console.log(operatingTime);
  }, [operatingTime]);

  const addDuration = (day: DayOfWeek) => {
    const durations = operatingTime[day];
    setOperatingTime({
      ...operatingTime,
      [day]: [...durations, new Duration()],
    });
  };

  const removeDuration = (day: DayOfWeek, index: number) => {
    const durations = operatingTime[day];
    setOperatingTime({
      ...operatingTime,
      [day]: durations.filter((dur, i) => i !== index),
    });
  };

  return (
    <BackGroundWrap>
      <Navbar>운영 시간</Navbar>
      <AllYearRoundWrap>
        <CheckAll
          title="연중무휴"
          state={checkAllYearRound}
          setState={setCheckAllYearRound}
        />
      </AllYearRoundWrap>

      <ContentWrap>
        {Object.keys(operatingTime).map((day) => (
          <DayCell
            key={day}
            addDuration={addDuration}
            removeDuration={removeDuration}
            durations={operatingTime[day as DayOfWeek]}
            day={day as DayOfWeek}
            operatingTime={operatingTime}
            setOperatingTime={setOperatingTime}
          />
        ))}
      </ContentWrap>
    </BackGroundWrap>
  );
};

const BackGroundWrap = styled.section`
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
