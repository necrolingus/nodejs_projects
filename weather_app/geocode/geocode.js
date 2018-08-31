const request = require('request');



var geocodeAddress = (stringAddress, callback) => {

  var theAddress = encodeURIComponent(stringAddress);

  request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${theAddress}`,
    json:true
  },(error, response, body) => {
    if (error){
      callback('An error occurred');
    } else if (body.status === "ZERO_RESULTS"){
      callback('Address not found');
    }else if (body.status === "OK"){
      callback(undefined, { //undefined because errorMsg should not be populated
        Address:body.results[0].formatted_address,
        Latitude:body.results[0].geometry.location.lat,
        Longitude:body.results[0].geometry.location.lng
      })
    }
  });
};

module.exports = {
  geocodeAddress: geocodeAddress
};
