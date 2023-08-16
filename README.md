# 과제

- styled-component 를 사용했습니다.

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

# type 설정

### days

요일과 관련된 내용으로, week의 요일들을 이용해 DayOfWeek 타입을 지정해서 사용했습니다.
화면의 한글 번역을 위해 enum을 통해 값을 명시했습니다.

### time

time 은 hour와 minute으로 구성됩니다.

duration 은 Start 와 end time을 가지는 데이터입니다.

### operating - time

OperatingTime 은 결과 데이터입니다.
각 요일에 맞는 기간 리스트를 가집니다.

AllTimeOperatingTime 은 OperatingTime 을 상속받은 것으로,
연중 무휴를 선택하게 된다면, 00:00 ~ 24:00 로 고정이 되게 됩니다.

# 컴포넌트

### opertaing-time page

index 페이지로, 

### Icon

아이콘은 svg 형태이며, path를 가집니다.
각 아이콘 마다 Component composition 형태로 생성을 했습니다.
버튼 을 상속받아, 버튼처럼 사용이 가능합니다.

### input

TimeInput은 시간을 받는 input으로, hour과 minute을 따로 관리합니다.
총 Input 이 두개가 되며,

- 시작시간 (HH:MM) ~ 끝 시간 (HH:MM)
- [HH] : [MM] ~ [HH] : [MM]
- input은 총 4개로 구성되어 있습니다.

- input 을 누르면 focus가 생겨 `시간입력` 에서 입력을 받을 수 있는 Input 이 보이게 됩니다.
- focus를 주는 순간, `요일-idx-hour-input` id 를 찾아 focus를 시켜줍니다.






