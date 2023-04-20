/*
자바스크립트 내장이 아닌 클래스, 함수, 변수들은 스크립트 내에서 import가 필요합니다.
import { import 할 항목 } from 'https://jaknndiius.github.io/TimeTableAPI/timeTableAPI.js';
으로 import할 수 있습니다.
html 내에서 script 태그에서 이 파일을 선택할 때는 꼭 type='module' 속성을 추가하세요.
*/
import { Subject, SubjectList, ExamAttribute, SuffixType, Setting, Day, loadPage, SelfStudy } from 'https://jaknndiius.github.io/TimeTableAPI/timeTableAPI.js';

/*
< 기본 과목 생성 방법 >
const (변수 명) = new Subject(subjectName: string, teacher: string)
> 화면에 표시될 때 이름 그대로 표시됩니다.
*/
const History = new Subject('한국사', '000'); // 표시될 때 '한국사'로 표시됩니다.

/*
< 수1, 수2같은 여러개인 과목 생성 방법 >
const B = new SubjectList(subjectName: string, teachers: string[], options: Object = {}) : (order: number) => MultipleSubject
> B(1), B(2) 같은 방법으로 접근 가능하며 이때 B(order: number)는 MultipleSubject 클래스임. 
> order는 teachers의 선생님 순으로 1부터 시작
> 표시될 때 과목 앞 글자와 숫자를 붙여 표시됨
> options는 생략 가능하며, 화면에 표시되는 이름을 변경할 수 있습니다.
> options에는 suffixType과 fullName 항목을 설정할 수 있으며,
> suffixType은 기본값은 SuffixType.NUMBER이고 SuffixType 객체의 접미사들을 선택할 수 있고
> fullName은 기본 값은 false며 만약 전체 이름 표시를 원하면 true를 설정할 수 있습니다.
*/
const Literature = new SubjectList('문학', ['000', '111', '222']); // 표시될 때 문1, 문2, 문3으로 표시됨.
console.log(`표시:${Literature(1)} | 선생님:${Literature(1).teacher}`); // 표시: 문1 | 선생님: 000
console.log(`표시:${Literature(2)} | 선생님:${Literature(3).teacher}`); // 표시: 문2 | 선생님: 111
console.log(`표시:${Literature(2)} | 선생님:${Literature(3).teacher}`); // 표시: 문3 | 선생님: 222

const Mathmatics = new SubjectList('수학', ['aaa', 'bbb', 'ccc'], {suffixType: SuffixType.ROMAN});
console.log(`표시:${Mathmatics(1)} | 선생님:${Mathmatics(1).teacher}`); // 표시: 수Ⅰ | 선생님: aaa
console.log(`표시:${Mathmatics(2)} | 선생님:${Mathmatics(2).teacher}`); // 표시: 수Ⅱ | 선생님: bbb
console.log(`표시:${Mathmatics(3)} | 선생님:${Mathmatics(3).teacher}`); // 표시: 수Ⅲ | 선생님: ccc

const Info = new SubjectList('정보', ['xxx', 'yyy'], { suffixType: SuffixType.ALPABET, fullName: true });
console.log(`표시:${Info(1)} | 선생님:${Info(1).teacher}`); // 표시: 정보A | 선생님: xxx
console.log(`표시:${Info(2)} | 선생님:${Info(2).teacher}`); // 표시: 정보A | 선생님: xxx

/*
시험 설정
(*과목).setExam(examAttribute: *ExamArrtibute)
*과목은 Subject, SubjectList, MultipleSubject 모두 가능합니다.
*ExamAttribute 생성 방법:
  new ExamAttribute(selective: number, descriptive: number)
  > 객관식, 서술형 갯수 정보를 가진 ExamAttribute 객체를 생성합니다.
  
  ExamAttribute.addRange(range: string) : ExamAttribute
  > 과목의 범위 설명 한 줄을 추가하고 자신을 다시 반환합니다.

다음은 각각 순서대로 Subject, SubjectList, MultipleSubject에 시험을 설정하는 예시입니다.
*/
History.setExam(
  new ExamAttribute(20, 4)
    .addRange('교과서 처음부터 끝까지')
    .addRange('배부한 학습지 전체')
);
Literature.setExam(
  new ExamAttribute(25, 2)
  .addRange('교과서 전체')
  .addRange('부교재 전체')
);
Mathmatics(1).setExam(
  new ExamAttribute(16, 4)
  .addRange('교과서 싹 다')
);

/*
< 모의고사 날짜 설정 >
Setting.addMockTest(dateFormat: string)
> YYYY/MM/DD 포멧으로 설정해 주세요. 구분자로 '-'을 쓰면 IOS 환경에서 오류가 발생합니다.
*/
Setting.addMockTest('2023/03/23');
Setting.addMockTest('2023/06/01');
Setting.addMockTest('2023/09/06');
Setting.addMockTest('2023/11/21');

/*
< 과목 그룹화 및 시간표 설정 >

과목 그룹화는 Setting.group 메소드를 사용하며 SubjectGroup 객체를 반환합니다.
SubjectGroup은 정규 시간표 혹은 시험 시간표의 일부로 설정할 수 있습니다.
Setting.group(...subjects: ...Subject): SubjectGroup
Subject에는 Subject 객체 뿐 아니라 SubjectList와 MultipleSubject도 포함합니다.

  [ 정규 시간표 설정 ]
  SubjectGroup.setToRegularSchedule(day: Day)
  > 정규 시간표에서 해당 요일(Day)의 과목을 설정할 수 있습니다.
  > 그룹화 된 순서대로 1교시, 2교시 등으로 설정됩니다.
  > Day 객체를 사용하세요. MONDAY, THEUSDAY 등등 요일 항목이 있습니다.
  > 정규 시간표에서 과목을 클릭하면 선생님 이름을 보여줍니다.

  [ 시험 시간표 설정 ]
  SubjectGrouop.setToExamSchedule(month: number. date: number)
  > 시험 시간표에서 해당 날짜(month/date)의 과목을 설정할 수 있습니다.
  > 그룹화 된 순서대로 1교시, 2교시 등으로 설정됩니다.
  > 만약 자습 과목이 있다면, 내장된 객체인 SelfStudy를 사용하세요.
  > 시험 시간표에서 과목을 클릭하면 해당 과목에 저장된 ExamAttribute를 기반으로 알림창을 생성합니다.
  > (과목).setExam 메소드를 통해 ExamAttribute를 설정하고 과목을 추가해 주세요.
*/
Setting.group(Mathmatics(1), History, Literature(3)).setToRegularSchedule(Day.MONDAY); // 수1, 한국사, 문3 과목을 월요일 시간표로 설정
Setting.group(Literature(1), Mathmatics(2), Info(1)).setToRegularSchedule(Day.THEUSDAY); // 문1, 수2, 정보1 과목을 화요일 시간표로 설정

Setting.group(History, Literature, Mathmatics(3)).setToExamSchedule(5, 1); // 한국사, 문학, 수3 과목을 5월 1일 시험 시간표로 설정
Setting.group(SelfStudy, Literature(2), Mathmatics).setToExamSchedule(5, 2); // 자습, 문2, 수학 과목을 5월 2일 시험 시간표로 설정

/*
< 페이지 로드 >
loadPage();
모든 설정을 끝내고 위 함수를 실행해 주세요. 호출하지 않을 시 페이지가 업데이트 되지 않습니다.
*/
loadPage();