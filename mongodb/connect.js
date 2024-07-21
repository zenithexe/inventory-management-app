const mongoose = require('mongoose')
require('dotenv').config()

export default async function connectMongo(){
    
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log("Connected to DB"))
    .catch((err) => console.error('Error :', err))
    
    return mongoose 
}