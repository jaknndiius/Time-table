'use strict'
class Subject {
  constructor(name, teacher) {
    this.name = name;
    this.teacher = teacher;
  }
  toString() {
    return this.name;
  }
}
class MultipleSubject extends Subject {
  constructor(name, teacher, suffix) {
    super(name, teacher);
    this.suffix = suffix;
  }
  toString() { return this.name[0] + this.suffix; }
}
class ExplorSubject extends MultipleSubject {
  toString() { return this.name + this.suffix; }
}
// 문학
const Lit1 = new MultipleSubject('문학', '윤동희', '1');
const Lit2 = new MultipleSubject('문학', '신치훈', '2');
const Lit3 = new MultipleSubject('문학', '김병호', '3');
// 인상
const Human = new Subject('인상', '윤동희');
// 영어
const Eng1 = new MultipleSubject('영어', '장인석', '1');
const Eng2 = new MultipleSubject('영어', '이성훈', '2');
const Eng3 = new MultipleSubject('영어', '장인석', '3');
// 수학
const Math1 = new MultipleSubject('수학', '노현태', '1');
const Math2 = new MultipleSubject('수학', '박진우', '2');
const Math3 = new MultipleSubject('수학', '박진우', '3');
//탐구
const Explor1 = new ExplorSubject('물리', '황준식', 'A');
const Explor2 = new ExplorSubject('지학', '이은진', 'B');
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
// Chinese = new Subject('중국어', '배슬기');
// 창체
const Creaty = new Subject('창체', '장인석');

//모의고사
const mock_tests = [
  new Date('2023-3-23'),
  new Date('2023-6-1'),
  new Date('2023-9-6'),
  new Date('2023-11-21')
];