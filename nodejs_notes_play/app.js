//this is the "main" file we will run from the command line
console.log("starting apps.js");
const fs = require('fs');
const os = require('os');
const notes = require('./notes.js'); //./ is our current directory
const _ = require('lodash'); //same name as in package.json
//_ is a common name to use for lodash
//lodash is a set of handy utilities


var user = os.userInfo();
var res = notes.addNote();
//console.log(user);

//The output of user is a Jobject, so you can either say user.username
//or user["username"]. Both will work

//Will create the file if it doesn't exist
//You can use normal + to append strings, or the EC6 templating like I did below
fs.appendFile('greetings.txt',`hallo ${user.username}! You are ${notes.age}.`, function (err) {
  if (err) {
    console.log('cant write to the file');
  }
});


console.log(res);
console.log(notes.add(3,5));


console.log(_.isString(true));
console.log(_.isString('leigh'));
console.log(_.isString('123'));

//_.uniq removes duplicates
var filteredArray = _.uniq(['leigh','1','leigh',1,2,3,4,1])
console.log(_.uniq(filteredArray));
