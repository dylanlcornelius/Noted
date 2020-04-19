import express = require('express');
import NoteService from './note.service';
import { Note } from './note.model';

const router = express.Router();

router.get('/:uid', (request: any, response: any) => {
    NoteService.getNotes(request.params.uid).then((notes: Note[]) => {
        console.log('INFO', 'get notes', JSON.stringify(notes));
        response.send(notes);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.post('/:uid', (request: any, response: any) => {
    NoteService.postNote(request.body.content, request.body.order, request.body.page, request.params.uid).then((note: Note) => {
        console.log('INFO', 'post note', note);
        response.send(note);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.put('/:uid', (request: any, response: any) => {
    const uid = request.params.uid
    const notes = request.body;

    const promises: Promise<any>[] = [];
    notes.forEach(note => {
        promises.push(NoteService.putNote(note, uid));
    });

    Promise.all(promises).then(() => {
        console.log('INFO', 'put notes', notes);
        response.send();
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.delete('/:id', (request: any, response: any) => {
    NoteService.deleteNote(request.params.id).then((note: Note) => {
        console.log('INFO', 'delete note', note);
        response.send(note);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

module.exports = router;
