const request = require('request');
//request does not support promises. So we create a new function and wrap
//request in a promise object
var geocodeAddress = (address) =>{
  return new Promise ((resolve, reject) => {

    var theAddress = encodeURIComponent(address);

    request({
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${theAddress}`,
      json:true
    },(error, response, body) => {
      if (error){
        reject('An error occurred');
      } else if (body.status === "ZERO_RESULTS"){
        reject('Address not found');
      }else if (body.status === "OK"){
        resolve({ //undefined because errorMsg should not be populated
          Address:body.results[0].formatted_address,
          Latitude:body.results[0].geometry.location.lat,
          Longitude:body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('hennie alberts street, meyersdal').then((message)=>{
  console.log('Success :', JSON.stringify(message, undefined, 4));
},(errorMessage)=>{
  console.log(`Failure: ${errorMessage}`);
});
