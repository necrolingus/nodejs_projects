//const geocode = require('./utils/geocode.js')
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const session = require('express-session');
const Expense = require('./models/expenses.js')
const Description = require('./models/description.js')
const Shop = require('./models/shop.js')
require('./db/mongoose.js')

const app = express()
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname, '../templates/views')

hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath)) //Here we set up a static directory to serve
app.set('view engine','hbs')
app.set('views', viewsPath)

//When posting forms, it uses urlEncoded by default, so you need to specify this!
app.use(express.urlencoded({ extended: false }));

//initialize sessions
app.use(session({secret: 'myappsecret123',saveUninitialized: true,resave: true}));
var sess; // global session, NOT recommended. But it is OK as it is a single user app


//express checks these routes sequentially for a match, so 404 and all that must be at the bottom
app.get('', async (req, res) => {

    if (req.query.token === process.env.TOKEN_VALUE) {
        
        //set a session variable
        sess = req.session
        sess.token = '1'
        
        const allDescriptions =  await Description.find()
        const allDescriptionsArray = []
        allDescriptions.forEach((x)=>{
            allDescriptionsArray.push(x.description)
        })


        const allShops =  await Shop.find()
        const allShopsArray = []
        allShops.forEach((x)=>{
            allShopsArray.push(x.shopName)
        })

        
        //console.log(allDescriptions)
        res.render('index',{ //the view will be able to access the values in this object
            
            allDescriptionsArray: allDescriptionsArray,
            allShopsArray: allShopsArray,
            title: "My expense page",
            name: "Leigh"
        })
    }
    else{
        sess = req.session
        delete sess["token"]
        res.status(403).send('Nope')
    }
})

app.get('/about', async (req, res) => {
    res.status(200).send('Just an about')
})


app.post('/submitExpense', async (req, res) => {
    try {
        //check if sess.token exists
        sess = req.session;

        if(sess.token) {
            const expense = new Expense(req.body)
            await expense.save()
            res.send('Record saved')
        }
        else{
            res.status(403).send('Nope')
        }
    } catch (e) {
        console.log('Error saving')
    }
})


app.post('/submitDescription', async (req, res) => {
    try {
        //check if sess.token exists
        sess = req.session;

        if(sess.token) {
            const description = new Description({description: req.body.newDescription})
            await description.save()

            backURL=req.header('Referer') || '/';
            res.redirect(backURL);
        }
        else {
            res.status(403).send('Nope')
        }

    } catch (e) {
        console.log('Error saving the description')
    }
})



app.delete('/submitDescription/:description', async (req, res) => {
    try {
        //check if sess.token exists
        sess = req.session;

        if(sess.token) {
            const description = await Description.findOneAndDelete({'description': req.params.description})

            if (!description){
                return res.status(404).send({error: 'Description not found'})
            }
            res.send({response: 'Description Deleted'})
        }
        else {
            res.status(403).send('Nope')
        }

    } catch (e) {
        console.log('Error while deleting the description')
        res.send({error: 'Error while deleting the description'})
    }
})




app.post('/submitShop', async (req, res) => {

    try {
        //check if sess.token exists
        sess = req.session;

        if(sess.token) {
            const shop = new Shop({shopName: req.body.newShop})
            await shop.save()

            backURL=req.header('Referer') || '/';
            res.redirect(backURL);
            //res.send('Shop saved')
        }
        else {
            res.status(403).send('Nope')
        }

    } catch (e) {
        console.log('Error saving the Shop')
    }

})


app.delete('/submitShop/:shop', async (req, res) => {
    try {

        //check if sess.token exists
        sess = req.session;

        if(sess.token) {
            const shop = await Shop.findOneAndDelete({'shopName': req.params.shop})

            if (!shop){
                return res.status(404).send({error: 'Shop not found'})
            }
            res.send({response: 'Shop Deleted'})
        }
        else {
            res.status(403).send('Nope')
        }
    
    } catch (e) {
        console.log('Error while deleting the shop')
        res.send({error: 'Error while deleting the shop'})
    }
})


app.listen(3001, '0.0.0.0', () => {
    console.log('The server is listening')
})






//Because geocode returns a promise, we need to call .then on it
//geocode.forecastExport.then((data) => {
//    console.log(data)
//}).catch((e) => {
//    console.log("Error calling geocode promise in index.js: " + e)
//})
