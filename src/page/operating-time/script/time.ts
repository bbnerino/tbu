import { Duration, Time } from "../../../@types/time";

export const OperationTime = {
  checkIsCorrectTime: (start: Time, end: Time) => {
    return toMinute(start) < toMinute(end);
  },
  checkIsOverTime: (
    durations: Duration[],
    idx: number,
    start: Time,
    end: Time
  ) => {
    const startMinute = toMinute(start);
    const endMinute = toMinute(end);

    return durations.every((duration, index) => {
      if (index === idx) return true;
      return !(
        (toMinute(duration.startTime) <= startMinute &&
          startMinute <= toMinute(duration.endTime)) ||
        (toMinute(duration.startTime) <= endMinute &&
          endMinute <= toMinute(duration.endTime))
      );
    });
  },
  sortOperatingTime: (durations: Duration[]) => {
    const sortedDurations = [...durations];

    for (let i = 0; i < sortedDurations.length - 1; i++) {
      for (let j = i + 1; j < sortedDurations.length; j++) {
        if (
          !toMinute(sortedDurations[i].startTime) ||
          !toMinute(sortedDurations[j].startTime)
        ) {
        }
        if (
          toMinute(sortedDurations[i].startTime) >
          toMinute(sortedDurations[j].startTime)
        ) {
          sortedDurations.move(i, j);
        }
      }
    }

    return sortedDurations;
  },
};
const toMinute = (time: Time) => {
  return toInt(time.hour) * 60 + toInt(time.minute);
};

const toInt = (num: "" | "00" | number) => {
  if (num === "") return 0;
  if (num === "00") return 0;
  if (typeof num === "number") return num;
  return parseInt(num);
};
