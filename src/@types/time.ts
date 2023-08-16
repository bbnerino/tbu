type TimeInputType = "" | "00" | number;

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

export const TimeService = {
  checkIsEmpty: function (time: Time) {
    return time.hour === "" && time.minute === "";
  },

  checkIsCorrectTime: function (start: Time, end: Time) {
    if (start.hour === "" || start.minute === "") return false;
    if (end.hour === "" || end.minute === "") return false;

    return this.toMinute(start) < this.toMinute(end);
  },

  toMinute: function (time: Time) {
    return this.toInt(time.hour) * 60 + this.toInt(time.minute);
  },

  toInt: function (inputNum: TimeInputType) {
    const number = Number(inputNum);
    if (isNaN(number)) return 0;
    return number;
  },

  checkIsOverTime: function (
    durations: Duration[],
    idx: number,
    start: Time,
    end: Time
  ) {
    const startMinute = this.toMinute(start);
    const endMinute = this.toMinute(end);

    // 모든 시간대를 순회하며 겹치는 시간대가 있는지 확인
    return durations.every((duration, index) => {
      // 현재 시간대는 제외
      if (index === idx) return true;
      // 기존 시작 시간 <= [시작 시간]<= 기존 끝 시간 에 존재 하거나
      // 기존 시작 시간 <= [끝 시간]<= 기존 끝 시간 에 존재 하면 겹치는 로직
      return !(
        (this.toMinute(duration.startTime) <= startMinute &&
          startMinute <= this.toMinute(duration.endTime)) ||
        (this.toMinute(duration.startTime) <= endMinute &&
          endMinute <= this.toMinute(duration.endTime))
      );
    });
  },

  // 시간대를 정렬하는 함수
  sortOperatingTime: function (durations: Duration[]) {
    const sortedDurations = [...durations];
    // i 번째 시간대와 j 번째 시간대를 비교하여
    // i 번째 시간대가 더 늦게 시작하면 j 번째 시간대와 위치를 바꿈
    // sort 방법 : 버블 정렬 (시간복잡도 : O(n^2))
    for (let i = 0; i < sortedDurations.length - 1; i++) {
      for (let j = i + 1; j < sortedDurations.length; j++) {
        if (
          this.toMinute(sortedDurations[i].startTime) >
          this.toMinute(sortedDurations[j].startTime)
        )
          sortedDurations.move(i, j);
      }
    }

    return sortedDurations;
  },
};
