'use strict'

let exam_list;
fetch('https://junaiskind.github.io/Time-table/exam.json')
  .then(Response => Response.text())
  .then(text => exam_list = JSON.parse(text));


function createExamTd() {
  
}

function updateExam() {
  for(let exam of exam_list) {
    console.log(exam.day)

    for(let subject of exam.subject) {
      console.log(subject)
    }
  }
}