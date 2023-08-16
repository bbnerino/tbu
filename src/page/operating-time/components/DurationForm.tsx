import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AllTimeOperatingTime,
  OperatingTime,
} from "../../../@types/operating-time";
import { TimeService } from "../../../@types/time.service";
import COLOR from "../../../library/_constants/colors";
import { styled } from "styled-components";
import CheckAll from "../../../library/components/input/check-all.input";
import ErrorMessage from "../../../library/components/message/error.message";
import Icon from "../../../library/components/icon/icon";
import { DayOfWeek, week } from "../../../@types/day";
import DayCell from "./DayCell";
import { Duration, Time } from "../../../@types/time";

const DurationForm = () => {
  const [checkAllTime, setCheckAllTime] = useState(false);
  const [operatingTime, setOperatingTime] = useState<OperatingTime>(
    new OperatingTime()
  );
  const [entireError, setEntireError] = useState("");

  const timeService = TimeService({
    operatingTime,
    setOperatingTime,
  });

  useEffect(() => {
    if (checkAllTime) setOperatingTime(new AllTimeOperatingTime());
    else setOperatingTime(new OperatingTime());
  }, [checkAllTime]);

  useEffect(() => {
    if (timeService.checkAllEmptyDuration(operatingTime)) {
      return setEntireError("* 운영 시간을 입력해주세요. (최소 1개)");
    }
    setEntireError("");
  }, [operatingTime]);

  const contentStyle = useMemo(() => {
    return {
      border: entireError
        ? `1px solid ${COLOR.incorrect}`
        : `1px solid ${COLOR.border}`,
    };
  }, [entireError]);

  const handleOperatingTime = (
    day: DayOfWeek,
    idx: number,
    start: Time,
    end: Time
  ) => {
    const newOperatingTime = { ...operatingTime };
    newOperatingTime[day][idx] = { startTime: start, endTime: end };
    setOperatingTime(newOperatingTime);
  };

  const addDuration = useCallback(
    (day: DayOfWeek) => {
      setOperatingTime({
        ...operatingTime,
        [day]: [...operatingTime[day], new Duration()],
      });
    },
    [setOperatingTime, operatingTime]
  );

  const removeDuration = useCallback(
    (day: DayOfWeek, index: number) => {
      let newDurations = operatingTime[day].filter((dur, i) => i !== index);
      if (newDurations.length === 0) newDurations = [new Duration()];
      setOperatingTime({
        ...operatingTime,
        [day]: newDurations,
      });
    },
    [setOperatingTime, operatingTime]
  );

  return (
    <Wrap>
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
            timeService={timeService}
            handleOperatingTime={handleOperatingTime}
            addDuration={addDuration}
            removeDuration={removeDuration}
            durations={operatingTime[day]}
          />
        ))}
      </ContentWrap>

      {entireError && (
        <ErrorMessage>
          <Icon.Exclam color="incorrect" /> <p>{entireError}</p>
        </ErrorMessage>
      )}
    </Wrap>
  );
};

const Wrap = styled.section``;
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
export default DurationForm;
