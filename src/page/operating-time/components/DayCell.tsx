import { DayOfWeek, DaytoKorean } from "../../../@types/day";
import { Duration, Time } from "../../../@types/time";
import { _DayCell } from "../script/_DayCell";
import { OperationFunction } from "../script/_DurationList";
import TimeCell from "./TimeCell";
import * as S from "../styles/DayCell.style";
interface Props {
  day: DayOfWeek;
  durations: Duration[];
  disabled: boolean;
  operationFunction: OperationFunction;
}

const DayCell = ({ day, durations, disabled, operationFunction }: Props) => {
  // 시간대를 정렬하는 함수

  const { sortOperatingTime, handleOverLapTime } = _DayCell({
    day,
    durations,
    operationFunction,
  });

  const timeProps = {
    day,
    disabled,
    operationFunction,
    sortOperatingTime,
    handleOverLapTime,
  };

  return (
    <S.Wrap>
      <h1>{DaytoKorean[day]}</h1>
      {durations.map((duration, idx) => (
        <TimeCell key={idx} idx={idx} duration={duration} {...timeProps} />
      ))}
    </S.Wrap>
  );
};

export default DayCell;
