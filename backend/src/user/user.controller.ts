import express = require('express');
import UserService from './user.service';
import { User } from './user.model';

const router = express.Router();

router.get('/:id', (request: any, response: any) => {
    UserService.getUser(request.params.id).then((user: User) => {
        response.send(user);
    }, (error) => {
        response.send(error);
    });
});
router.post('/', (request: any, response: any) => {
    UserService.postUser(request.params.email).then((user: User) => {
        response.send(user);
    }, (error) => {
        response.send(error);
    });
});
router.put('/:id', (request: any, response: any) => {
    UserService.putUser(request.params.uid).then((user: User) => {
        response.send(user);
    }, (error) => {
        response.send(error);
    });
});

module.exports = router;
