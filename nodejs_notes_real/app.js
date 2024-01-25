//this is the "main" file we will run from the command line
console.log("starting apps.js");


var title_opt = {
  describe: 'Add title of note',
  demand: true, //this says that title is required
  alias: 't' //e.g. t instead of --title
}

var body_opt = {
  describe: 'Add body of note',
  demand: true, //this says that title is required
  alias: 'b' //e.g. t instead of --title
}

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const argv = yargs
.command('add','Add a new note', {
  title:title_opt,
  body:body_opt
})
.command('list','List all notes')

.command('read', 'Read a note', {
  title:title_opt
})
.command('remove', 'Remove a note', {
  title:title_opt
})
.help().argv; //help allows you to call --help


//can also be written as
//const argv = yargs
//  .command()
//  .argv;

const notes = require('./notes.js');

//yargs.argv is where yargs stores its version of the argument vector

//var command = process.argv[2];
var command = argv._[0]; //same as above but using yargs
console.log('Command: ', command, 'sommer nog ene', 'en nog ene');
console.log('Yargs: ',argv) //the _ in the output means the commands we passed
//console.log('Process: ',process.argv)
//argv stands for argument vector
//remember that process is similar to javascript's document
// console.log(process.argv)

if (command === 'add'){
  var note = notes.addNote(argv.title,argv.body);
  if (note == null){ //or just say if note which means note exists
    console.log('Note not created');
  }
  else {
    console.log(`Note created: ${note.title} with body ${note.body}` )
  }
} else if (command === 'list' ){
  allNotes = notes.getAll();
  console.log(`Printing this many notes: ${allNotes.length}`)
  console.log(allNotes);

  allNotes.forEach((note) =>  console.log(`Printing note: ${note.title} -- ${note.body}`));

  // or like this
  // allNotes.forEach((note) => {
  //   console.log(`Printing note: ${note.title} -- ${note.body}`);
  // });

  // or in normal function syntax
  // allNotes.forEach(function func_name(note) {
  //   console.log(`Printing note: ${note.title} -- ${note.body}`);
  // });

}else if (command === 'read' ){
  readNote = notes.getNote(argv.title);
  console.log(`The note ${argv.title} has the body ${readNote}`);

}else if (command === 'remove' ){
  var note = notes.removeNote(argv.title);
  console.log(note);

}else {
  console.log('command not recognized');
}
