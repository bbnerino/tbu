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

export class AllYearOperatingTimeForm extends OperatingTimeForm {
  constructor() {
    super();
    this.monday = [new Duration(true)];
    this.tuesday = [new Duration(true)];
    this.wednesday = [new Duration(true)];
    this.thursday = [new Duration(true)];
    this.friday = [new Duration(true)];
    this.saturday = [new Duration(true)];
    this.sunday = [new Duration(true)];
  }
}

export class Duration {
  startTime: Time;
  endTime: Time;
  constructor(allTime?: boolean) {
    if (allTime) {
      this.startTime = new Time(0, 0);
      this.endTime = new Time(24, 0);
      return;
    }
    this.startTime = new Time();
    this.endTime = new Time();
  }
}

export class Time {
  hour: "" | "00" | number;
  minute: "" | "00" | number;
  constructor(hour?: number, minute?: number) {
    if (hour === 0) this.hour = "00";
    else this.hour = hour || "";

    if (minute === 0) this.minute = "00";
    else this.minute = minute || "";
  }
}
