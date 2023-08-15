export class Time {
  hour: "" | number;
  minute: "" | number;
  constructor(hour?: number, minute?: number) {
    this.hour = hour || "";
    this.minute = minute || "";
  }
}

export interface Duration {
  start: string;
  end: string;
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
