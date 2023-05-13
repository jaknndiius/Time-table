'use strict'
import {
  Subject, SubjectList, ExamAttribute, Setting, Day, loadPage, ClassTimeList
} from 'https://jaknndiius.github.io/TimeTableAPI/timeTableAPI.js';
// 문학
const Lit = new SubjectList('문학', ['윤동희', '신치훈', '김병호']);
Lit.setExam(
  new ExamAttribute(22, 2)
    .addRange('교과서: 처음~p113')
);
// 인상
const Human = new Subject('인상', '윤동희');
// 영어
const Eng = new SubjectList('영어', ['장인석', '이성훈', '장인석']);
Eng.setExam(
  new ExamAttribute(24,4)
    .addRange('교과서: lesson 1, 2, 3')
    .addRange('부교재: p8~45, p150~155')
    .addRange('3월 학평: 18~45번')
);
// 수학
const Mathmatics = new SubjectList('수학', ['노현태', '박진우', '박진우']);
Mathmatics(1).setExam(
  new ExamAttribute(16, 4)
    .addRange('교과서: p10~85, p94~100')
    .addRange('학습지: 100문제')
    .addRange('교과서, 학습지 둘 다 「사인법칙과 코사인 법칙」 제외')
);
Mathmatics(2).setExam(
  new ExamAttribute(16, 4)
    .addRange('교과서: 처음~p71')
    .addRange('학습지: 100문제(33번, 34번, 90번 제외)')
);
//탐구
const Physics = new Subject('물리', '황준식');
Physics.setExam(
  new ExamAttribute(20, 4)
    .addRange('교과서: p10~93')
    .addRange('완자: p10~145')
);
const EarthScience = new Subject('지학', '이은진');
EarthScience.setExam(
  new ExamAttribute(20, 4)
    .addRange('교과서: p10~77')
    .addRange('완자: p10~98')
);
// 음악
const Music = new Subject('음악', '지세현');
// 체육
const PE = new Subject('체육', '박영덕');
// 국사
const KHistory = new Subject('국사', '김진영');
KHistory.setExam(
  new ExamAttribute(20,3)
    .addRange('교과서: p162~227(p202~203 제외)')
    .addRange('학습지: Ⅲ p1~11')
);
// 미술
const Art = new Subject('미술', '권유정');
// 외국어
const Foregin = new Subject('일본어', '김희인');
// 창체
const Creaty = new Subject('창체', '장인석');
// 모의고사
Setting.addMoakTest('2023/03/23');
Setting.addMoakTest('2023/06/01');
Setting.addMoakTest('2023/09/06');
Setting.addMoakTest('2023/11/21');
// 수능
Setting.setCSAT('2024/11/14');
// 시간 설정
const classTimes = new ClassTimeList([8, 0], [16, 0], 7);
classTimes.addClassTime(8, 20);
classTimes.addClassTime(9, 20);
classTimes.addClassTime(10, 20);
classTimes.addClassTime(11, 20);
classTimes.addClassTime(12, 20);
classTimes.addClassTime(14, 0);
classTimes.addClassTime(15, 0);
Setting.setClassTime(classTimes);
// 정규 시간표
Setting.group(Lit(1), Eng(2), Mathmatics(1), Creaty, Mathmatics(2), Music, EarthScience)
  .setToRegularSchedule(Day.MONDAY);
Setting.group(Physics, Physics, Mathmatics(3), PE, Human, Lit(2), Eng(1))
  .setToRegularSchedule(Day.THEUSDAY);
Setting.group(KHistory, Mathmatics(1), Art, Mathmatics(2), Creaty, Creaty, Creaty)
  .setToRegularSchedule(Day.WEDNESDAY);
Setting.group(Lit(2), Mathmatics(2), EarthScience, EarthScience, Lit(1), Foregin, Eng(3))
  .setToRegularSchedule(Day.THURSDAY);
Setting.group(Eng(1), Lit(3), Eng(2), Creaty, Physics, Mathmatics(1), Music)
  .setToRegularSchedule(Day.FIRDAY);
// 시험 시간표
// Setting.group(Mathmatics(2))
//   .setToExamSchedule(4, 28);
// Setting.group(Lit)
//   .setToExamSchedule(5, 1);
// Setting.group(Eng, EarthScience)
//   .setToExamSchedule(5, 2);
// Setting.group(Mathmatics(1), KHistory, Physics)
//   .setToExamSchedule(5, 3);

loadPage();