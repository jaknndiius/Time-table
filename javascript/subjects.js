'use strict'
class ExamAttribute {
  constructor(selective, descriptive) {
    this.selective = selective;
    this.descriptive = descriptive;
    this.ranges = [];
  }
  addRange(range) { 
    this.ranges.push(range);
    return this;
  }
}
class Subject {
  constructor(subjectName, teacher) {
    this.subjectName = subjectName;
    this.teacher = teacher;
  }
  toString() {
    return this.subjectName;
  }
  setExam(examAttribute) {
    this.examAttribute = examAttribute;
  }
}
class MultipleSubject extends Subject {
  constructor(subjectName, teacher, suffix) {
    super(subjectName, teacher);
    this.suffix = suffix;
  }
  toString() { return this.subjectName[0] + this.suffix; }
}
class ExplorSubject extends MultipleSubject {
  toString() { return this.subjectName + this.suffix; }
}

function createSubjectList(subjectName, teachers) {
  const subjects = teachers.map(
    (teacher, index) => new MultipleSubject(subjectName, teacher, index+1));
  const func = number => subjects[number-1];
  func.toString = () => subjectName;
  func.setExam = function(examAttribute) {
    this.examAttribute = examAttribute;
  };
  return func;
}
// 문학
const Lit = createSubjectList('문학', ['윤동희', '신치훈', '김병호']);
// 인상
const Human = new Subject('인상', '윤동희');
// 영어
const Eng = createSubjectList('영어', ['장인석', '이석훈', '장인석']);
// 수학
const Mathmatics = createSubjectList('수학', ['노현태', '박진우', '박진우']);
//탐구
const ExplorA = new ExplorSubject('물리', '황준식', 'A');
const ExplorB = new ExplorSubject('지학', '이은진', 'B');
// 음악
const Music = new Subject('음악', '지세현');
// 체육
const PE = new Subject('체육', '박영덕');
// 국사
const History = new Subject('국사', '김진영');
// 미술
const Art = new Subject('미술', '권유정');
// 외국어
const Foregin = new Subject('일본어', '김희인');
// 창체
const Creaty = new Subject('창체', '장인석');

//모의고사
const mockTests = [
  new Date('2023-3-23'),
  new Date('2023-6-1'),
  new Date('2023-9-6'),
  new Date('2023-11-21')
];