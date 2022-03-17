import { v4 as uuid } from 'uuid';
import httpStatus from "http-status";
import { validationResult } from 'express-validator'

let books = [];

export const getAllBooks = async (req, res, next) => {
    try{
        console.log(`Books in the database: ${books}`);
        if(books != null && books.length !== 0) {
            res.status(httpStatus.OK);
            return res.json(books);
        } else {
            res.status(httpStatus.BAD_REQUEST);
            return res.json("Failed due to bad input");
        }
    }catch (e) {
        next(e);
    }
}

export const createBook = (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const book = req.body;
        books.push({...book, id: uuid()});
        console.log(`Book [${book.id}] added to the database.`);
        res.status(httpStatus.CREATED);
        return res.json("Successfully created book");
    }catch (e) {
        next(e)
    }
};

export const getBookById = (req, res, next) => {
    try{
        const bookId = req.params.id;
        const bookToFetch = books.find(book => book.id ===  bookId);
        console.log("book bookToFetch" + bookToFetch);
        if(bookToFetch === undefined){
            res.status(httpStatus.NOT_FOUND);
            return res.json("No books found with the given Id");
        }else {
            res.status(httpStatus.OK);
            return res.json(bookToFetch);
        }
    }catch (e) {
        next(e);
    }
};

export const deleteBook = (req, res, next) => {
    try{
        const bookId = req.params.id;
        const bookToFetch = books.find(book => book.id ===  bookId);
        if(bookToFetch === undefined){
            res.status(httpStatus.NOT_FOUND);
            return res.json("Unable to find the book with the given Id");
        }
        books = books.filter((book) => book.id !== bookId);
        res.status(httpStatus.OK);
        return res.json("Deleted the book successfully");

    }catch (e) {
        next(e);
    }
};

export const updateAllBookDetails =  (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Find index of specific object using findIndex method.
        const bookIndex = books.findIndex((book => book.id === req.params.id));

        if(bookIndex === -1 ) {
            res.status(httpStatus.NOT_FOUND);
            return res.json("Unable to find the book with the given Id");
        }

        // Update book value
        books[bookIndex].name = req.body.name;
        books[bookIndex].category = req.body.category;
        books[bookIndex].description = req.body.description;
        books[bookIndex].author = req.body.author;
        books[bookIndex].price = req.body.price;
        books[bookIndex].isbn = req.body.isbn;
        books[bookIndex].classification = req.body.classification;

        res.status(httpStatus.NO_CONTENT);
        return res.json("Updated Successfully");

    }catch (e) {
        next(e)
    }

};

export const updateBookDetails =  (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Find index of specific object using findIndex method.
        const bookIndex = books.findIndex((book => book.id === req.params.id));

        if(bookIndex === -1 ) {
            res.status(httpStatus.NOT_FOUND);
            return res.json("Unable to find the book with the given Id");
        }

        // Update book value
        if(req.body.category) {
            books[bookIndex].category = req.body.category;
        }
        if(req.body.price) {
            books[bookIndex].price = req.body.price;
        }
        if(req.body.classification) {
            books[bookIndex].classification = req.body.classification;
        }

        res.status(httpStatus.NO_CONTENT);
        return res.json("Updated Successfully");

    }catch (e) {
        next(e)
    }

};

