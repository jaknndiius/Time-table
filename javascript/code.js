'use strict'
const week_name = ["월", "화", "수", "목", "금"];
const subjects_by_time = [
  [Lit1, Eng2, Math1, Creaty, Math2, Music, Explor2],
  [Explor1, Explor1, Math3, PE, Human, Lit2, Eng1],
  [History, Math1, Art, Math2, Creaty, Creaty, Creaty],
  [Lit2, Math2, Explor2, Explor2, Lit1, Foregin, Eng3],
  [Eng1, Lit3, Eng2, Creaty, Explor1, Math1, Music]
];
class Table {
  createElementWithText(tag, textContent) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
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
  makeClickableSubject(subject_name) {
    const p = this.createElementWithText('p', subject_name);
    p.classList.add('subject_name');
    p.onclick = (event) => this.onSubjectTdClicked(event.target);
    return p;
  }
  makeClickableTeacher(teacher_name) {
    const p = this.createElementWithText('p', teacher_name);
    p.classList.add('teacher_name');
    p.style.display = 'none';
    p.onclick = (event) => this.onTeacherTdClicked(event.target);
    return p;
  }
  makeClickableTd(subject_name, teacher_name) {
    const td = document.createElement('td');
    td.appendChild(this.makeClickableSubject(subject_name));
    td.appendChild(this.makeClickableTeacher(teacher_name));
    return td;
  }
  makeHead() {}
  makeBody() {}
}
class SimpleTable extends Table {
  static id = 'today_time_table';
  static caption = '오늘의 시간표';
  constructor() {
    if(SimpleTable.instance) throw new Error('alreay instantiated class.');
    // super('today_time_table', '오늘의 시간표');
    super();
    SimpleTable.instance = this;
  }
  static getInstance() {
    if(!this.instance) this.instance = new SimpleTable();
    return this.instance;
  }
  makeHead(current_class) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for(let i=0;i<7;i++) {
      const th = this.createElementWithText('th', (i+1) + '교시');
      if(i == current_class-1) th.classList.add('lin-highlight1');
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
  }
  makeBody(week_index, current_class) {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    subjects_by_time[week_index].forEach((sub, idx) => {
      const td = this.makeClickableTd(sub+'', sub.teacher);
      if(idx == current_class-1) td.classList.add('lin-highlight1');
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    return tbody;
  }
  static reload(week_index, current_class) {
    const instance = SimpleTable.getInstance();
    const table = document.querySelector('#' + SimpleTable.id);
    table.replaceChildren(
      instance.createElementWithText('caption', SimpleTable.caption),
      instance.makeHead(current_class),
      instance.makeBody(week_index, current_class));
  }
}
class MainTable extends Table {
  static id = 'time_table';
  static caption = 'Time Table';
  constructor() {
    if(MainTable.instance) throw new Error('alreay instantiated class.');
    super();
    MainTable.instance = this;
  }
  static getInstance() {
    if(!this.instance) this.instance = new MainTable();
    return this.instance;
  }
  makeRow(week_index, subjects, highlight) {
    const tr = document.createElement('tr');
    if(highlight) tr.classList.add('lin-highlight2');

    tr.appendChild(
      this.createElementWithText('th', week_name[week_index] + '요일'));
    subjects.forEach(sub =>
      tr.appendChild(this.makeClickableTd(sub+'', sub.teacher)));
    return tr;
  }
  makeHead() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    tr.appendChild(document.createElement('th'));
    for(let i=0;i<7;i++)
      tr.appendChild(
        this.createElementWithText('th', (i+1) + '교시'));
    thead.appendChild(tr);
    return thead;
  }
  makeBody(week_index) {
    const tbody = document.createElement('tbody');
    for(let i=0;i<5;i++) {
      tbody.appendChild(
        this.makeRow(i, subjects_by_time[i], week_index == i));
    }
    return tbody;
  }
  static reload(week_index) {
    const instance = MainTable.getInstance();
    const table = document.querySelector('#' + MainTable.id);
    table.replaceChildren(
      instance.createElementWithText('caption', MainTable.caption),
      instance.makeHead(),
      instance.makeBody(week_index));
  }
}
class ExamTable extends Table {
  static id = 'exam_time_table';
  static caption = '시험 시간표';
  constructor() {
    if(ExamTable.instance) throw new Error('alreay instantiated class.');
    super();
    ExamTable.instance = this;
  }
  static getInstance() {
    if(!this.instance) this.instance = new ExamTable();
    return this.instance;
  }
  korean_day = ['첫째날', '둘째날', '셋째날', '넷째날'];
  makeModalWindow(exam) {
    const popup_div = document.createElement('div');
    popup_div.id = 'popup';

    const text_div = document.createElement('div');
    text_div.classList.add('text');

    const header = document.createElement('header');
    header.appendChild(this.createElementWithText('div', exam.name));
    const button = document.createElement('button');
    button.appendChild(document.createElement('div'));
    button.appendChild(document.createElement('div'));
    button.onclick = () => popup_div.remove();
    header.appendChild(button);
    text_div.appendChild(header);

    const main = document.createElement('main');
    const range_ul = document.createElement('ul');
    range_ul.id = 'range';
    for(const range of exam.range)
      range_ul.appendChild(
        this.createElementWithText('li', range));
    main.appendChild(range_ul);
    const questions_number_ul = document.createElement('ul');
    questions_number_ul.id = 'questions_number';
    exam.selective > 0 &&
      questions_number_ul.appendChild(
        this.createElementWithText('li', `객관식 ${exam.selective}개`));
    exam.descriptive > 0 &&
      questions_number_ul.appendChild(
        this.createElementWithText('li', `서술형 ${exam.descriptive}개`));
    main.appendChild(questions_number_ul);
    text_div.appendChild(main);

    popup_div.appendChild(text_div);
    return popup_div;
  }
  onExamTdClicked(exam) {
    document.querySelector('#main').appendChild(
      this.makeModalWindow(exam));
  }
  makeHead(exam_list) {
    const thead = document.createElement('thead');

    const korean_day_tr = document.createElement('tr');
    korean_day_tr.appendChild(document.createElement('th'));
    const number_day_tr = document.createElement('tr');
    number_day_tr.appendChild(document.createElement('th'));

    exam_list.forEach(({day}, index) => {
      korean_day_tr.appendChild(
        this.createElementWithText('th', this.korean_day[index]));
      number_day_tr.appendChild(
        this.createElementWithText('th', `${day[0]}/${day[1]} ${week_name[day[2]]}`));
    });

    thead.appendChild(korean_day_tr);
    thead.appendChild(number_day_tr);
    return thead;
  }
  makeBody(exam_list) {
    const tbody = document.createElement('tbody');
    const exams_by_time = [];
    for(const {subject: subjects} of exam_list) {
      subjects.forEach((subject, index) => {
        if(exams_by_time[index] == undefined)
          exams_by_time[index] = new Array();
        
        exams_by_time[index].push(subject);
      });
    }
    exams_by_time.forEach((exams, index) => {
      const tr = document.createElement('tr');
      tr.appendChild(
        this.createElementWithText('td', (index+1) + '교시'));
      for(const exam of exams) {
        const td = this.createElementWithText('td', exam.name);
        td.onclick = () => this.onExamTdClicked(exam);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    });
    return tbody;
  }
  static reload(exam_list) {
    const instance = ExamTable.getInstance();
    const table = document.querySelector('#' + ExamTable.id);
    table.replaceChildren(
      instance.createElementWithText('caption', ExamTable.caption),
      instance.makeHead(exam_list),
      instance.makeBody(exam_list));
  }
}
const toWeekdayPreiod = index => Math.max(Math.min(index, 5), 1) -1;
const getElapsedTime = (fromHour, fromMinute, toHour, toMinute) => {
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
const getClassIndex = (hour, minute) => {
  let return_index = -1;
  class_times.forEach(([start_hour, start_minutes, duration], index) => {
    const pre = getElapsedTime(start_hour, start_minutes, hour, minute);
    if(pre >=0 && pre < duration) return_index = index+1;
  })
  return return_index;
}
const Previouis = { current_class: -100, week_index: -100 };
const updateMainScreen = (week_index, current_class) => {
  if(current_class != Previouis.current_class) {
    if(current_class > 0)
      document.querySelector('#text_time').textContent = `>> ${current_class}교시 <<`;
    SimpleTable.reload(week_index, current_class);
    Previouis.current_class = current_class;
  }
  if(week_index != Previouis.week_index) {
    MainTable.reload(week_index);
    Previouis.week_index = week_index;
  }
}
const getDate = () => {
  const date = new Date();
  return {
    day: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
}
const render = () => {
  const time = getDate();
  const week_index = toWeekdayPreiod(time.day);
  const current_class = getClassIndex(time.hours, time.minutes);
  updateMainScreen(week_index, current_class);
  updateSchoolTimeBar(time);
}
const school_time = { hours: 16, minutes: 0, seconds: 0 }
const updateSchoolTimeBar = ({hours, minutes, seconds}) => {
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
const onLoadFinished = exam_list => {
  ExamTable.reload(exam_list);
  setInterval(render, 1);
}
let exam_list;
fetch('https://jaknndiius.github.io/Time-table/data/exam.json')
  .then(Response => Response.text())
  .then(text => JSON.parse(text))
  .then(onLoadFinished);