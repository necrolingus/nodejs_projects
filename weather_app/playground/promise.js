//a promise is a constructor, it takes one argument which is a function
//we create an anonymous function here that MUST take resolve and reject as fumctions
//The constructor method is a special method for
//creating and initializing an object created within a class.
//The constructor is primarily used to wrap functions that do not already support promises
//resolve is good, the state is fulfilled


//if something does not support promises, like the request library, you can wrap
//your request call inside a promise
var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      if (typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      } else{
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};


//the error handling in this block of code is bad.
//The second THEN will fire, even if the first promise failed
asyncAdd(23,'3').then((message)=>{
  console.log(`Result: ${message}`);
  return asyncAdd(message, 33); //we chain promises. This one's then is called way at the end
}, (errorMsg)=>{
  console.log(`Error: ${errorMsg}`);
}).then((res)=>{ //this then belongs to line 27
  console.log(`Result2: ${res}`);
}, (errorMsg)=>{
  console.log(`Error2: ${errorMsg}`);
});

//same as the above, but with better error handling
asyncAdd(23,'3').then((message)=>{
  console.log(`Result4: ${message}`);
  return asyncAdd(message, 33); //we chain promises. This one's then is called way at the end
}).then((res)=>{ //this then belongs to line 27
  console.log(`Result5: ${res}`);
}).catch((errorMessage)=>{
  console.log(`Error3: ${errorMessage}`);
});



//EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2
//EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2 EXAMPLE 2
var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('hey it worked!'); //what the caller will get back. Always takes just one argument
    reject('Unable to fulfill promise'); //must pass one argument
  },2000);



});
//then is a promise method
//then lets us provide callback functions for success and error cases
//then takes 2 arguments as functions. The first one is for resolve, then second one
//is for reject
somePromise.then((message)=> {
  console.log(`Success: ${message}`);
}, (errorMsg) => {
  console.log(`Error: ${errorMsg}`);
});





//example of a constructor
// class Polygon {
//   constructor() {
//     this.name = "Polygon";
//   }
// }
//
// var poly1 = new Polygon();
//
// console.log(poly1.name);
// expected output: "Polygon"
