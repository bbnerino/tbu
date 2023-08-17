export enum DaytoKorean {
  monday = "월",
  tuesday = "화",
  wednesday = "수",
  thursday = "목",
  friday = "금",
  saturday = "토",
  sunday = "일",
}

export const week = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type DayOfWeek = (typeof week)[number];
