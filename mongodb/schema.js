import connectMongo from './connect'

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: String,
    password: String,
    isAdmin: Boolean,
    created: {
        type: Date,
        default: Date.now()
    }
})

const itemSchema = mongoose.Schema({
    itemId: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    description: String,
    quantity: Number,
    price: Number,
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    created: {
        type: Date,
        default: Date.now()
    }
     
})

const categorySchema = mongoose.Schema({
    categoryId: String,
    name: String,
    itemCount: Number
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);





