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

// 2. Get the books based on ISBN
app.get('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// 3. Get all books by Author
app.get('/books/author/:name', (req, res) => {
    const authorBooks = books.filter(b => b.author.toLowerCase() === req.params.name.toLowerCase());
    res.json(authorBooks);
});

// 4. Get all books based on Title
app.get('/books/title/:title', (req, res) => {
    const titleBooks = books.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
    res.json(titleBooks);
});

// 5. Get book Review
app.get('/reviews/:bookId', (req, res) => {
    const book = books.find(b => b.id == req.params.bookId);
    if (book) {
        res.json(book.reviews);
    } else {
        res.status(404).send('Book not found');
    }
});

// 6. Register New user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 7. Login as a Registered user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Registered Users

// 8. Add/Modify a book review
app.post('/reviews', (req, res) => {
    const { bookId, reviewText } = req.body;
    const book = books.find(b => b.id == bookId);
    if (book) {
        const newReview = { id: reviews.length + 1, text: reviewText };
        book.reviews.push(newReview);
        reviews.push(newReview);
        res.status(201).json(newReview);
    } else {
        res.status(404).send('Book not found');
    }
});

// 9. Delete book review added by that particular user
app.delete('/reviews/:reviewId', (req, res) => {
    const reviewId = parseInt(req.params.reviewId);
    let bookFound = false;

    books.forEach(book => {
        const reviewIndex = book.reviews.findIndex(r => r.id === reviewId);
        if (reviewIndex !== -1) {
            book.reviews.splice(reviewIndex, 1);
            bookFound = true;
        }
    });

    if (bookFound) {
        res.json({ message: 'Review deleted' });
    } else {
        res.status(404).send('Review not found');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
