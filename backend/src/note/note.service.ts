import { connection } from '../util/connection';
import { Note } from './note.model';

export default class PageService {
    static postNote(uid: string) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO public.books (uid) VALUES (?);', [uid], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            });
        });
    }

    static putNote(note: Note) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE public.books SET title = ? WHERE id = ?', [note.content, note.id], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            })
        });
    }

    static deleteNote(id: string) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM public.books WHERE id = ?', [id], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            })
        });
    }
}
