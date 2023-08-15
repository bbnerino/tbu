import { styled } from "styled-components";
import COLOR from "../../library/_constants/colors";
import { useState } from "react";
import Navbar from "../../library/components/nav/Navbar";
import CheckAll from "../../library/components/input/CheckAll";
import DayCell from "./components/DayCell";
import { OperatingTimeForm } from "../../@types/time";

const OperatingTimePage = () => {
  const [checkAllYearRound, setCheckAllYearRound] = useState(false);
  const [days, setDays] = useState(new OperatingTimeForm().operatingTimes);
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
        {days.map((day) => (
          <DayCell key={day.name} day={day} />
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
