'use strict'

const week_name = ["월", "화", "수", "목", "금"];

const cla = [
  [Lit1, Eng2, Math1, Creaty, Math2, Music, Explor2],
  [Explor1, Explor1, Math3, PE, Human, Lit2, Eng1],
  [History, Math1, Art, Math2, Creaty, Creaty, Creaty],
  [Lit2, Math2, Explor2, Explor2, Lit1, Foregin, Eng3],
  [Eng1, Lit3, Eng2, Creaty, Explor1, Math1, Music]
];

const reloadTable = (tableObject, args) => {

  const table = document.querySelector('#' + tableObject.id);
  const inner = [];
  const captionBox = document.createElement('caption');
  captionBox.textContent = tableObject.caption;

  inner.push(
    captionBox,
    tableObject.makeHead(args),
    tableObject.makeBody(args));

  table.replaceChildren(...inner);
  return table;
}

class Table {
  constructor(id, caption) {
    this.id = id;
    this.caption = caption;
  }

  makeClickableSubject(subject_name) {
    const p = document.createElement('p');
    p.classList.add('subject_name');
    p.textContent = subject_name;
    p.onclick = (event) => this.onSubjectTdClicked(event.target);
    return p;
  }
  makeClickableTeacher(teacher_name) {
    const p = document.createElement('p');
    p.classList.add('teacher_name');
    p.textContent = teacher_name;
    p.style.display = 'none';
    p.onclick = (event) => this.onTeacherTdClicked(event.target);
    return p;
  }

  onSubjectTdClicked(subjectTd) {
    const teacherTd = subjectTd.parentElement.querySelector('.teacher_name');
    subjectTd.style.display = 'none';
    teacherTd.style.display = 'block';
  }
  onTeacherTdClicked(teacherTd) {
    const subjectTd = teacherTd.parentElement.querySelector('.subject_name');
    teacherTd.style.display = 'none';
    subjectTd.style.display = 'block';
  }

  makeHead() {}
  makeBody() {}

  reload(head, body) {
    const table = document.querySelector('#' + this.id);
    const inner = [];
    const captionBox = document.createElement('caption');
    captionBox.textContent = this.caption;
  
    inner.push(captionBox, head, body);
  
    table.replaceChildren(...inner);
    return table;
  }
}

class SimpleTable extends Table {
  constructor() {
    super('today_time_table', '오늘의 시간표');
  }
  makeHead(current_class) {
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
  }
  makeBody(week_index, current_class) {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    cla[week_index].forEach((sub, idx) => {
      const td = document.createElement('td');
      if(idx == current_class-1) td.classList.add('lin-highlight1');

      const subject_name_p = this.makeClickableSubject(sub + '');
      const teacher_name_p = this.makeClickableTeacher(sub.teacher);

      td.appendChild(subject_name_p);
      td.appendChild(teacher_name_p);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    return tbody;
  }
  reload(week_index, current_class) {
    super.reload(
      this.makeHead(current_class),
      this.makeBody(week_index, current_class));
  }
}

class MainTable extends Table {
  constructor() {
    super('time_table', 'Time Table');
  }

  makeRow(week_index, subjects, highlight) {
    const tr = document.createElement('tr');
    if(highlight) tr.classList.add('lin-highlight2');

    const th = document.createElement('th');
    th.textContent = week_name[week_index] + '요일';
    tr.appendChild(th);
    subjects.forEach(sub => {
      const td = document.createElement('td');

      td.appendChild(this.makeClickableSubject(sub + ''));
      td.appendChild(this.makeClickableTeacher(sub.teacher));
      tr.appendChild(td);
    });
    return tr;
  }
  makeHead() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    tr.appendChild(document.createElement('th'));
    for(let i=0;i<7;i++) {
      const th = document.createElement('th');
      th.textContent = (i+1) + '교시';
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
  }
  makeBody(week_index) {
    const tbody = document.createElement('tbody');
    for(let i=0;i<5;i++) {
      tbody.appendChild(
        this.makeRow(i, cla[i], week_index == i));
    }
    return tbody;
  }
  reload(week_index) {
    super.reload(
      this.makeHead(),
      this.makeBody(week_index));
  }
}

class ExamTable extends Table {}

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

const Previouis = {
  current_class: -100,
  week_index: -100,
};

const simpleT = new SimpleTable();
const mainT = new MainTable();

function updateMainScreen(week_index, current_class) {

  if(current_class != Previouis.current_class) {
    if(current_class > 0)
      document.querySelector('#text_time').textContent = `>> ${current_class}교시 <<`;

    simpleT.reload(week_index, current_class);
    Previouis.current_class = current_class;
  }

  if(week_index != Previouis.week_index) {
    mainT.reload(week_index);
    Previouis.week_index = week_index;
  }

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
  // if (sum_time >= 0)
  footer.innerHTML = `하교까지 약 <span>${fix(sum_time/3600)}</span>시간 = <span>${fix(sum_time/60)}</span>분 = <span>${sum_time}</span>초 남았다!`
}

render()
setInterval(render, 1);