console.log('starting notes.js');

const fs = require('fs');
// module.exports.addNote = () => {
//   console.log('add note');
//   return 'new note';
// };


var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json', (err) => {
      if (err) {
        console.log('file in try doesnt exist');
      }
    });
    return JSON.parse(notesString); //we read in existing notes so we dont overwrite

  } catch (e) {
    //console.log('file didnt exist');
    return [];
  }
};


var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
};




var addNote = (title, body) => {
  //console.log('adding note: ', title, body);
  var notes = fetchNotes();
  var note = {
    title: title, //or just title because both are the same
    body: body
  };

  var duplicateNotes = notes.filter((note) => {
    //note is a var that gets called for every item in the array
    return  note.title === title;
  });
  //OR like the below because we use arrow functions and only one statement in our function
  //var duplicateNotes = notes.filter((note) => note.title === title); //EC6
  if (duplicateNotes.length === 0){
    notes.push(note);
    console.log(notes);
    saveNotes(notes);
    return note;
  }
};




var getAll = () => {
  var notes = fetchNotes();
  return notes;
};




var getNote = (title) => {
  var notes = fetchNotes();
  var theNote = notes.filter((note) => note.title === title);

  if (theNote[0]){
    return theNote[0]["body"]; //or theNote.title
  }
  else{
    return "NOTE NOT FOUND! ";
  }

};




var removeNote = (title) => {
  var notes = fetchNotes();

  //This is what the filter function looks like in normal module
  // var numbers = [1, 3, 6, 8, 11];
  // var lucky = numbers.filter(function(number) {
  //   return number > 7;
  // });
  // console.log(lucky);

  //or we can give the function a name if we want to:
  // var numbers = [1, 3, 6, 8, 11];
  // var lucky = numbers.filter(function func_name(number) {
  //   return number > 7;
  // });
  // console.log(lucky);


  var savedNotes = notes.filter((note) => {
    //note is a var that gets called for every item in the array
    return  note.title !== title;
  });
  //Could've also said var savedNotes = notes.filter((notes) => note.title !== title);

  saveNotes(savedNotes);

  if (notes.length == savedNotes.length){
    return "Nothing to remove";
  }
  else{
    return `${title}  was removed`;
  }
  //or we could've said return notes.length !== savedNotes.length;
  //this will return true of false
};



module.exports = {
  addNote: addNote,
  getAll: getAll,
  getNote: getNote,
  removeNote: removeNote
  //Or just addNote because the property name (left side) and our function name (right side)
  //are the same. EC6 feature
};
