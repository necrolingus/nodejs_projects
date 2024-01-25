var getUser = (id, callback) => {
    var user = {
      id: id,
      name: 'leigh'
    };

    setTimeout(() => {
      callback(user);
    },3000);


};

getUser(10, (userObject) => {
  console.log(userObject);
});
//https://maps.googleapis.com/maps/api/geocode/json
//https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia
