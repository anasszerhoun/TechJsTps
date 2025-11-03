const express = require('express')
const router = express.Router()

var books = [
    {
        id:1,
        nom:"Book 1"
    },{
        id:2,
        nom:"Book 2"
    }
]

router.get("/getBooks",(req,res)=>{
    return res.json(books);
})

router.post("/addBook",(req,res)=>{
    const book = req.body
    books.push(book)
})

module.exports = router