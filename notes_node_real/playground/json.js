// var obj = {
//   name: 'Leigh'
//
// };
//
// var stringObj = JSON.stringify(obj);
// console.log(typeof obj);
// console.log(obj);
// console.log(typeof stringObj);
// console.log(stringObj);


var personString = '{"name": "leigh","age": 33}';
var person = JSON.parse(personString);
console.log(typeof person);
console.log(person);


const fs = require('fs');

var originalNote = {
  title: "Some title",
  body: "Some body"
};

var originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json',originalNoteString, function (err) {
  if (err) {
    console.log('cant write to the file');
  }
});

//Or with arrow notation it looks like this
// fs.writeFileSync('notes.json',originalNoteString, (err) => {
//   if (err) {
//     console.log('cant write to the file');
//   }
//   //OR
//   //if (err) throw err; instead of printing to console
// });

var noteString = fs.readFileSync('notes.json', function (err){

  if (err){
    console.log('cant read file');
  }
});

var note = JSON.parse(noteString);
console.log(note);
console.log(typeof note);
