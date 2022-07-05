let exam_list;
fetch('https://junaiskind.github.io/finder/songs.json')
  .then(Response => Response.text())
  .then(text => exam_list = JSON.parse(text));
