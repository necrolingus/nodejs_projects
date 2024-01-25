//arrow functions do not bind a THIS keyword
//So you cant use THIS inside your function
//The THIS binding refers to the parent binding e.g. a parent function

//arrow functions also do not bind to the arguments array. See further down for
//arguments and how to access them

//statement syntax arrow function has many things in the curly braces
var square = (x) => {
  var result = x * x;
  return result;
};

//expression syntax arrow function does one thing and you dont need curly braces
//no return is needed. An arrow function without curlys means it will implicitly return
var square2 = (x) => x *x;

//if you only have one argurment, you dont even need the parenthesis around your parameters
var square3 = x => x *x;

console.log(square(9));
console.log(square2(10));
console.log(square3(11));


//nuances between regular EC5 and arrow (EC6) functions
//sayHi and sayHiAlt are functions on object literals

var user = {
  name: 'leigh',
  sayHi: () => {
    console.log(`Hi. I am ${this.name}`); //this will print undefined because this doesnt work in arrow functions
  },                                      //user.name will work though
  sayHiAlt () { //alo an EC6 function
    console.log(arguments); //arguments array
    console.log(`Hi. I am ${this.name}`);
  },

};

user.sayHi();
user.sayHiAlt('a',2,3); //now we pass data into the arguments array
