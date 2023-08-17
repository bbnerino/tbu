# 시작하기

`npm install` -> `npm start`

# 컴포넌트 구조

`<OperatingTimePage/>`(page/operating-time/index.tsx) 에서 페이지가 시작됩니다.

### <OperatingTimePage/>

1. `<Navbar/>` 가 위치합니다.
2. `checkAllTime` state 로 연중 무휴를 체크할 수 있습니다.

- 이 state를 통해 전체 값을 00~24 로 바꿀 수 있으며, 버튼들을 disabled 하게 관리합니다.

3. `entireError` state 를 통해 `ErrorMessage` 를 보여줍니다.

4. 시간 전체 리스트인 `<DurationList/>` 가 존재합니다.

### <DurationList/>

1. 실질적인 데이터인 operatingTime 가 존재합니다. (OperatingTime)
2. 데이터는 요일마다 존재하며, 하나의 기간은 Duration 으로 hour와 minute의 형태의 객체로 시작시간과 끝 시간을 가집니다.
3. 일주일 데이터를 순회하며 `<DayCell>`의 요일마다의 컴포넌트로 나눠지게 됩니다.

```js
interface OperatingTime {
  monday: Duration[] = [];
  tuesday: Duration[] = [];
  wednesday: Duration[] = [];
  thursday: Duration[] = [];
  friday: Duration[] = [];
  saturday: Duration[] = [];
  sunday: Duration[] = [];
}
interface Duration {
  startTime: Time;
  endTime: Time;
}
interface Time{
  hour: TimeInputType; // "" | "00" | number
  minute: TimeInputType; // "" | "00" | number
}
```

### <DayCell/>

1. 타이틀을 가지며 (h1)
2. 기간데이터를 (durations) 순회하며, `<TimeCell/>`으로 분리됩니다.

### <TimeCell/>

1. input 관련 컴포넌트와 icon 컴포넌트로 나눠집니다.

#### Icon

아이콘은 svg 형태이며, path를 가집니다.
각 아이콘 마다 Component composition 형태로 생성을 했습니다.
버튼 을 상속받아, 버튼처럼 사용이 가능합니다.

#### input

TimeInput은 시간을 받는 input으로, hour과 minute을 따로 관리합니다.
총 Input 이 두개가 되며,

- 시작시간 (HH:MM) ~ 끝 시간 (HH:MM)
- [HH] : [MM] ~ [HH] : [MM]
- input은 총 4개로 구성되어 있습니다.

- input 을 누르면 focus가 생겨 `시간입력` 에서 입력을 받을 수 있는 Input 이 보이게 됩니다.
- focus를 주는 순간, `요일-idx-hour-input` id 를 찾아 focus를 시켜줍니다.

# 기능

1. 월 ~ 일 까지의 운영 시간을 입력 받습니다.

2. - 버튼을 통해 해당 요일의 시간 입력칸을 추가로 만들고

3. 제거 버튼을 통해 해당 입력칸을 없앨 수 있습니다.

- 만일 모든 칸을 없앨 경우는 새로운 입력창을 추가로 만들어줍니다.

4. input 창은 시작 시간 과 끝 시간을 입력 받습니다.

5. 연중무휴 버튼을 누르면 모든 시간이 00:00 ~ 24:00 시로 변경됩니다.

- input 이 disabled 로 변경되고, 버튼들이 비활성화 됩니다.

# 에러

1. 아무것도 입력되지 않았을 경우 (형식이 틀리거나) 에는 전체를 감싸는 error 가 생깁니다.

2. 범위를 모두 입력하지 않으면 : `범위를 모두 입력해주세요.` 문구가 출력됩니다.

3. 끝 시간이 시작시간 보다 작다면 : `시간을 확인해주세요.` 문구가 출력됩니다.

4. 겹치는 시간이 존재한다면 : `겹치는 시간이 존재합니다.` 문구가 출력됩니다.

시간이 많이 없어, 구현을 못했지만 추후 구현하고 싶은 기능입니다.

1. 5:3 => 05:30 형태로 변경
2. 입력이 끝나는 동시에 순서가 변경되어 불편한데, 디바운스 기능을 통해 바로 변경되지 않게 구현
전체 데이터(operationFunction) 를 관리해야 하기 때문에, 전체가 재렌더링이 일어나는데 관리 방법이 궁금합니다... 