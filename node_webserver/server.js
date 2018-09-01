const express = require('express');
const hbs = require('hbs');
var app = express();


//the views folder is where express goes to check for templates
//you also MUST have the hbs extention! Atom knows that it is hbs
//lets us set express configs like the view engine
//partials are bits and pieces of html. Here we tell hbs where the partials folder
//is located
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
//app.use calls up middleware. In this case built in middleware
//__dirname stores the path to your poject
//now we can call anything in the public folder

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
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
