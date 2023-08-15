import { DayOfWeek, DaytoKorean, Duration } from "./time";

export class OperatingTimeForm {
  operatingTime: OperatingTime[];
  constructor() {
    this.operatingTime = [
      new OperatingTime("monday"),
      new OperatingTime("tuesday"),
      new OperatingTime("wednesday"),
      new OperatingTime("thursday"),
      new OperatingTime("friday"),
      new OperatingTime("saturday"),
      new OperatingTime("sunday"),
    ];
  }
}

export class OperatingTime {
  name: DayOfWeek;
  duration: Duration[];
  constructor(name: DayOfWeek) {
    this.name = name;
    this.duration = [new Duration("", "")];
  }
  toKorean() {
    return DaytoKorean[this.name];
  }
}

// {
//   name: "Monday",
//   operatingTime: [
//     { start: "09:00", end: "18:00" },
//     { start: "09:00", end: "18:00" },
//   ],
// };
