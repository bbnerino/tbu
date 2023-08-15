// const data = {
//   monday: [
//         {
//           start: { hour: 9, minute: 0},
//           end:   { hour: 18, minute: 0 },
//         },
//   ]
// };

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

export class OperatingTimeForm {
  monday: Duration[];
  tuesday: Duration[];
  wednesday: Duration[];
  thursday: Duration[];
  friday: Duration[];
  saturday: Duration[];
  sunday: Duration[];
  constructor() {
    this.monday = [new Duration()];
    this.tuesday = [new Duration()];
    this.wednesday = [new Duration()];
    this.thursday = [new Duration()];
    this.friday = [new Duration()];
    this.saturday = [new Duration()];
    this.sunday = [new Duration()];
  }
}

export class Duration {
  startTime: Time;
  endTime: Time;
  constructor(startTime?: Time, endTime?: Time) {
    this.startTime = startTime || new Time();
    this.endTime = endTime || new Time();
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
