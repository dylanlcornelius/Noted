const router = require('express').Router();
const multer = require('multer');
const logger = require('../util/logger');
const UserService = require('./user.service');

router.get('/:id', (req, res) => {
    logger.log('debug', 'get request', req.params.id);
    UserService.get(req.params.id).then(user => {
        logger.log('debug', 'document selected: user', user);
        res.send(user);
    }, (err) => {
        logger.log('error', 'document selected: user', err);
        res.send(err);
    });
});

router.post('/', multer().none(), (req, res) => {
    logger.log('debug', 'post request', req.body);
    UserService.insert(req.body).then(user => {
        logger.log('debug', 'document inserted: user', user);
        res.send(user);
    }, (err) => {
        logger.log('error', 'document inserted: user', err);
        res.send(err);
    });
});

router.put('/:id', multer().none(), (req, res) => {
    logger.log('debug', 'post request', {...req.body, id: req.params.id});
    UserService.update(req.params.id, req.body).then(() => {
        logger.log('debug', 'document updated: user');
        res.sendStatus(200);
    }, (err) => {
        logger.log('error', 'document updated: user', err);
        res.send(err);
    });
});

router.delete('/:id', (req, res) => {
    logger.log('debug', 'post request', req.params.id);
    UserService.delete(req.params.id).then(() => {
        logger.log('debug', 'document deleted: user');
        res.sendStatus(200);
    }, (err) => {
        logger.log('error', 'document deleted: user', err);
        res.send(err);
    });
});

module.exports = router;
