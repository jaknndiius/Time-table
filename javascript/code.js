'use strict'
const weekName = ["월", "화", "수", "목", "금"];
const toWeekdayPreiod = index => Math.max(Math.min(index, 5), 1) -1;
const createElementWithText = (tag, textContent) => {
  const element = document.createElement(tag);
  element.textContent = textContent;
  return element;
}
const EventHandler = {
  onSubjectTdClicked: (subjectTd) => {
    const teacherTd = subjectTd.parentElement.querySelector('.teacher_name');
    subjectTd.style.display = 'none';
    teacherTd.style.display = 'block';
  },
  onTeacherTdClicked: (teacherTd) => {
    const subjectTd = teacherTd.parentElement.querySelector('.subject_name');
    teacherTd.style.display = 'none';
    subjectTd.style.display = 'block';
  }
}
const ElementCreator = {
  makeClickableSubject: (subjectName) => {
    const p = createElementWithText('p', subjectName);
    p.classList.add('subject_name');
    p.onclick = (event) => EventHandler.onSubjectTdClicked(event.target);
    return p;
  },
  makeClickableTeacher: (teacherName) => {
    const p = createElementWithText('p', teacherName);
    p.classList.add('teacher_name');
    p.style.display = 'none';
    p.onclick = (event) => EventHandler.onTeacherTdClicked(event.target);
    return p;
  },
  makeClickableTd: (subjectName, teacherName) => {
    const td = document.createElement('td');
    td.appendChild(ElementCreator.makeClickableSubject(subjectName));
    td.appendChild(ElementCreator.makeClickableTeacher(teacherName));
    return td;
  }
}
class Table {
  constructor(id, caption) {
    this.id = id;
    this.caption = caption;
  }

  makeHead() {}
  makeBody() {}
}
class SimpleTable extends Table {
  constructor(id, caption) {
    if(SimpleTable.instance) throw new Error('alreay instantiated class.');
    super(id, caption);
    SimpleTable.instance = this;
  }
  static getInstance() {
    if(!this.instance) this.instance = new SimpleTable('today_time_table', '오늘의 시간표');
    return this.instance;
  }
  makeHead(currentClass) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for(let i=0;i<7;i++) {
      const th = createElementWithText('th', (i+1) + '교시');
      if(i == currentClass-1) th.classList.add('lin-highlight1');
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
  }
  makeBody(weekIndex, currentClass) {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    Setting.getSubjectsByTime()[weekIndex].forEach((sub, idx) => {
      const td = ElementCreator.makeClickableTd(sub+'', sub.teacher);
      if(idx == currentClass-1) td.classList.add('lin-highlight1');
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    return tbody;
  }
  static reload(weekIndex, currentClass) {
    const instance = SimpleTable.getInstance();
    const table = document.querySelector('#' + instance.id);
    table.replaceChildren(
      createElementWithText('caption', instance.caption),
      instance.makeHead(currentClass),
      instance.makeBody(weekIndex, currentClass));
  }
}
class MainTable extends Table {
  constructor(id, caption) {
    if(MainTable.instance) throw new Error('alreay instantiated class.');
    super(id, caption);
    MainTable.instance = this;
  }
  static getInstance() {
    if(!this.instance) this.instance = new MainTable('time_table', 'Time Table');
    return this.instance;
  }
  makeRow(weekIndex, subjects, highlight) {
    const tr = document.createElement('tr');
    if(highlight) tr.classList.add('lin-highlight2');

    tr.appendChild(
      createElementWithText('th', weekName[weekIndex] + '요일'));
    subjects.forEach(sub =>
      tr.appendChild(ElementCreator.makeClickableTd(sub+'', sub.teacher)));
    return tr;
  }
  makeHead() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    tr.appendChild(document.createElement('th'));
    for(let i=0;i<7;i++)
      tr.appendChild(
        createElementWithText('th', (i+1) + '교시'));
    thead.appendChild(tr);
    return thead;
  }
  makeBody(weekIndex) {
    const tbody = document.createElement('tbody');
    for(let i=0;i<5;i++) {
      tbody.appendChild(
        this.makeRow(i, Setting.getSubjectsByTime()[i], weekIndex == i));
    }
    return tbody;
  }
  static reload(weekIndex) {
    const instance = MainTable.getInstance();
    const table = document.querySelector('#' + instance.id);
    table.replaceChildren(
      createElementWithText('caption', instance.caption),
      instance.makeHead(),
      instance.makeBody(weekIndex));
  }
}
class ExamTable extends Table {
  constructor(id, caption) {
    if(ExamTable.instance) throw new Error('alreay instantiated class.');
    super(id, caption);
    ExamTable.instance = this;
  }
  static getInstance() {
    if(!this.instance) this.instance = new ExamTable('exam_time_table', '시험 시간표');
    return this.instance;
  }
  koreanDay = ['첫째날', '둘째날', '셋째날', '넷째날'];
  makeModalWindow(subject) {
    const attribute = subject.examAttribute;
    const popupDiv = document.createElement('div');
    popupDiv.id = 'popup';

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    const header = document.createElement('header');
    header.appendChild(createElementWithText('div', subject));
    const button = document.createElement('button');
    button.appendChild(document.createElement('div'));
    button.appendChild(document.createElement('div'));
    button.onclick = () => popupDiv.remove();
    header.appendChild(button);
    textDiv.appendChild(header);

    const main = document.createElement('main');
    const rangeUl = document.createElement('ul');
    rangeUl.id = 'range';

    for(const range of attribute.ranges)
      rangeUl.appendChild(
        createElementWithText('li', range));
    main.appendChild(rangeUl);
    const questionsNumberUl = document.createElement('ul');
    questionsNumberUl.id = 'questions_number';
    attribute.selective > 0 &&
      questionsNumberUl.appendChild(
        createElementWithText('li', `객관식 ${attribute.selective}개`));
    attribute.descriptive > 0 &&
      questionsNumberUl.appendChild(
        createElementWithText('li', `서술형 ${attribute.descriptive}개`));
    main.appendChild(questionsNumberUl);
    textDiv.appendChild(main);

    popupDiv.appendChild(textDiv);
    return popupDiv;
  }
  onExamTdClicked(subject) {
    document.querySelector('#main').appendChild(
      this.makeModalWindow(subject));
  }
  formatDate(day) {
    return `${day.getMonth()+1}/${day.getDate()} ${weekName[day.getDay()-1] || ''}`;
  }
  makeHead() {
    const thead = document.createElement('thead');

    const koreanDayTr = document.createElement('tr');
    koreanDayTr.appendChild(document.createElement('th'));
    const numberDayTr = document.createElement('tr');
    numberDayTr.appendChild(document.createElement('th'));
  
    Setting.getExamList().forEach(({day}, index) => {
      koreanDayTr.appendChild(
        createElementWithText('th', this.koreanDay[index]));
      numberDayTr.appendChild(
        createElementWithText('th', `${this.formatDate(day)}`));
    });

    thead.appendChild(koreanDayTr);
    thead.appendChild(numberDayTr);
    return thead;
  }
  makeBody() {
    const tbody = document.createElement('tbody');
    const maxSize = Math.max(...Setting.getExamList().map(exams => exams.subjects.length));

    const examsByTime = new Array(maxSize).fill().map(_ => []);
    
    Setting.getExamList().forEach(exams => examsByTime.forEach((arr, idx) => arr.push(exams.subjects[idx])));

    examsByTime.forEach((exams, index) => {
      const tr = document.createElement('tr');
      tr.appendChild(createElementWithText('th', (index+1) + '교시'));
      for(const subject of exams) {
        let td;
        if(subject == undefined) td = createElementWithText('td', '-');
        else {
          td = createElementWithText('td', subject);
          td.onclick = () => this.onExamTdClicked(subject);
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    });
    return tbody;
  }
  static reload() {
    const instance = ExamTable.getInstance();
    const table = document.querySelector('#' + instance.id);
    table.replaceChildren(
      createElementWithText('caption', instance.caption),
      instance.makeHead(),
      instance.makeBody());
  }
}
class MoakTestNoti {
  constructor() {
    if(MoakTestNoti.instance) throw new Error('alreay instantiated class.');
    MoakTestNoti.instance = this;
  }
  static getInstance() {
    if(!this.instance) this.instance = new MoakTestNoti();
    return this.instance;
  }
  options = { month: 'long', day: 'numeric'}
  getDDay(targetDate) {
    const today = new Date();
    const timeDiff = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000*60*60*24));
  }
  getFastestDDay() {
    for(const mockTest of Setting.getMockTests()) {
      const dDay = this.getDDay(mockTest);
      if(dDay >= 0) return {
        date: mockTest.toLocaleDateString('ko-KR', this.options),
        dDay: dDay
      };
    }
    return null;
  }
  static reload() {
    const mockTestNotiDiv = document.querySelector('#moak_test_noti');
    const dDay = MoakTestNoti.getInstance().getFastestDDay();
    const titleDiv = createElementWithText('div', `모의고사 ${dDay.date}`);
    const dDayDiv = createElementWithText('div', `D-day ${dDay.dDay}일`);
    mockTestNotiDiv.replaceChildren(titleDiv, dDayDiv);
  }
}
const getElapsedTime = (fromHour, fromMinute, toHour, toMinute) => ((toHour-fromHour)*60) + toMinute-fromMinute;
//[start hours, start minutes, duration]
const classTimes = [
  [8, 0, 80], // Morning time and 1st class (8:00~9:20)
  [9, 20, 60], // free time and 2nd class (9:20~10:20)
  [10, 20, 60], // free time and 3rd class (10:20~11:20)
  [11, 20, 60], // free time and 4th class (11:20~12:20)
  [12, 20, 100], // lunch time(12:20~13:10) and 5th class(13:10~14:00) (12:20~14:00)
  [14, 0, 60], // free time and 6th class (14:00~, 15:00)
  [15, 0, 60]  // free time and 7th class (15:00~, 16:00)
]
const getClassIndex = (hour, minute) => {
  let returnIndex = -1;
  classTimes.forEach(([startHour, startMinutes, duration], index) => {
    const pre = getElapsedTime(startHour, startMinutes, hour, minute);
    if(pre >=0 && pre < duration) returnIndex = index+1;
  })
  return returnIndex;
}
const Previouis = { currentClass: -100, weekIndex: -100 };
const updateMainScreen = (weekIndex, currentClass) => {
  if(currentClass != Previouis.currentClass) {
    if(currentClass > 0)
      document.querySelector('#text_time').textContent = `>> ${currentClass}교시 <<`;
    SimpleTable.reload(weekIndex, currentClass);
    Previouis.currentClass = currentClass;
  }
  if(weekIndex != Previouis.weekIndex) {
    MainTable.reload(weekIndex);
    Previouis.weekIndex = weekIndex;
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
  const weekIndex = toWeekdayPreiod(time.day);
  const currentClass = getClassIndex(time.hours, time.minutes);
  updateMainScreen(weekIndex, currentClass);
  updateSchoolTimeBar(time);
}
const schoolTime = { hours: 16, minutes: 0, seconds: 0 }
const updateSchoolTimeBar = ({hours, minutes, seconds}) => {
  const fix = number => number.toFixed(1);
  const footer = document.getElementById("footer");
  const sumTime = (function() {
    const untilHours = schoolTime.hours - hours;
    const untilMinutes = schoolTime.minutes - minutes;
    const untilSeconds = schoolTime.seconds - seconds;
    return untilHours*3600 + untilMinutes*60 + untilSeconds;
  })();
  if (sumTime >= 0) footer.innerHTML = `하교까지 약 <span>${fix(sumTime/3600)}</span>시간 = <span>${fix(sumTime/60)}</span>분 = <span>${sumTime}</span>초 남았다!`
}

// load page
ExamTable.reload();
MoakTestNoti.reload();
setInterval(render, 1);