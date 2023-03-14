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
Lit1 = new MultipleSubject('문학', '윤동희', '1');
Lit2 = new MultipleSubject('문학', '신치훈', '2');
Lit3 = new MultipleSubject('문학', '김병호', '3');
// 인상
Human = new Subject('인상', '윤동희');
// 영어
Eng1 = new MultipleSubject('영어', '장인석', '1');
Eng2 = new MultipleSubject('영어', '이성훈', '2');
Eng3 = new MultipleSubject('영어', '장인석', '3');
// 수학
Math1 = new MultipleSubject('수학', '노현태', '1');
Math2 = new MultipleSubject('수학', '박진우', '2');
Math3 = new MultipleSubject('수학', '박진우', '3');
//탐구
Explor1 = new ExplorSubject('물리', '황준식', 'A');
Explor2 = new ExplorSubject('지학', '이은진', 'B');
// 음악
Music = new Subject('음악', '지세현');
// 체육
PE = new Subject('체육', '박영덕');
// 국사
History = new Subject('국사', '김진영');
// 미술
Art = new Subject('미술', '권유정');
// 외국어
Foregin = new Subject('일본어', '김희인');
// Chinese = new Subject('중국어', '배슬기');
// 창체
Creaty = new Subject('창체', '장인석');