'use strict'
import {
  Subject, SubjectList, SuffixType, Setting, Day, loadPage, SelfStudy
} from 'https://jaknndiius.github.io/TimeTableAPI/timeTableAPI.js';
// 문학
const Lit = new SubjectList('문학', ['박수진', '송선용'], { suffixType: SuffixType.ALPABET});
// 수학
const Mathmatics = new SubjectList('수학', ['최재곤', '나영진'], { suffixType: SuffixType.ROMAN });
// 영어
const Eng = new Subject('영어', '김영준');
const Info = new SubjectList('정보', ['박호규', '백장미'], { suffixType: SuffixType.ALPABET, fullName: true });
const Creaer = new Subject('창진', '한재봉');
// 체육
const PE = new Subject('운동', '박건후');
//탐구
const Social = new Subject('사문', '장찬구');
const Ethics = new Subject('생윤', '임현옥');
const Geography = new Subject('한지', '박태윤');
// 음악
const Music = new Subject('음악', '박진아');
// 외국어
const Foregin = new Subject('일본어', '유혜인');
// 창체
const Creaty = new Subject('창체', '김영준');
//모의고사
Setting.addMockTest('2023/03/23');
Setting.addMockTest('2023/06/01');
Setting.addMockTest('2023/09/06');
Setting.addMockTest('2023/11/21');
//시간표 시간
Setting.setClassTime(ClassName.CLASS1, 8, 0)
Setting.setClassTime(ClassName.CLASS2, 9, 20)
Setting.setClassTime(ClassName.CLASS3, 10, 20)
Setting.setClassTime(ClassName.CLASS4, 11, 20)
Setting.setClassTime(ClassName.LUNCH, 12, 20)
Setting.setClassTime(ClassName.CLASS5, 14, 0)
Setting.setClassTime(ClassName.CLASS6, 15, 0)
Setting.setClassTime(ClassName.CLASS7, 16, 0)
//시간표
Setting.group(Creaer, Lit(1), Ethics, Mathmatics(1), Foregin, PE, Creaty)
  .setToRegularSchedule(Day.MONDAY);
Setting.group(Mathmatics(2), Social, Foregin, Geography, Ethics, Eng, Lit(1))
  .setToRegularSchedule(Day.THEUSDAY);
Setting.group(Mathmatics(1), Eng, Mathmatics(2), Info(1), Music, Creaty, Creaty)
  .setToRegularSchedule(Day.WEDNESDAY);
Setting.group(Eng, Ethics, Social, Lit(2), Mathmatics(1), Mathmatics(2), Geography)
  .setToRegularSchedule(Day.THURSDAY);
Setting.group(PE, Geography, Eng, Mathmatics(2), Lit(2), Info(2), Social)
  .setToRegularSchedule(Day.FIRDAY);

Setting.group(SelfStudy, Mathmatics(1), Social)
  .setToExamSchedule(4, 27);
Setting.group(Info, Eng, Ethics)
  .setToExamSchedule(4, 28);
Setting.group(Foregin, Mathmatics(2), Geography)
  .setToExamSchedule(5, 1);
Setting.group(SelfStudy, Lit)
  .setToExamSchedule(5, 2);

loadPage();
