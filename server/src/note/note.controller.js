const router = require('express').Router();
const multer = require('multer');
const logger = require('../util/logger');
const NoteService = require('./note.service');
const PageService = require('../page/page.service');

router.get('/:id', (req, res) => {
    logger.log('debug', 'get request', req.params.id);
    PageService.get(req.params.id).then(pages => {
        const pageIds = pages.reduce((acc, page) => acc.concat([page._id]), []);
        return NoteService.get(pageIds);
    }).then(notes => {
        logger.log('debug', 'document selected: notes', notes);
        res.send(notes);
    }).catch((err) => {
        logger.log('error', 'document selected: notes', err);
        res.send(err);
    });
});

router.post('/', multer().none(), (req, res) => {
    logger.log('debug', 'post request', req.body);
    NoteService.insert(req.body).then(note => {
        logger.log('debug', 'document inserted: note', note);
        res.send(note);
    }, (err) => {
        logger.log('error', 'document inserted: note', err);
        res.send(err);
    });
});

router.put('/:id', multer().none(), (req, res) => {
    logger.log('debug', 'post request', {...req.body, id: req.params.id});
    NoteService.update(req.params.id, req.body).then(() => {
        logger.log('debug', 'document updated: note');
        res.sendStatus(200);
    }, (err) => {
        logger.log('error', 'document updated: note', err);
        res.send(err);
    });
});

router.delete('/:id', (req, res) => {
    logger.log('debug', 'post request', req.params.id);
    NoteService.delete(req.params.id).then(() => {
        logger.log('debug', 'document deleted: note');
        res.sendStatus(200);
    }, (err) => {
        logger.log('error', 'document deleted: note', err);
        res.send(err);
    });
});

module.exports = router;
