export class Note {
    id: string | undefined;
    content: string;
    order: number;
    completed: boolean;

    constructor(content: string, order: number, completed: boolean, id?: string) {
        this.id = id;
        this.content = content;
        this.order = order;
        this.completed = completed;
    }
}
