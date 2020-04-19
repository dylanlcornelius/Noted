import { Note } from "../note/note.model";

export class Page {
    id: string | undefined;
    title: string;
    type: string; // make enum
    default: boolean;
    isOpen: boolean;
    order: number;
    notes: Note[];
    parentPage: Page;
    childPages: Page[];

    constructor(title: string, type: string, isDefault: boolean, isOpen: boolean, order: number, notes: Note[], parentPage: Page, childPages: Page[], id?: string) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.default = isDefault;
        this.isOpen = isOpen;
        this.order = order;
        this.notes = notes;
        this.parentPage = parentPage;
        this.childPages = childPages;
    }
}
