import express = require('express');
import UserController from './user.controller';

const router = express.Router();

router.get('/:id', UserController.getUser);
router.post('/', UserController.postUser);
router.put('/:id', UserController.putUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
