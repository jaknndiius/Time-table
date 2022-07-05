const week_name = ["일", "월", "화", "수", "목", "금", "토"]
const week_class = [
  [],
  ["수1", "정영", "체2", "창체", "생명", "음악", "국1"],
  ["국2", "윤리", "국사", "지리", "수1", "국1", "영1"],
  ["프그", "영2", "화학", "사회", "창체", "창체", "창체"],
  ["수1", "지학", "국2", "국사", "영1", "실험", "정보"],
  ["미술", "체1", "물리", "창체", "영2", "수2", "진국"],
  []
]

function toWeekdayPreiod(index) {
  if(index <= 0) {
    index = 1;
  } else if(index >= 6) {
    index = 5;
  }

  return index;
}

function makeTr(idx, addhead) {
  const tr = document.createElement("tr");

  idx = toWeekdayPreiod(idx);

  const classes = week_class[idx];

  if(addhead) {
    const th = document.createElement("th");
    th.innerHTML = `${week_name[idx]}요일`;
    tr.appendChild(th);
  }
  for(let i=0;i<classes.length;i++) {
    const td = document.createElement("td");
    td.innerHTML = `${classes[i]}`;

    tr.appendChild(td);
  }

  return tr;
}

// all time table setting
const table = document.querySelector("#time_table");
const tbody = document.querySelector("#time_table tbody");

for(let i=1;i<6;i++) {
  tbody.appendChild(makeTr(i, true));
}

// table.style.display = "none";

//return class number function
/*
1: 08:30~09:20
2: 09:30~10:20
3: 10:30~11:20
4: 11:30:12:20
j: 12:20~13:10
5: 13:10~14:00
6: 14:10~15:00
7: 15:10~16:00

*/

// 8:30 - 9:52
function howLongTime(fromHour, fromMinute, toHour, toMinute) {
  const h = toHour - fromHour;
  const m = toMinute - fromMinute;

  const now = (h*60) + m;

  // const preiod_minute = now%60;
  // const preiod_hour = (now - preiod_minute)/ 60;

  // return [preiod_hour, preiod_minute];
  return now;
}


//[ start hours, start minutes, for]
const class_start_time = [
  [8, 00, 80], // Morning time and 1st class (8:00~9:20)
  [9, 20, 60], // free time and 2nd class (9:20~10:20)
  [10, 20, 60], // free time and 3rd class (10:20~11:20)
  [11, 20, 60], // free time and 4th class (11:20~12:20)
  [12, 20, 100], // lunch time(12:20~13:10) and 5th class(13:10~14:00) (12:20~14:00)
  [14, 00, 60], // free time and 6th class (14:00~, 15:00)
  [15, 00, 60]  // free time and 7th class (15:00~, 16:00)
]

function getClassIndex(hour, minute) {

  for(let t of class_start_time) { // class start time list rotation
    // elapsed time from each time(t)
    const pre = howLongTime(t[0], t[1], hour, minute);
    if(pre >=0 && pre < t[2]) {
      return class_start_time.indexOf(t) +1 // return class index
    }
  }
  return -1; // when the rest of the time
}

// today table setting
function update() {
  //get current datetime
  const date = new Date();
  const day = date.getDay()
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  //get current class index
  const current_class = getClassIndex(hours, minutes);

  //tobody append child
  const to_tbody = document.querySelector("#today_time_table tbody");
  to_tbody.innerHTML = "";
  to_tbody.appendChild(makeTr(day))
  //current class style change
  const highlight_list = [
    document.querySelector(`#today_time_table tbody tr td:nth-child(${current_class})`),
    document.querySelector(`#today_time_table thead tr th:nth-child(${current_class})`),
    document.querySelector(`#time_table tbody tr:nth-child(${toWeekdayPreiod(day)})`)
  ]
  highlight_list.forEach((value) => value.className = "lin-highlight");

  // #next_time update
  document.getElementById("next_time").innerHTML = "다음시간: " + current_class + "교시";

  function toSchool(hour, minute, second) {
    const school_hour = 16;
    const school_minute = 0;
    const school_second = 0;

    // 12 10 5
    // 

    const untill_hour = school_hour - hour;
    const untill_minute = school_minute - minute;
    const untill_second = school_second - second;

    const all = untill_hour*3600 + untill_minute*60 + untill_second;

    if(all >= 0) {
      return [
        (all/3600).toFixed(1),
        (all/60).toFixed(1),
        all
      ]
    } else {
      return null;
    }
  }

  const footer = document.getElementById("footer");
  const school_time = toSchool(hours, minutes, seconds);
  if(school_time != null)
    footer.innerHTML = `하교까지 약 <span>${school_time[0]}</span>시간 = <span>${school_time[1]}</span>분 = <span>${school_time[2]}</span>초 남았다!`
  else {
    console.log("eeeeeeeeeeeeeeeeeeeeer")
  }
}
setInterval(update, 1)