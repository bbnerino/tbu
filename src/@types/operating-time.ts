import { DayOfWeek, Duration } from "./time";

export class OperatingTimeForm {
  operatingTime: OperatingTime[];
  constructor() {
    this.operatingTime = [
      new OperatingTime("Monday"),
      new OperatingTime("Tuesday"),
      new OperatingTime("Wednesday"),
      new OperatingTime("Thursday"),
      new OperatingTime("Friday"),
      new OperatingTime("Saturday"),
      new OperatingTime("Sunday"),
    ];
  }
}

export class OperatingTime {
  day: DayOfWeek;
  duration: Duration[];
  constructor(day: DayOfWeek) {
    this.day = day;
    this.duration = [];
  }
}

// {
//   name: "Monday",
//   operatingTime: [
//     { start: "09:00", end: "18:00" },
//     { start: "09:00", end: "18:00" },
//   ],
// };
