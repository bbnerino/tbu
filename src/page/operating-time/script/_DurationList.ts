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

  return {
    checkAllEmptyDuration,
    operationFunction,
  };
};
export interface OperationFunction {
  handleOperatingTime: (day: DayOfWeek, durations: Duration[]) => void;
  addOperatingTime: (day: DayOfWeek) => void;
  removeOperatingTime: (day: DayOfWeek, idx: number) => void;
}
