import express = require('express');
import BookService from './book.service';
import { Book } from './book.model';

const router = express.Router();

router.get('/:uid', (request: any, response: any) => {
    BookService.getBooks(request.params.uid).then((books: Book[]) => {
        response.send(books);
    }, (error) => {
        response.send(error);
    });
});

router.post('/:uid', (request: any, response: any) => {
    BookService.postBook(request.params.uid).then((book: Book) => {
        response.send(book);
    }, (error) => {
        response.send(error);
    });
});

router.put('/:book', (request: any, response: any) => {
    BookService.putBook(request.params.uid, request.params.id).then((book: Book) => {
        response.send(book);
    }, (error) => {
        response.send(error);
    });
});

router.delete('/:id', (request: any, response: any) => {
    BookService.deleteBook(request.params.id).then((book: Book) => {
        response.send(book);
    }, (error) => {
        response.send(error);
    });
});

module.exports = router;
