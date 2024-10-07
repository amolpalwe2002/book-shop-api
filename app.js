const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Replace with your actual API endpoint
const API_ENDPOINT = 'http://example.com/api'; 

// General Users

// 1. Get the book list available in the shop
app.get('/books', async (req, res) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/booklist`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 2. Get the books based on ISBN
app.get('/books/:isbn', async (req, res) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/books/${req.params.isbn}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 3. Get all books by Author
app.get('/books/author/:name', async (req, res) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/books?author=${req.params.name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 4. Get all books based on Title
app.get('/books/title/:title', async (req, res) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/books?title=${req.params.title}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 5. Get book Review
app.get('/reviews/:bookId', async (req, res) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/reviews/${req.params.bookId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 6. Register New user
app.post('/register', async (req, res) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/register`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 7. Login as a Registered user
app.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Registered Users

// 8. Add/Modify a book review
app.post('/reviews', async (req, res) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/reviews`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 9. Delete book review added by that particular user
app.delete('/reviews/:reviewId', async (req, res) => {
    try {
        const response = await axios.delete(`${API_ENDPOINT}/reviews/${req.params.reviewId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Node.JS Program with 4 Methods

// 10. Get all books – Using async callback function
function getAllBooks(callback) {
    axios.get(`${API_ENDPOINT}/booklist`)
        .then(response => callback(null, response.data))
        .catch(error => callback(error));
}

// 11. Search by ISBN – Using Promises
function searchByISBN(isbn) {
    return axios.get(`${API_ENDPOINT}/books/${isbn}`)
        .then(response => response.data)
        .catch(error => console.error(error));
}

// 12. Search by Author
function searchByAuthor(authorName) {
    return axios.get(`${API_ENDPOINT}/books?author=${authorName}`)
        .then(response => response.data)
        .catch(error => console.error(error));
}

// 13. Search by Title
function searchByTitle(title) {
    return axios.get(`${API_ENDPOINT}/books?title=${title}`)
        .then(response => response.data)
        .catch(error => console.error(error));
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
