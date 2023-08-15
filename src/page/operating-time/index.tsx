import { styled } from "styled-components";
import TimeInput from "./components/TimeCell";
import COLOR from "../../library/_constants/colors";
import { useState } from "react";
import AllYearRound from "./components/CheckAll";

const OperatingTimePage = () => {
  const [checkAllYearRound, setCheckAllYearRound] = useState(false);
  return (
    <BackGroundWrap>
      <AllYearRoundWrap>
        <AllYearRound
          title="연중무휴"
          state={checkAllYearRound}
          setState={setCheckAllYearRound}
        />
      </AllYearRoundWrap>

      <ContentWrap>
        <TimeInput />
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
`;
const AllYearRoundWrap = styled.div`
  padding: 24px;
`;
export default OperatingTimePage;
