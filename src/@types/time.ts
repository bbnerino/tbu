// const data = {
//   operatingTimes: [
//     {
//       name: "monday",
//       duration: [
//         {
//           start: { hour: 9, minute: 0},
//           end:   { hour: 18, minute: 0 },
//         },
//       ]
//     }
//   ]
// };

export class OperatingTimeForm {
  operatingTimes: OperatingTime[];
  constructor() {
    this.operatingTimes = [
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
    this.duration = [new Duration()];
  }
  getKoreanName() {
    return DaytoKorean[this.name];
  }
}

export class Duration {
  start: Time;
  end: Time;
  constructor(start?: Time, end?: Time) {
    this.start = start || new Time();
    this.end = end || new Time();
  }
}

export class Time {
  hour: "" | number;
  minute: "" | "00" | number;
  constructor(hour?: number, minute?: number) {
    this.hour = hour || "";
    this.minute = minute || "";
  }
}

// DATA
export enum DaytoKorean {
  monday = "월",
  tuesday = "화",
  wednesday = "수",
  thursday = "목",
  friday = "금",
  saturday = "토",
  sunday = "일",
}

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
