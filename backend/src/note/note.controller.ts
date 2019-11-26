import express = require('express');
import NoteService from './note.service';
import { Note } from './note.model';

const router = express.Router();

router.post('/:uid', (request: any, response: any) => {
    NoteService.postNote(request.params.uid).then((note: Note) => {
        response.send(note);
    }, (error) => {
        response.send(error);
    });
});

router.put('/:note', (request: any, response: any) => {
    NoteService.putNote(request.params.note).then((note: Note) => {
        response.send(note);
    }, (error) => {
        response.send(error);
    });
});

router.delete('/:id', (request: any, response: any) => {
    NoteService.deleteNote(request.params.id).then((note: Note) => {
        response.send(note);
    }, (error) => {
        response.send(error);
    });
});

module.exports = router;
