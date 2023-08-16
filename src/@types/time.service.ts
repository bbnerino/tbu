import { DayOfWeek, week } from "./day";
import { OperatingTime } from "./operating-time";
import { Duration, Time, TimeInputType } from "./time";

interface Props {
  operatingTime: OperatingTime;
  setOperatingTime: React.Dispatch<React.SetStateAction<OperatingTime>>;
}

export const TimeService = ({ operatingTime, setOperatingTime }: Props) => {
  const checkIsEmpty = (time: Time) => {
    return time.hour === "" && time.minute === "";
  };

  const checkIsSomeEmpty = (start: Time, end: Time) => {
    if (start.hour === "" || start.minute === "") return false;
    if (end.hour === "" || end.minute === "") return false;
    return true;
  };

  const checkIsCorrectTime = (start: Time, end: Time) => {
    return toMinute(start) < toMinute(end);
  };

  const toMinute = (time: Time) => {
    return toInt(time.hour) * 60 + toInt(time.minute);
  };

  const toInt = (inputNum: TimeInputType) => {
    const number = Number(inputNum);
    if (isNaN(number)) return 0;
    return number;
  };

  const checkIsOverTime = (
    day: DayOfWeek,
    idx: number,
    start: Time,
    end: Time
  ) => {
    const startMinute = toMinute(start);
    const endMinute = toMinute(end);

    // 모든 시간대를 순회하며 겹치는 시간대가 있는지 확인
    return operatingTime[day].every((duration, index) => {
      // 현재 시간대는 제외
      if (index === idx) return true;
      // 기존 시작 시간 <= [시작 시간]<= 기존 끝 시간 에 존재 하거나
      // 기존 시작 시간 <= [끝 시간]<= 기존 끝 시간 에 존재 하면 겹치는 로직
      return !(
        (toMinute(duration.startTime) <= startMinute &&
          startMinute <= toMinute(duration.endTime)) ||
        (toMinute(duration.startTime) <= endMinute &&
          endMinute <= toMinute(duration.endTime))
      );
    });
  };

  // 시간대를 정렬하는 함수
  const sortOperatingTime = (durations: Duration[]) => {
    const sortedDurations = [...durations];
    // i 번째 시간대와 j 번째 시간대를 비교하여
    // i 번째 시간대가 더 늦게 시작하면 j 번째 시간대와 위치를 바꿈
    // sort 방법 : 버블 정렬 (시간복잡도 : O(n^2))
    for (let i = 0; i < sortedDurations.length - 1; i++) {
      for (let j = i + 1; j < sortedDurations.length; j++) {
        if (
          toMinute(sortedDurations[i].startTime) >
          toMinute(sortedDurations[j].startTime)
        )
          sortedDurations.move(i, j);
      }
    }

    return sortedDurations;
  };

  // duration 이 비었는지 확인하는 함수
  const checkIsEmptyDuration = (duration: Duration) => {
    return checkIsEmpty(duration.startTime) || checkIsEmpty(duration.endTime)
      ? true
      : false;
  };

  const checkAllEmptyDuration = (_operatingTime: OperatingTime) => {
    for (let day of week) {
      for (let duration of _operatingTime[day]) {
        if (!checkIsEmptyDuration(duration)) {
          return false;
        }
      }
    }
    return true;
  };

  const addDuration = (day: DayOfWeek) => {
    setOperatingTime({
      ...operatingTime,
      [day]: [...operatingTime[day], new Duration()],
    });
  };
  const removeDuration = (day: DayOfWeek, index: number) => {
    let newDurations = operatingTime[day].filter((dur, i) => i !== index);
    if (newDurations.length === 0) newDurations = [new Duration()];
    setOperatingTime({
      ...operatingTime,
      [day]: newDurations,
    });
  };
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
  return {
    checkIsEmpty,
    checkIsSomeEmpty,
    checkIsCorrectTime,
    toMinute,
    toInt,
    checkIsOverTime,
    sortOperatingTime,
    checkIsEmptyDuration,
    checkAllEmptyDuration,
    addDuration,
    removeDuration,
    handleOperatingTime,
  };
};

export interface TimeServiceType {
  checkIsEmpty: (time: Time) => boolean;
  checkIsSomeEmpty: (start: Time, end: Time) => boolean;
  checkIsCorrectTime: (start: Time, end: Time) => boolean;
  toMinute: (time: Time) => number;
  toInt: (inputNum: TimeInputType) => number;
  checkIsOverTime: (
    day: DayOfWeek,
    idx: number,
    start: Time,
    end: Time
  ) => boolean;
  sortOperatingTime: (durations: Duration[]) => Duration[];
  checkIsEmptyDuration: (duration: Duration) => boolean;
  checkAllEmptyDuration: (operatingTime: OperatingTime) => boolean;
  addDuration: (day: DayOfWeek) => void;
  removeDuration: (day: DayOfWeek, index: number) => void;
  handleOperatingTime: (
    day: DayOfWeek,
    idx: number,
    start: Time,
    end: Time
  ) => void;
}
