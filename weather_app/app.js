const yargs = require('yargs');
const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js') //can leave the .js extention

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true //this tells yargs to always  parse the a as a string
    }

  })
  .help()
  .alias('help','h')
  .argv;


geocode.geocodeAddress(argv.a, (errorMsg, results) => {
  if (errorMsg){
    console.log(errorMsg);
  }else {
    console.log(results.Address);
    weather.getWeater(results.Latitude, results.Longitude, (errorMsg, weatherResults) => {
      if (errorMsg){
        console.log(errorMsg);
      }
      else{
        console.log(`The current temperature is: ${weatherResults.temperature}`);
        console.log(`The feels like temperature is: ${weatherResults.apparentTemperature}`);
      }
    });
  }
});


//the best way to write a callback is to write your function outside of the nested function,
//and then just copy and paste it in there. So we write the weather.getWeater function like
//the below then we just copied and pasted it into the callback above:
// weather.getWeater(results.Latitude, results.Longitude, (errorMsg, weatherResults) => {
//   if (errorMsg){
//     console.log(errorMsg);
//   }
//   else{
//     console.log(JSON.stringify(weatherResults,undefined, 4));
//   }
// });
