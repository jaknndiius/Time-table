'use strict'

let exam_list;
fetch('https://junaiskind.github.io/Time-table/exam.json')
  .then(Response => Response.text())
  .then(text => exam_list = JSON.parse(text))
  .then(t => updateExam());



function updateExamDay(day_list) {
  const exam_day_head = document.getElementById("exam_day_head");

  day_list.forEach((value) => {
    const th = document.createElement("th");
    th.innerHTML = `${value[0]}/${value[1]} ${week_name[value[2]]}`;
    exam_day_head.appendChild(th);
  })

}

function createExamTr(index, subject_list) {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.innerHTML = index + "교시";
  tr.appendChild(th)

  

  subject_list.forEach((value) => {
    const td = document.createElement("td");
    td.innerHTML = value[1].name;
    td.id = `subject-${value[0]}-${index-1}`;
    td.onclick = clickSubject;

    tr.appendChild(td)
  })

  return tr;
}

function updateExam() {

  updateExamDay(
    exam_list.map((value) => value.day)
  )
  
  document.getElementById("exam_time_table_tbody").appendChild(
    createExamTr(
      1,
      exam_list.map((value, index) => [index, value.subject[0]])
    )
  )

  document.getElementById("exam_time_table_tbody").appendChild(
    createExamTr(
      2,
      exam_list.map((value, index) => [index, value.subject[1]])
    )
  )
}

const popup = document.getElementById("popup");
const close = document.getElementById("close");

const keyf = [
  { transform: 'scale(1)' },
  { transform: 'scale(1.3)', offset: 0.3},
  { transform: 'scale(0)' }
];

close.addEventListener("click", () => {
  popup.animate(keyf, {
    duration: 400,
    fill: "both"
  });
})

function clickSubject(event) {
  const target = event.target;
  const id = target.id.split("-");
  const subject = exam_list[id[1]].subject[id[2]];

  console.log(subject)

  popup.animate(keyf, {
    duration: 400,
    fill: "both",
    direction: "reverse"
  });

}