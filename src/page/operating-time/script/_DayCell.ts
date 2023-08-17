import { DayOfWeek } from "../../../@types/day";
import { Duration, Time, toMinute } from "../../../@types/time";
import { OperationFunction } from "./_DurationList";

interface Props {
  day: DayOfWeek;
  durations: Duration[];
  operationFunction: OperationFunction;
  checkIsOverLapTime: (
    durations: Duration[],
    idx: number,
    start: Time,
    end: Time
  ) => boolean;
}

export const _DayCell = ({
  day,
  durations,
  operationFunction,
  checkIsOverLapTime,
}: Props) => {
  
  const sortOperatingTime = (idx: number, startTime: Time, endTime: Time) => {
    let newDurations = [...durations];
    newDurations[idx] = {
      startTime: startTime,
      endTime: endTime,
    };

    // i 번째 시간대와 j 번째 시간대를 비교하여
    // i 번째 시간대가 더 늦게 시작하면 j 번째 시간대와 위치를 바꿈
    // sort 방법 : 버블 정렬 (시간복잡도 : O(n^2))
    for (let i = 0; i < newDurations.length - 1; i++) {
      for (let j = i + 1; j < newDurations.length; j++) {
        if (
          toMinute(newDurations[i].startTime) >
          toMinute(newDurations[j].startTime)
        )
          newDurations.move(i, j);
      }
    }

    operationFunction.handleOperatingTime(day, newDurations);
  };

  const handleOverLapTime = (idx: number, startTime: Time, endTime: Time) => {
    return checkIsOverLapTime(durations, idx, startTime, endTime);
  };

  return {
    sortOperatingTime,
    handleOverLapTime,
  };
};
