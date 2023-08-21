import { DayOfWeek } from "../../../@types/day";
import { Time, toMinute } from "../../../@types/time";

interface Props {
  day: DayOfWeek;
  idx: number;
  setIsFocus: (isFocus: boolean) => void;
}
  
export const _TimeCell = ({ day, idx, setIsFocus }: Props) => {
  const checkIsEmpty = (time: Time) => {
    return time.hour === "" && time.minute === "";
  };

  const checkIsSomeEmpty = (startTime: Time, endTime: Time) => {
    if (startTime.hour === "" || startTime.minute === "") return true;
    if (endTime.hour === "" || endTime.minute === "") return true;
    return false;
  };

  const checkIsUnCorrectTime = (startTime: Time, endTime: Time) => {
    return !(toMinute(startTime) < toMinute(endTime));
  };

  return {
    checkIsEmpty,
    checkIsSomeEmpty,
    checkIsUnCorrectTime,
  };
};
