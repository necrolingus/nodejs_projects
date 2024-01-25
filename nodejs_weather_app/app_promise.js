const yargs = require('yargs');
const axios = require('axios');

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


var theAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${theAddress}`

//in axios promises are built in, so no need to wrap it like we did in the
//playground/promise_2.js file with request
axios.get(geocodeUrl).then((response) =>{
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find the address you supplied');
    //this error is actually picked up by the else in the catch portion of the promise
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lon = response.data.results[0].geometry.location.lng;
  console.log(`https://api.darksky.net/forecast/33135d9459e9b3c6de20bf0360322c4a/${lat},${lon}`);
  var weatherUrl = `https://api.darksky.net/forecast/33135d9459e9b3c6de20bf0360322c4a/${lat},${lon}`;
  console.log(response.data.results[0].formatted_address);

  return axios.get(weatherUrl); // chaining our calls

}).then((responseWeather) => {
  var temperature = responseWeather.data.currently.temperature;
  var apparentTemp = responseWeather.data.currently.apparentTemperature;

  console.log(`The temp is: ${temperature}`);
  console.log(`The feel is: ${apparentTemp}`)


}).catch((e)=>{
  if (e.code === 'ENOTFOUND'){
    console.log('Unable to connect to URL');
  } else {
    console.log(e.message);
  }
});
