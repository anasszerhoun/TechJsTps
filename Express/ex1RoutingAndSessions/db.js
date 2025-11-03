const mongoose = require("mongoose")


async function main(){
    await mongoose.connect("mongodb://localhost:27017/books_techjs")
    console.log("Connected to db ! ")
}



module.exports = main