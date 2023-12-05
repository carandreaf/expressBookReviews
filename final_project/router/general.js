const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
    return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn.toString()],null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const keys = Object.keys(books);
    const data = {};
    for (let i = 0; i < keys.length; i++) {
        if (books[keys[i]]["author"] === author) {
            data[keys[i]] = books[keys[i]];
        }
    }
    return res.send(JSON.stringify(data, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const keys = Object.keys(books);
    const data = {};
    for (let i = 0; i < keys.length; i++) {
        if (books[keys[i]]["title"] === title) {
            data[keys[i]] = books[keys[i]];
        }
    }
    return res.send(JSON.stringify(data, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    return res.send(JSON.stringify(books[isbn.toString()]["reviews"],null,4));
});

// TASK 10 - Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
    });

    get_books.then(() => console.log("Promise for Task 10 resolved"));

});

// TASK 11 - Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.
public_users.get('/books/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify(books[isbn.toString()], null, 4)));
    });

    get_books.then(() => console.log("Promise for Task 11 resolved"));

});

// TASK 12 - Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.
public_users.get('/books/author/:author',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        const author = req.params.author;
        const keys = Object.keys(books);
        const data = {};
        for (let i = 0; i < keys.length; i++) {
            if (books[keys[i]]["author"] === author) {
                data[keys[i]] = books[keys[i]];
            }
        }
        resolve(res.send(JSON.stringify(data, null, 4)));
    });

    get_books.then(() => console.log("Promise for Task 12 resolved"));

});

// TASK 13 - Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
public_users.get('/books/title/:title',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        const title = req.params.title;
        const keys = Object.keys(books);
        const data = {};
        for (let i = 0; i < keys.length; i++) {
            if (books[keys[i]]["title"] === title) {
                data[keys[i]] = books[keys[i]];
            }
        }
        resolve(res.send(JSON.stringify(data, null, 4)));
    });
    get_books.then(() => console.log("Promise for Task 13 resolved"));
});

module.exports.general = public_users;
