'use strict'
/*
기본 과목 생성 방법
const A = new Subject(subjectName: string, teacher: string)
> 표시될 때 이름 그대로 표시됨

수1, 수2같은 여러개인 과목 생성 방법
const B = new SubjectList(subjectName: string, teachers: string[]) : (order: number) => MultipleSubject
> B(1), B(2) 같은 방법으로 접근 가능하며 이때 B(order: number)는 MultipleSubject 클래스임. 
> order는 teachers의 선생님 순으로 1부터 시작
> 표시될 때 과목 앞 글자와 숫자를 붙여 표시됨

시험 설정
(*과목).setExam(examAttribute: *ExamArrtibute)
*과목은 Subject, SubjectList, MultipleSubject, 모두 가능
*ExamAttribute 생성 방법:
  new ExamAttribute(selective: number, descriptive: number)
  > 객관식, 서술형 갯수 설정
  
  ExamAttribute.addRange(range: string) : ExamAttribute
  > 과목의 범위 설명 한 줄을 추가하고 자신을 다시 반환

모의고사 날짜 설정
Setting.addMockTest(dateFormat: string)
> YYYY/MM/DD 포멧으로 설정. '-'을 쓰면 IOS 환경에서 오류남

과목 그룹화
Setting.group(...subjects: ...Subject): SubjectGroup

정규 시간표 설정
SubjectGroup.setToRegularSchedule(day: Day)
> Day 객체 사용

시험 시간표 설정
SubjectGrouop.setToExamSchedule(month: number. date: number)
> 날짜 정렬 기능은 없으며 설정한 순서대로 표시됨

*/
// 문학
const Lit = new SubjectList('문학', ['윤동희', '신치훈', '김병호']);
Lit.setExam(
  new ExamAttribute(22, 2)
    .addRange('교과서: 처음~p113')
);
// 인상
const Human = new Subject('인상', '윤동희');
// 영어
const Eng = new SubjectList('영어', ['장인석', '이석훈', '장인석']);
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
//모의고사
Setting.addMockTest('2023/03/23');
Setting.addMockTest('2023/06/01');
Setting.addMockTest('2023/09/06');
Setting.addMockTest('2023/11/21');
//시간표
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

Setting.group(Mathmatics(2))
  .setToExamSchedule(4, 28);
Setting.group(Lit)
  .setToExamSchedule(5, 1);
Setting.group(Eng, EarthScience)
  .setToExamSchedule(5, 2);
Setting.group(Mathmatics(1), KHistory, Physics)
  .setToExamSchedule(5, 3);
