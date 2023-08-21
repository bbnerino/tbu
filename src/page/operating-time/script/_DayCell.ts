import { DayOfWeek } from "../../../@types/day";
import { Duration, Time, toMinute } from "../../../@types/time";
import { OperationFunction } from "./_DurationList";

interface Props {
  day: DayOfWeek;
  durations: Duration[];
  operationFunction: OperationFunction;
}

export const _DayCell = ({ day, durations, operationFunction }: Props) => {
  const sortOperatingTime = (idx: number, startTime: Time, endTime: Time) => {
    let newDurations = [...durations];
    newDurations.splice(idx, 1);

    const newData = {
      startTime: startTime,
      endTime: endTime,
    };
    // i 번째 시간대와 j 번째 시간대를 비교하여
    // i 번째 시간대가 더 늦게 시작하면 j 번째 시간대와 위치를 바꿈
    // sort 방법 : 버블 정렬 (시간복잡도 : O(n^2))
    let tmp = 0;
    for (let i = 0; i < newDurations.length; i++) {
      if (toMinute(newData.startTime) > toMinute(newDurations[i].startTime)) {
        tmp = i;
      } else {
        break;
      }
      // for (let j = i + 1; j < newDurations.length; j++) {
      //   if (
      //     toMinute(newDurations[i].startTime) >
      //     toMinute(newDurations[j].startTime)
      //   )
      //     newDurations.move(i, j);
      // }
    }
    newDurations.push(newData);
    newDurations.move(newDurations.length - 1, tmp);

    operationFunction.handleOperatingTime(day, newDurations);
  };

  const handleOverLapTime = (idx: number, startTime: Time, endTime: Time) => {
    return checkIsOverLapTime(durations, idx, startTime, endTime);
  };
  const checkIsOverLapTime = (
    durations: Duration[],
    idx: number,
    start: Time,
    end: Time
  ) => {
    const startMinute = toMinute(start);
    const endMinute = toMinute(end);

    // 모든 시간대를 순회하며 겹치는 시간대가 있는지 확인
    let result = durations.every((duration, index) => {
      // 현재 시간대는 제외
      if (index === idx) return true;
      // 시작 <= [시작]<= 끝 OR 시작 <= [끝]<= 끝  시간에 겹치면 false
      return !(
        (toMinute(duration.startTime) <= startMinute &&
          startMinute <= toMinute(duration.endTime)) ||
        (toMinute(duration.startTime) <= endMinute &&
          endMinute <= toMinute(duration.endTime))
      );
    });
    return !result;
  };
  return {
    sortOperatingTime,
    handleOverLapTime,
  };
};
