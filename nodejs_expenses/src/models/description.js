const mongoose = require('mongoose')

const descriptionSchema = new mongoose.Schema({ //need to use Schema so we can use middleware
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

//Mongoose takes your model name, lowercase, and pluralize it when creating the collection name
//So User will become Users in the DB
const Description = mongoose.model('Description', descriptionSchema)
module.exports = Description