const router = require('express').Router();
const multer = require('multer');
const logger = require('../util/logger');
const PageService = require('./page.service');
const NoteService = require('../note/note.service');

router.get('/:id', (req, res) => {
    logger.log('debug', 'get request', req.params.id);
    PageService.get(req.params.id).then(pages => {
        logger.log('debug', 'document selected: pages', pages);
        res.send(pages);
    }, (err) => {
        logger.log('error', 'document selected: pages', err);
        res.send(err);
    });
});

router.post('/', multer().none(), (req, res) => {
    logger.log('debug', 'post request', req.body);
    PageService.insert(req.body).then(page => {
        logger.log('debug', 'document inserted: page', page);
        res.send(page);
    }, (err) => {
        logger.log('error', 'document inserted: page', err);
        res.send(err);
    });
});

router.put('/:id', multer().none(), (req, res) => {
    logger.log('debug', 'post request', {...req.body, id: req.params.id});
    PageService.update(req.params.id, req.body).then(() => {
        logger.log('debug', 'document updated: page');
        res.sendStatus(200);
    }, (err) => {
        logger.log('error', 'document updated: page', err);
        res.send(err);
    });
});

router.delete('/:id', (req, res) => {
    logger.log('debug', 'post request', req.params.id);
    PageService.delete(req.params.id).then(() => {
        logger.log('debug', 'document deleted: page');
        return NoteService.deletePage(req.params.id);
    })
    .then(() => {
        logger.log('debug', 'documents deleted: note');
        res.sendStatus(200);
    })
    .catch((err) => {
        logger.log('error', 'document deleted: page', err);
        res.send(err);
    });
});

module.exports = router;
