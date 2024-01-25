const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({ //need to use Schema so we can use middleware
    shopName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

//Mongoose takes your model name, lowercase, and pluralize it when creating the collection name
//So User will become Users in the DB
const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop