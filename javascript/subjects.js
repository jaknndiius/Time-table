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
class SubjectList {
  constructor(subjectName, teachers) {
    const subjects = teachers.map(
      (teacher, index) => new MultipleSubject(subjectName, teacher, index+1));
      
    const listFunction = order => subjects[order-1];
    listFunction.toString = () => subjectName;
    listFunction.setExam = function(examAttribute) {
      this.examAttribute = examAttribute;
    };
    return listFunction;
  }
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
class Exams {
  constructor(month, date) {
    this.day = new Date(`${new Date().getFullYear()}/${month}/${date}`);
  }
  setSubjects(...subjects) {
    this.subjects = subjects;
    return this;
  }
}
class SubjectGroup {
  constructor(...subjects) {
    this.subjects = subjects;
  }
  setToRegularSchedule(day) {
    Setting.addSubjectsToSchedule(day, this.subjects);
  }
  setToExamSchedule(month, date) {
    Setting.addExams(month, date, this.subjects);
  }
}
class Setting {
  constructor() {
    if(Setting.instance) throw new Error('alreay instantiated class.');
    this.mockTests = [];
    this.subjectsByTime = [];
    this.examList = [];
    Setting.instance = this;
  }
  static getInstance() {
    if(!this.instance) this.instance = new Setting();
    return this.instance;
  }
  static getMockTests() {
    return Setting.getInstance().mockTests;
  }
  static getSubjectsByTime() {
    return Setting.getInstance().subjectsByTime;
  }
  static getExamList() {
    return Setting.getInstance().examList;
  }
  static addMockTest(dateFormat) {
    Setting.getInstance().mockTests.push(new Date(dateFormat));
  }
  static group(...subjects) {
    return new SubjectGroup(...subjects);
  }
  static addSubjectsToSchedule(day, subjects) {
    Setting.getInstance().subjectsByTime[day] = subjects;
  }
  static addExams(month, date, subjects) {
    Setting.getInstance().examList.push(
      new Exams(month, date)
        .setSubjects(...subjects)
    );
  }
}
const Day = {
  MONDAY: 0,
  THEUSDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FIRDAY: 4
}