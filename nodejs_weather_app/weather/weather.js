const request = require('request');


var getWeather = (lat, lon, callback) => {
  console.log(`https://api.darksky.net/forecast/33135d9459e9b3c6de20bf0360322c4a/${lat},${lon}`);
  request({
    url:`https://api.darksky.net/forecast/33135d9459e9b3c6de20bf0360322c4a/${lat},${lon}`,
    json:true
  },(error, response, body) => {
    if (!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })

    } else{
      callback(`An error occurred ${response.statusCode}`);
    }
  });

};

module.exports.getWeater = getWeather;
//Or like this:
// module.exports = {
//   geocodeAddress: geocodeAddress
// };
