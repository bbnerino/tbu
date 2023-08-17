import { DayOfWeek, week } from "../../../@types/day";
import { OperatingTime } from "../../../@types/operating-time";
import { Duration, Time, toMinute } from "../../../@types/time";

interface Props {
  setOperatingTime: React.Dispatch<React.SetStateAction<OperatingTime>>;
}

export const _DurationList = ({ setOperatingTime }: Props) => {
  const checkIsEmpty = (time: Time) => {
    return time.hour === "" && time.minute === "";
  };
  const checkIsEmptyDuration = (duration: Duration) => {
    return checkIsEmpty(duration.startTime) || checkIsEmpty(duration.endTime);
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
  const operationFunction: OperationFunction = {
    handleOperatingTime: (day: DayOfWeek, durations: Duration[]) => {
      setOperatingTime((prev) => {
        return {
          ...prev,
          [day]: durations,
        };
      });
    },
    addOperatingTime: (day: DayOfWeek) => {
      setOperatingTime((prev) => {
        return {
          ...prev,
          [day]: [...prev[day], new Duration()],
        };
      });
    },

    removeOperatingTime: (day: DayOfWeek, idx: number) => {
      setOperatingTime((prev) => {
        let newDurations = prev[day].filter((_, i) => i !== idx);
        if (newDurations.length === 0) newDurations = [new Duration()];
        return {
          ...prev,
          [day]: newDurations,
        };
      });
    },
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
    checkAllEmptyDuration,
    operationFunction,
    checkIsOverLapTime,
  };
};
export interface OperationFunction {
  handleOperatingTime: (day: DayOfWeek, durations: Duration[]) => void;
  addOperatingTime: (day: DayOfWeek) => void;
  removeOperatingTime: (day: DayOfWeek, idx: number) => void;
}
