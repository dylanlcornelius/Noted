import query from '../database/database';
import { Book } from './book.model';

export default {
    getBooks(uid: string) {
        return query('SELECT * FROM public.books WHERE "Uid" = $1;', [uid]);
    },
    postBook(uid: string) {
        return query('INSERT INTO public.books (uid) VALUES ($1);', [uid]);
    },
    putBook(uid: string, book: Book) {
        return query('UPDATE public.books SET title = $1 WHERE id = $2', [book.title, uid]);
    },
    deleteBook(id: string) {
        return query('DELETE FROM public.books WHERE id = $1', [id]);
    }
}
