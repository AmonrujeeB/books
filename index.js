const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const app = express()

app.use(express.json())
let books = []

const url = 'mongodb+srv://superadmin:31122541ying@cluster0.g0htt.mongodb.net/books?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db, moviesCollection

async function connect() {
    await client.connect()
    db = client.db('books')
    booksCollection = db.collection('books')
}
connect()
    // ------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/books', async(req, res) => {
    const cursor = await booksCollection.find({})
    const result = await cursor.toArray()
    res.status(200).json(books)
})

app.get('/books/:id', async(req, res) => {
    //input
    let id = req.params.id
        // let movie = {}

    //process
    const book = await booksCollection.findOne({ _id: ObjectId(id) })

    //output
    res.status(200).json(book)
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

const result = await booksCollection.insertOne(newBooks)
    // movies.push(newMovie)
    //n-1
    // movieID = movies.length -1
bookID = result.insertedId

//output 
res.status(201).json(bookID)
const port = 3000
app.listen(port, () => console.log(`Server started at ${port}`))