const express = require('express')
const app = express()

app.use(express.json())
let books = []

app.get('/books', (req, res) => {

    res.status(200).json(books)
})


app.post('/books', (req, res) => {

    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImage_url = req.body.image_url

    let newBooks = {
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        image_url: newImage_url

    }
    let bookID = 0
    books.push(newBooks)
    bookID = books.length - 1

    res.status(201).json(bookID)
})
const port = 3000
app.listen(port, () => console.log(`Server started at ${port}`))