const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


//the views folder is where express goes to check for templates
//you also MUST have the hbs extention! Atom knows that it is hbs
//lets us set express configs like the view engine
//partials are bits and pieces of html. Here we tell hbs where the partials folder
//is located
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

//app.use calls up middleware. In this case built in middleware
//__dirname stores the path to your poject
//now we can call anything in the public folder


function serverLogger (req, callback) {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\r\n', (err) => { //err can be called anything
    if (err) {
      callback('An error occurred');
      //console.log('Unable to write to file');
    }
  });
};

//express.use is called in the order they are in the file!!!!!

//check here for all the functions available on express req and res
//https://expressjs.com/en/4x/api.html#req
app.use((req, res, next) => {
  serverLogger(req, (errorMsg) => {
    if (errorMsg){
      console.log(`Could not write to file: ${errorMsg}`);
    }
  });
  next();

});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs',{
//     maintenanceMessage: 'We are currenlty down for maintenance'
//   });
//   //without next we wont be moving on
//   //next();
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(textToScream)=>{
  return textToScream.toUpperCase();
});


app.get('/',(req, res)=>{
    res.render('home.hbs', { //this object is how you inject values
      pageTitle: 'Home page',
      //currentYear: new Date().getFullYear(),   //NBNB!!! We replaced this with a helper function up above
      welcomeMessage: 'Sup! And welcome!'
    }); //render a template/ Nice!
    //We dont give the folder, views, because express knows to check there
});



app.get('/about',(req, res)=>{
    res.render('about.hbs', { //this object is how you inject values
      pageTitle: 'About page',
      //currentYear: new Date().getFullYear()
    }); //render a template/ Nice!
    //We dont give the folder, views, because express knows to check there
});

app.get('/bad',(req, res)=>{
  res.send({
    errorMessage: 'The site is bad!'
  });
});

app.listen(3000, () =>{
  console.log('Server is up on port 3000');
});

// //express will detect JSON and send it back
// app.get('/', (req, res) => { //these 2 arguments must be here
//   //res.send('<h1>hallo Express!</h1>');
//   res.send({
//     name: 'Leigh',
//     like: ['cookies','vape']
//   });
// }); //app.get is a handler for http get request
