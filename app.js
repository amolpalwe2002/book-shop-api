const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Dummy data
let books = [
    { id: 1, title: "Book One", author: "Author A", isbn: "1234567890", reviews: [] },
    { id: 2, title: "Book Two", author: "Author B", isbn: "0987654321", reviews: [] },
    { id: 3, title: "Book Three", author: "Author A", isbn: "1122334455", reviews: [] },
];

let users = []; // Dummy user data
let reviews = []; // Dummy review data

// General Users

// 1. Get the book list available in the shop
app.get('/books', (req, res) => {
    res.json(books);
});

// 10. Get all books using an async callback function
app.get('/books/async', async (req, res) => {
    try {
        const allBooks = await new Promise((resolve) => {
            resolve(books); // Simulating async operation
        });
        res.json(allBooks);
    } catch (error) {
        res.status(500).send('Error retrieving books');
    }
});

// 11. Search by ISBN using Promises
app.get('/books/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const bookPromise = new Promise((resolve, reject) => {
        const book = books.find(b => b.isbn === isbn);
        if (book) {
            resolve(book);
        } else {
            reject('Book not found');
        }
    });

    bookPromise
        .then(book => res.json(book))
        .catch(err => res.status(404).send(err));
});

// 12. Search by Author
app.get('/books/author/:name', (req, res) => {
    const authorName = req.params.name;
    const authorPromise = new Promise((resolve) => {
        const authorBooks = books.filter(b => b.author.toLowerCase() === authorName.toLowerCase());
        resolve(authorBooks);
    });

    authorPromise
        .then(authorBooks => res.json(authorBooks))
        .catch(err => res.status(404).send('No books found for this author'));
});

// 13. Search by Title
app.get('/books/title/:title', (req, res) => {
    const title = req.params.title;
    const titlePromise = new Promise((resolve) => {
        const titleBooks = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
        resolve(titleBooks);
    });

    titlePromise
        .then(titleBooks => res.json(titleBooks))
        .catch(err => res.status(404).send('No books found with this title'));
});

// Other existing endpoints...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
