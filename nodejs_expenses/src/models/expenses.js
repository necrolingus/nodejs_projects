const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({ //need to use Schema so we can use middleware
    shopName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    cashCard: {
        type: String,
        required: true,
        enum: ['Cash','Card'],
        default: 'Card'
    },
    amount: {
        type: Number,
        default: 0,
        //check 2-arrow-functions.js. This is an arrow function on a property so its called a method
        validate(value) { 
            if (value <= 0){
                throw new Error('Amount must be a positive number')
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//Mongoose takes your model name, lowercase, and pluralize it when creating the collection name
//So User will become Users in the DB
const Expense = mongoose.model('Expense', expenseSchema)
module.exports = Expense