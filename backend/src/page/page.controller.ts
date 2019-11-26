import express = require('express');
import PageService from './page.service';
import { Page } from './page.model';

const router = express.Router();

router.post('/:uid', (request: any, response: any) => {
    PageService.postPage(request.params.uid).then((page: Page) => {
        response.send(page);
    }, (error) => {
        response.send(error);
    });
});

router.put('/:page', (request: any, response: any) => {
    PageService.putPage(request.params.page).then((page: Page) => {
        response.send(page);
    }, (error) => {
        response.send(error);
    });
});

router.delete('/:id', (request: any, response: any) => {
    PageService.deletePage(request.params.id).then((page: Page) => {
        response.send(page);
    }, (error) => {
        response.send(error);
    });
});

module.exports = router;
