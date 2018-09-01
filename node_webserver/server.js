const express = require('express');
const hbs = require('hbs');
var app = express();


//the views folder is where express goes to check for templates
//you also MUST have the hbs extention! Atom knows that it is hbs
//lets us set express configs like the view engine
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
//app.use calls up middleware. In this case built in middleware
//__dirname stores the path to your poject
//now we can call anything in the public folder




//express will detect JSON and send it back
app.get('/', (req, res) => { //these 2 arguments must be here
  //res.send('<h1>hallo Express!</h1>');
  res.send({
    name: 'Leigh',
    like: ['cookies','vape']
  });
}); //app.get is a handler for http get request

app.get('/about',(req, res)=>{
    res.render('about.hbs') //render a template/ Nice!
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
