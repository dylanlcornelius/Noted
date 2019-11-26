import { Note } from "../note/note.model";

export class Page {
    id: string | undefined;
    title: string;
    type: string; // make enum
    isDefault: boolean;
    notes: Note[]; // make list of notes
    pages: Page[];

    constructor(title: string, type: string, isDefault: boolean, notes: Note[], pages: Page[], id?: string) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.isDefault = isDefault;
        this.notes = notes;
        this.pages = pages;
    }
}
