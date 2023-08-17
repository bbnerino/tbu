import { DayOfWeek, week } from "./day";
import { Duration, Time } from "./time";

export class OperatingTime {
  monday: Duration[] = [];
  tuesday: Duration[] = [];
  wednesday: Duration[] = [];
  thursday: Duration[] = [];
  friday: Duration[] = [];
  saturday: Duration[] = [];
  sunday: Duration[] = [];
  constructor() {
    week.forEach((day: DayOfWeek) => {
      this[day] = [new Duration()];
    });
  }
}

// All Time ==================================================
export class AllTimeOperatingTime extends OperatingTime {
  constructor() {
    super();
    week.forEach((day: DayOfWeek) => {
      this[day] = [new AllTimeDuration()];
    });
  }
}

class AllTimeDuration extends Duration {
  constructor() {
    super();
    this.startTime = new Time(0, 0);
    this.endTime = new Time(24, 0);
  }
}
// ===========================================================

export interface OperationFunction {
  handleOperatingTime: (day: DayOfWeek, durations: Duration[]) => void;
  addOperatingTime: (day: DayOfWeek) => void;
  removeOperatingTime: (day: DayOfWeek, idx: number) => void;
}
