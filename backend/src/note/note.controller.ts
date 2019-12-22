import express = require('express');
import NoteService from './note.service';
import { Note } from './note.model';

const router = express.Router();

router.get('/:uid', (request: any, response: any) => {
    NoteService.getNotes(request.params.uid).then((notes: Note[]) => {
        console.log('INFO', 'get', notes);
        response.send(notes);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.post('/:uid', (request: any, response: any) => {
    NoteService.postNote(request.params.uid).then((note: Note) => {
        console.log('INFO', 'post', note);
        response.send(note);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.put('/:note', (request: any, response: any) => {
    NoteService.putNote(request.params.note).then((note: Note) => {
        console.log('INFO', 'put', note);
        response.send(note);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.delete('/:id', (request: any, response: any) => {
    NoteService.deleteNote(request.params.id).then((note: Note) => {
        console.log('INFO', 'delete', note);
        response.send(note);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

module.exports = router;
