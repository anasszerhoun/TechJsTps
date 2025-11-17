const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true },
    status: { type: String, required: true },
    price: { type: Number, required: true },
    pagesRead: { type: Number, required: true },
    format: { type: String, required: true },
    suggestedBy: { type: String, required: false },
    finished: { type: Boolean, required: true }
}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

async function main(){
    try {
        await mongoose.connect("mongodb://localhost:27017/books_techjs")
        console.log("Connected to db ! ")
    } catch (error) {
        console.error("Error connecting to database:", error)
    }
}

main() 

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({ error: "Book not found" })
        }
        res.json(book)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post("/books/add", async (req, res) => {
    try {
        console.log(req.body)
        const book = new Book(req.body)
        console.log(book)
        const savedBook = await book.save()
        res.status(201).json(savedBook)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.put("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!book) {
            return res.status(404).json({ error: "Book not found" })
        }
        res.json(book)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            return res.status(404).json({ error: "Book not found" })
        }
        res.json({ message: "Book deleted successfully", book })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(8080, () => {
    console.log("Server running on localhost:8080")
})