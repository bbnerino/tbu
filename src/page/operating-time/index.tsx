import Navbar from "../../library/components/nav/Navbar";
import DurationList from "./components/DurationList";
import { useState } from "react";
import CheckAll from "../../library/components/input/check-all.input";
import ErrorMessage from "../../library/components/message/error.message";
import Icon from "../../library/components/icon/icon";
import * as S from "./styles/index.style";

const OperatingTimePage = () => {
  const [checkAllTime, setCheckAllTime] = useState(false);
  const [entireError, setEntireError] = useState("");

  return (
    <S.Wrap>
      <Navbar>운영 시간</Navbar>
      <S.AllYearRound>
        <CheckAll
          title="연중무휴"
          state={checkAllTime}
          setState={setCheckAllTime}
        />
      </S.AllYearRound>

      <DurationList
        setEntireError={setEntireError}
        checkAllTime={checkAllTime}
      />

      {entireError && (
        <ErrorMessage>
          <Icon.Exclam color="incorrect" />{" "}
          <p data-testid="entire-error">{entireError}</p>
        </ErrorMessage>
      )}
    </S.Wrap>
  );
};

export default OperatingTimePage;
