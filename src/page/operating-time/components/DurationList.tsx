import { useEffect, useState } from "react";
import {
  AllTimeOperatingTime,
  OperatingTime,
} from "../../../@types/operating-time";
import { DayOfWeek, week } from "../../../@types/day";
import { _DurationList } from "../script/_DurationList";
import DayCell from "./DayCell";
import * as S from "../styles/DurationList.style";

interface Props {
  checkAllTime: boolean;
  setEntireError: React.Dispatch<React.SetStateAction<string>>;
}

const DurationList = ({ checkAllTime, setEntireError }: Props) => {
  const [operatingTime, setOperatingTime] = useState<OperatingTime>(
    new OperatingTime()
  );
  const { checkAllEmptyDuration, operationFunction, checkIsOverLapTime } =
    _DurationList({ setOperatingTime });

  useEffect(() => {
    if (checkAllTime) setOperatingTime(new AllTimeOperatingTime());
    else setOperatingTime(new OperatingTime());
  }, [checkAllTime]);

  useEffect(() => {
    if (checkAllEmptyDuration(operatingTime)) {
      setEntireError("* 운영 시간을 입력해주세요. (최소 1개)");
    } else {
      setEntireError("");
    }
  }, [operatingTime]);

  return (
    <S.Wrap>
      {week.map((day: DayOfWeek) => (
        <DayCell
          key={day}
          disabled={checkAllTime}
          day={day}
          operationFunction={operationFunction}
          durations={operatingTime[day]}
          checkIsOverLapTime={checkIsOverLapTime}
        />
      ))}
    </S.Wrap>
  );
};

export default DurationList;
