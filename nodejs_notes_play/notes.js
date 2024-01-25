console.log('starting notes.js');

module.exports.age = 25;

//we will use arrow functions. It was introduces in EC6
//check out https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/
//for the different ways to use them


module.exports.addNote = () => {
  console.log('add note');
  return 'new note';
};

module.exports.add = (x,y) => x+y;
//OR
// module.exports.add = (x,y) => {
//   return x+y;
// };
//check down below for more details




//the above function as a normal function
// module.exports.addNote = function(){
//   console.log('add note');
//   return 'new note';
// }

//OR

//no curlies and no return statement
//module.exports.multiply = (x,y) => x*y

//this would normally be
//module.exports.multiply = function(x,y){
//  return x * y;
//};
