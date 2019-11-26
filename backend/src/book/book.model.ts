import { Page } from '../page/page.model';

export class Book {
    id: string | undefined;
    title: string;
    pages: Page[];

    constructor(title: string, pages: Page[], id?: string) {
        this.id = id;
        this.title = title;
        this.pages = pages;
    }
}
