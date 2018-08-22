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
  //console.log('getting all notes: ');
};

var getNote = (title) => {
  console.log('getting note: ', title);
};

var removeNote = (title) => {
  console.log('removing note: ', title);
};

module.exports = {
  addNote: addNote,
  getAll: getAll,
  getNote: getNote,
  removeNote: removeNote
  //Or just addNote because the property name (left side) and our function name (right side)
  //are the same. EC6 feature
};
