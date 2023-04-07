'use strict'
Lit.setExam(
  new ExamAttribute(22, 2)
  .addRange('교과서: 처음~p113')
);
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
Eng.setExam(
  new ExamAttribute(24,4)
  .addRange('교과서: lesson 1, 2, 3')
  .addRange('부교재: p8~45, p150~155')
  .addRange('3월 학평: 18~45번')
);
ExplorA.setExam(
  new ExamAttribute(20, 4)
  .addRange('교과서: p10~93')
  .addRange('완자: p10~145')
);
ExplorB.setExam(
  new ExamAttribute(20, 4)
  .addRange('교과서: p10~77')
  .addRange('완자: p10~98')
);
History.setExam(
  new ExamAttribute(20,3)
  .addRange('교과서: p162~227(p202~203 제외)')
  .addRange('학습지: Ⅲ p1~11')
);
class Exams {
  constructor(month, date) {
    this.day = new Date(`2023-${month}-${date}`);
  }
  setSubjects(...subjects) {
    this.subjects = subjects;
    return this;
  }
}
const ExamList = [
  new Exams(4, 6).setSubjects(Lit),
  new Exams(4, 7).setSubjects(Mathmatics(1), Mathmatics(2)),
  new Exams(4, 8).setSubjects(ExplorA, ExplorB),
  new Exams(4, 9).setSubjects(History),
]