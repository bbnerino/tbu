import { Duration, Time } from "../../../@types/time";

export const OperationTime = {
  checkIsCorrectTime: (start: Time, end: Time) => {
    return toMinute(start) < toMinute(end);
  },
  checkIsOverTime: (durations: Duration[], idx: number, start: Time) => {
    const startMinute = toMinute(start);

    return durations.every((duration, index) => {
      if (index === idx) return true;
      return startMinute >= toMinute(duration.endTime);
    });
    
  },
  시간정렬: () => {},
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
