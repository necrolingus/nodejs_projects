//this file is imported in index.js

const mongoose = require('mongoose')
const mongo_username = process.env.MONGO_INITDB_USERNAME
const mongo_password = process.env.MONGO_INITDB_PASSWORD
const mongo_database = process.env.MONGO_INITDB_DATABASE
const mongo_container = process.env.MONGO_CONTAINER_NAME

const connectionURL = 'mongodb://'+mongo_username+':'+mongo_password+'@'+mongo_container+':27017/'+mongo_database
mongoose.connect(connectionURL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true //indexes are created automatially
})

