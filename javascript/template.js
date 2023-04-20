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


마지막에
Start.loadPage();
를 호출해야지 페이지가 로딩됨.
*/