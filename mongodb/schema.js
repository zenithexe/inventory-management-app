const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    hpassword: String,
    isAdmin: Boolean
})

const itemSchema = mongoose.Schema({
    itemId: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    description: String,
    quantity: Number,
    price: Number,
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itemType'
    }]
     
})

const itemTypeSchema = mongoose.Schema({
    name: String,
    itemCount: Number
})


export const User = mongoose.model('User', userSchema);
export const Item = mongoose.model('Item', itemSchema);
export const ItemType = mongoose.model('ItemType', itemTypeSchema);





