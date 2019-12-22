import express = require('express');
import PageService from './page.service';
import { Page } from './page.model';

const router = express.Router();

router.get('/:uid', (request: any, response: any) => {
    PageService.getPages(request.params.uid).then((pages: Page[]) => {
        console.log('INFO', 'get', pages);
        response.send(pages);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.post('/:uid', (request: any, response: any) => {
    PageService.postPage(request.body.title, request.body.type, request.params.uid).then((page: Page) => {
        console.log('INFO', 'post', page);
        response.send(page);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.put('/:page', (request: any, response: any) => {
    PageService.putPage(request.params.page).then((page: Page) => {
        console.log('INFO', 'put', page);
        response.send(page);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.delete('/:id', (request: any, response: any) => {
    PageService.deletePage(request.params.id).then((page: Page) => {
        console.log('INFO', 'delete', page);
        response.send(page);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

module.exports = router;
