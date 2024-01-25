//log is always synchronous
console.log('starting app');


//this is an asynchronous callback
setTimeout(() => { //this will be printed 2 seconds after 'finishing up' prints
    console.log('inside the callback');
},2000);


//even though this has 0 milisecond delay, it still only runs after the
// 'finishing up' is printed
setTimeout(() => {
    console.log('inside the second callback');
},0);

console.log('finishing up');
