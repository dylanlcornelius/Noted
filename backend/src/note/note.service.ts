import query from '../database/database';
import { Note } from './note.model';

export default {
    getNotes(author: string) {
        return query('SELECT * FROM public.notes WHERE author = $1;', [author]);
    },
    postNote(content: string, order: number, page: string, uid: string) {
        
        return query('INSERT INTO public.notes (content, "order", completed, page, author) VALUES ($1, $2, $3, $4, $5);', [content, order, false, page, uid]);
    },
    putNote(note: Note, uid: String) {
        return query('UPDATE public.notes SET content=$1, "order"=$2, completed=$3, editor=$4 WHERE id=$5', [note.content, note.order, note.completed, uid, note.id]);
    },
    deleteNote(id: string) {
        return query('DELETE FROM public.notes WHERE id = $1', [id]);
    },
    deletePageNotes(pageId: string) {
        return query('DELETE FROM public.notes WHERE page = $1', [pageId]);
    }
}
