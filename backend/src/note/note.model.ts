export class Note {
    id: string | undefined;
    content: string;
    order: number;
    completed: boolean;
    page: string;

    constructor(content: string, order: number, completed: boolean, page: string, id?: string) {
        this.id = id;
        this.content = content;
        this.order = order;
        this.completed = completed;
        this.page = page;
    }
}
