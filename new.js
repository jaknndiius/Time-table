'use strict'

const week_name = ["월", "화", "수", "목", "금"];

const cla = [
  [Lit1, Eng2, Math1, Creaty, Math2, Music, Explor2],
  [Explor1, Explor1, Math3, PE, Human, Lit2, Eng1],
  [History, Math1, Art, Math2, Creaty, Creaty, Creaty],
  [Lit2, Math2, Explor2, Explor2, Lit1, Foregin, Eng3],
  [Eng1, Lit3, Eng2, Creaty, Explor1, Math1, Music]
];

const makeTable = (tableObject, args) => {

  const table = document.createElement('table');
  table.id = tableObject.id;
  
  const captionBox = document.createElement('caption');
  captionBox.textContent = tableObject.caption;

  table.appendChild(captionBox);
  table.appendChild(tableObject.makeHead(args));
  table.appendChild(tableObject.makeBody(args));

  return table;
}

const keyf_pop = [
  { opacity: '0', easing: "ease-out"},
  { opacity: '1', offset: 0.5, easing: "ease-in"}
];
const onSubjectTdClicked = (teacher) => {

  const teacher_name_div = document.getElementById("teacher_name");
  teacher_name_div.textContent = teacher + ' 선생님'
  teacher_name_div.getAnimations().forEach(animation => animation.cancel());
  teacher_name_div.style.display = "block";
  teacher_name_div.animate(
    keyf_pop, {
      duration: 500,
      fill: "both",
      iterations: 2,
      direction: "alternate"
    }
  ).onfinish = () => teacher_name_div.style.display = "none";
}

const SimpleTable = {
  id: 'today_time_table',
  caption: '오늘의 시간표',
  makeHead: function({current_class}) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for(let i=0;i<7;i++) {
      const th = document.createElement('th');
      th.textContent = (i+1) + '교시';
      if(i == current_class-1) th.classList.add('lin-highlight1');
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
  },
  makeBody: function({week_index, current_class}) {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    cla[week_index].forEach((sub, idx) => {
      const td = document.createElement('td');
      td.textContent = sub + '';
      td.onclick = () => onSubjectTdClicked(sub.teacher);
      if(idx == current_class-1) td.classList.add('lin-highlight1');
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    return tbody;
  }
};

const MainTable = {
  id: 'time_table',
  caption: 'Time Table',
  makeRow: function(week_index, subjects, highlight) {
    const tr = document.createElement('tr');
    if(highlight) tr.classList.add('lin-highlight2');

    const th = document.createElement('th');
    th.textContent = week_name[week_index] + '요일';
    tr.appendChild(th);
    subjects.forEach(sub => {
      const td = document.createElement('td');
      td.textContent = sub + '';
      td.onclick = () => onSubjectTdClicked(sub.teacher);
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
  makeBody: function({week_index}) {
    const tbody = document.createElement('tbody');
    for(let i=0;i<5;i++) {
      tbody.appendChild(
        this.makeRow(i, cla[i], week_index == i));
    }
    return tbody;
  }
};

const ExamTable = {
  id: '',
  caption: '',
  makeHead: function() {},
  makeBody: function() {}
};

const toWeekdayPreiod = index => Math.max(Math.min(index, 5), 1) -1;

function getElapsedTime(fromHour, fromMinute, toHour, toMinute) {
  const h = toHour - fromHour;
  const m = toMinute - fromMinute;
  const now = (h*60) + m;
  return now;
}

//[start hours, start minutes, duration]
const class_times = [
  [8, 0, 80], // Morning time and 1st class (8:00~9:20)
  [9, 20, 60], // free time and 2nd class (9:20~10:20)
  [10, 20, 60], // free time and 3rd class (10:20~11:20)
  [11, 20, 60], // free time and 4th class (11:20~12:20)
  [12, 20, 100], // lunch time(12:20~13:10) and 5th class(13:10~14:00) (12:20~14:00)
  [14, 0, 60], // free time and 6th class (14:00~, 15:00)
  [15, 0, 60]  // free time and 7th class (15:00~, 16:00)
]

function getClassIndex(hour, minute) {
  let return_index = -1;
  class_times.forEach(([start_hour, start_minutes, duration], index) => {
    const pre = getElapsedTime(start_hour, start_minutes, hour, minute);
    if(pre >=0 && pre < duration) return_index = index+1;
  })
  return return_index;
}

function updateMainScreen(week_index, current_class) {
  const main = document.querySelector('main');
  const inner = [];

  const p = document.createElement('p');
  p.id = 'text_time';
  p.classList.add('lin');
  if(current_class > 0) p.textContent = `>> ${current_class}교시 <<`;
  inner.push(p);
  inner.push(
    makeTable(SimpleTable, {week_index: week_index, current_class: current_class}),
    makeTable(MainTable, {week_index: week_index}),
    // makeTable(ExamTable)
  );
  main.replaceChildren(...inner);
}

function getDate() {
  const date = new Date();
  return {
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
}

function render() {
  const time = getDate();
  const week_index = toWeekdayPreiod(time.day);
  const current_class = getClassIndex(time.hours, time.minutes);

  updateMainScreen(week_index, current_class);
  updateSchoolTimeBar(time);
}
const school_time = { hours: 16, minutes: 0, seconds: 0 }
function updateSchoolTimeBar({hours, minutes, seconds}) {
  const fix = number => number.toFixed(1);
  const footer = document.getElementById("footer");
  const sum_time = (function() {
    const untill_hour = school_time.hours - hours;
    const untill_minute = school_time.minutes - minutes;
    const untill_second = school_time.seconds - seconds;
    return untill_hour*3600 + untill_minute*60 + untill_second;
  })();
  if (sum_time >= 0) footer.innerHTML = `하교까지 약 <span>${fix(sum_time/3600)}</span>시간 = <span>${fix(sum_time/60)}</span>분 = <span>${sum_time}</span>초 남았다!`
}

render()
setInterval(render, 1000);