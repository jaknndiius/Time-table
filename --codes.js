'use strict'

const week_name = ["월", "화", "수", "목", "금"]
// const week_class = [
//   ["수1", "정영", "체2", "창체", "생명", "미술", "국1"],
//   ["국2", "윤리", "국사", "지리", "수1", "국1", "영1"],
//   ["프그", "영2", "화학", "사회", "창체", "창체", "창체"],
//   ["수1", "지학", "국2", "국사", "영1", "실험", "정보"],
//   ["음악", "체1", "물리", "창체", "영2", "수2", "진국"]
// ]
const week_class = [
  ["수1", "정영", "체2", "창체", "생명", "미술", "국1"],
  ["국2", "윤리", "국사", "지리", "수1", "국1", "영1"],
  ["프그", "영2", "화학", "사회", "창체", "창체", "창체"],
  ["수1", "지학", "국2", "국사", "영1", "실험", "정보"],
  ["음악", "체1", "물리", "창체", "영2", "수2", "진국"]
];
const cla = [
  [Lit1, Eng2, Math1, Creaty, Math2, Music, Explor2],
  [Explor1, Explor1, Math3, PE, Human, Lit2, Eng1],
  [History, Math1, Art, Math2, Creaty, Creaty, Creaty],
  [Lit2, Math2, Explor2, Explor2, Lit1, Foregin, Eng3],
  [Eng1, Lit3, Eng2, Creaty, Explor1, Math1, Music]
];

const makeTable = (id, caption, head, body) => {
  const table = document.createElement('table');
  table.id = id;
  
  const captionBox = document.createElement('caption');
  captionBox.textContent = caption;

  table.appendChild(captionBox);
  table.appendChild(head);
  table.appendChild(body);

  return table;
}

const SimpleTable = {
  makeHead: function() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for(let i=0;i<7;i++) {
      const th = document.createElement('th');
      th.textContent = (i+1) + '교시';
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
  },
  makeBody: function(week_index) {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    cla[week_index].forEach(sub => {
      const td = document.createElement('td');
      td.textContent = sub + '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    return tbody;
  },
  make: function(week_index) {
    return makeTable('today_time_table', '오늘의 시간표', this.makeHead(), this.makeBody(week_index));
  }
};

const MainTable = {
  makeRow: function(week_index, subjects) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = week_name[week_index] + '요일';
    tr.appendChild(th);
    subjects.forEach(sub => {
      const td = document.createElement('td');
      td.textContent = sub + '';
      tr.appendChild(td);
    });
    return tr;
  },
  makeHead: function() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    tr.appendChild(
      document.createElement('th'));
    for(let i=0;i<7;i++) {
      const th = document.createElement('th');
      th.textContent = (i+1) + '교시';
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
  },
  makeBody: function() {
    const tbody = document.createElement('tbody');
    for(let i=0;i<5;i++) {
      tbody.appendChild(
        this.makeRow(i, cla[i]));
    }
    return tbody;
  },
  make: function() {
    return makeTable('time_table', 'Time Table', this.makeHead(), this.makeBody());
  }
};

const ExamTable = {};


const toWeekdayPreiod = index => Math.max(Math.min(index, 4), 0);

function makeTr(idx, addhead=false) {
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
    td.onclick = onSubjectTdClicked;

    tr.appendChild(td);
  }

  return tr;
}

// all time table setting
const table = document.querySelector("#time_table");
const tbody = document.querySelector("#time_table tbody");

for(let i=0;i<5;i++) {
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
  [8, 0, 80], // Morning time and 1st class (8:00~9:20)
  [9, 20, 60], // free time and 2nd class (9:20~10:20)
  [10, 20, 60], // free time and 3rd class (10:20~11:20)
  [11, 20, 60], // free time and 4th class (11:20~12:20)
  [12, 20, 100], // lunch time(12:20~13:10) and 5th class(13:10~14:00) (12:20~14:00)
  [14, 0, 60], // free time and 6th class (14:00~, 15:00)
  [15, 0, 60]  // free time and 7th class (15:00~, 16:00)
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

let before_class;

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

  if(before_class != current_class) {
    before_class = current_class

    //tobody append child
    const to_tbody = document.querySelector("#today_time_table tbody");
    to_tbody.innerHTML = "";
    to_tbody.appendChild(makeTr(day));
    //current class style change
  
  
    //classList reset
    document.querySelectorAll(`#today_time_table tbody tr td`).forEach(
      (element) => {
        element.className = ""
      }
    )
  
    document.querySelectorAll(`#today_time_table thead tr th`).forEach(
      (element) => {
        element.className = ""
      }
    )
  
    const high1 = document.querySelector(`#today_time_table tbody tr td:nth-child(${current_class})`);
    if(high1 != null) high1.className = "lin-highlight1"
    const high2 = document.querySelector(`#today_time_table thead tr th:nth-child(${current_class})`);
    if(high2 != null) high2.className = "lin-highlight1";
  
    const weekend = document.querySelector(`#time_table tbody tr:nth-child(${toWeekdayPreiod(day)})`);
    weekend.className = "lin-highlight2";
  
    // #next_time update
    if(current_class > 0) document.getElementById("next_time").innerHTML = current_class + "교시";
  
  }

  function toSchool(hour, minute, second) {
    const school_hour = 16;
    const school_minute = 0;
    const school_second = 0;

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
}
setInterval(update, 1)

// on teacher name click
const teacher_name = {
  수1: "유규",
  정영: "조혜",
  체2: "노동",
  생명: "조민",
  음악: "지세",
  국1: "마재",
  국2: "김병",
  윤리: "채나",
  국사: "안미",
  지리: "이정",
  영1: "임명",
  프그: "최준",
  영2: "김창",
  화학: "변선",
  사회: "장재",
  지학: "김태",
  실험: "이은",
  정보: "최준",
  미술: "권유",
  체1: "노동",
  물리: "김지",
  수2: "유규",
  진국: "마재",
  창체: "마재"
};

const teacher_name_div = document.getElementById("teacher_name");

const keyf_pop = [
  { opacity: '0', easing: "ease-out"},
  { opacity: '1', offset: 0.5, easing: "ease-in"}
];

let anim;
function onSubjectTdClicked(event) {
  teacher_name_div.innerHTML = teacher_name[event.target.innerHTML] +"* 선생님";

  teacher_name_div.style.display = "block";

  if(anim != null) anim.cancel();

  // anim = teacher_name_div.animate(
  //   keyf_pop, {
  //     duration: 500,
  //     fill: "both",
  //     iterations: 2,
  //     direction: "alternate"
  //   }
  // )

  anim.onfinish = () => teacher_name_div.style.display = "none";

}
