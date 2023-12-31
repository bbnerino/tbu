export type TimeInputType = "" | "00" | number;

export class Time {
  hour: TimeInputType;
  minute: TimeInputType;
  constructor(hour?: number, minute?: number) {
    if (hour === 0) this.hour = "00";
    else this.hour = hour || "";

    if (minute === 0) this.minute = "00";
    else this.minute = minute || "";
  }
}

// start - end time
export class Duration {
  startTime: Time;
  endTime: Time;
  constructor() {
    this.startTime = new Time();
    this.endTime = new Time();
  }
}

const toInt = (inputNum: TimeInputType) => {
  const number = Number(inputNum);
  if (isNaN(number)) return 0;
  return number;
};

export const toMinute = (time: Time) => {
  return toInt(time.hour) * 60 + toInt(time.minute);
};
