export class Time {
  hour: "" | number;
  minute: "" | number;
  constructor(hour?: number, minute?: number) {
    this.hour = hour || "";
    this.minute = minute || "";
  }
}

export class Duration {
  start: string;
  end: string;
  constructor(start?: string, end?: string) {
    this.start = start || "";
    this.end = end || "";
  }
}
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
