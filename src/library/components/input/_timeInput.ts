import { Time } from "../../../@types/time";

interface Props {
  setTime: React.Dispatch<React.SetStateAction<Time>>;
}

export const _timeInput = ({ setTime }: Props) => {
  const setHour = (inputValue: string) => {
    if (inputValue === "" || inputValue === "00") {
      return setTime((hour) => ({ ...hour, hour: inputValue }));
    }

    const timeNum = Number(inputValue);

    if (isNaN(timeNum)) return;
    setTime((hour) => {
      let newMinute = hour.minute;
      if (hour.hour === "") newMinute = "00";
      return {
        minute: newMinute,
        hour: Math.min(Math.max(timeNum, 0), 23),
      };
    });
  };

  const setMinute = (inputValue: string) => {
    if (inputValue === "" || inputValue === "00") {
      return setTime((minute) => ({ ...minute, minute: inputValue }));
    }
    const timeNum = Number(inputValue);
    if (isNaN(timeNum)) return;
    setTime((minute) => ({
      ...minute,
      minute: Math.min(Math.max(timeNum, 0), 59),
    }));
  };

  return { setHour, setMinute };
};
