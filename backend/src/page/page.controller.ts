import express = require('express');
import PageService from './page.service';
import NoteService from '../note/note.service';
import { Page } from './page.model';

const router = express.Router();

router.get('/:uid', (request: any, response: any) => {
    PageService.getPages(request.params.uid).then((pages: any) => {
        pages = PageService.getChildPages(pages);

        const pageWrappers: any = [];
        pages.forEach(page => {
            pageWrappers.push(new Page(page.title, page.type, page.is_default, page.is_open, page.order, page.notes, page.parent_page, page.childPages, page.id));
        });
        console.log('INFO', 'get pages', JSON.stringify(pageWrappers));
        response.send(pageWrappers);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.post('/:uid', (request: any, response: any) => {
    PageService.postPage(request.body.title, request.body.type, request.params.uid).then((page: Page) => {
        console.log('INFO', 'post page', page);
        response.send(page);
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.put('/:pages', (request: any, response: any) => {
    const pages = request.body;

    const promises: Promise<any>[] = [];
    pages.forEach(page => {
        promises.push(PageService.putPage(request.params.uid, page));
    });

    Promise.all(promises).then(() => {
        console.log('INFO', 'put pages', pages);
        response.send();
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

router.delete('/:id', (request: any, response: any) => {
    PageService.deletePage(request.params.id).then(() => {
        console.log('INFO', 'delete page', request.params.id);

        NoteService.deletePageNotes(request.params.id).then(() => {
            response.send();
        }, (error) => {
            console.log('ERROR', error);
            response.send(error);
        });
    }, (error) => {
        console.log('ERROR', error);
        response.send(error);
    });
});

module.exports = router;
