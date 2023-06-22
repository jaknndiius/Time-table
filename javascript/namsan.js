'use strict'
import {
  Subject, SubjectList, ExamAttribute, Setting, Day, loadPage, ClassTimeList
} from 'https://jaknndiius.github.io/TimeTableAPI/js/timeTableAPI.js';
// 문학
const Lit = new SubjectList('문학', ['윤동희', '신치훈', '김병호']);
Lit.setExam(
  new ExamAttribute(22, 2)
    .addRange('교과서: p114~254')
);
// 인상
const Human = new Subject('인상', '윤동희');
// 영어
const Eng = new SubjectList('영어', ['장인석', '이성훈', '장인석']);
Eng.setExam(
  new ExamAttribute(24,4)
    .addRange('교과서: lesson 4,5, special')
    .addRange('컨셉: UNIT 7~12(p.46~84)')
    .addRange('컨셉: 유형 독해 모의고사 2,3회(p.156~167)')
    .addRange('컨셉: 서술형은 UNIT 7~10(ㅔ46~57, 66~69)')
    .addRange('6월 학평: 18~45번(서술형 제외)')
);
// 수학
const Mathmatics = new SubjectList('수학', ['노현태', '박진우', '박진우']);
Mathmatics[1].setExam(
  new ExamAttribute(16, 4)
    .addRange('교과서: p86~153')
    .addRange('학습지: 100문제(사인 법칙과 코사인 법칙-수학적 귀납법)')
);
Mathmatics[2].setExam(
  new ExamAttribute(16, 4)
    .addRange('교과서: p72~p155')
    .addRange('학습지: 100문제(51번 제외)')
);
//탐구
const Physics = new Subject('물리', '황준식');
Physics.setExam(
  new ExamAttribute(20, 4)
    .addRange('교과서: p94~210')
    .addRange('완자: 교과서 해당 내용까지')
);
const EarthScience = new Subject('지학', '정희찬');
EarthScience.setExam(
  new ExamAttribute(20, 4)
    .addRange('교과서: p80~143')
    .addRange('완자: 교과서 해당 내용까지')
);
// 음악
const Music = new Subject('음악', '지세현');
// 체육
const PE = new Subject('체육', '박영덕');
// 국사
const KHistory = new Subject('국사', '김진영');
KHistory.setExam(
  new ExamAttribute(20,3)
    .addRange('교과서: p204~254(p230 냉전 체제가 형성되다 제외)')
    .addRange('학습지: Ⅲ p9~11, Ⅳ p1~4')
);
// 미술
const Art = new Subject('미술', '권유정');
// 외국어
const Foregin = new Subject('일본어', '김희인');
Foregin.setExam(
  new ExamAttribute(20, 5)
    .addRange('교과서: p12~55')
    .addRange('학습지: 수행평가 문장 30개')
);
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
Setting.group(Lit[1], Eng[2], Mathmatics[1], Creaty, Mathmatics[2], Music, EarthScience)
  .setToRegularSchedule(Day.MONDAY);
Setting.group(Physics, Physics, Mathmatics[3], PE, Human, Lit[2], Eng[1])
  .setToRegularSchedule(Day.THEUSDAY);
Setting.group(KHistory, Mathmatics[1], Art, Mathmatics[2], Creaty, Creaty, Creaty)
  .setToRegularSchedule(Day.WEDNESDAY);
Setting.group(Lit[2], Mathmatics[2], EarthScience, EarthScience, Lit[1], Foregin, Eng[3])
  .setToRegularSchedule(Day.THURSDAY);
Setting.group(Eng[1], Lit[3], Eng[2], Creaty, Physics, Mathmatics[1], Music)
  .setToRegularSchedule(Day.FIRDAY);
// 시험 시간표
Setting.group(Eng, Physics)
  .setToExamSchedule(7, 3);
Setting.group(Mathmatics[1], KHistory, EarthScience)
  .setToExamSchedule(7, 4);
Setting.group(Mathmatics[2], Foregin)
  .setToExamSchedule(7, 5);
Setting.group(Lit)
  .setToExamSchedule(7, 6);

loadPage();