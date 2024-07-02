const mongoose = require('mongoose')
require('dotenv').config()

export default async function connectMongo(){
    
    mongoose.connect(process.env.DB_LINK)
    .then(()=> console.log("Connected to DB"))
    .catch((err) => console.error('Error :', err))
    
    return mongoose 
}