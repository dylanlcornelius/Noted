import { connection } from '../util/connection';
import { Book } from './book.model';

export default class BookService {
    static getBooks(uid: string) {
        return new Promise((resolve, reject) => {
            // hierarchical select
            connection.query('SELECT * FROM public.pages WHERE "Uid" = ?;', [uid], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            });
        });
    }

    static postBook(uid: string) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO public.books (uid) VALUES (?);', [uid], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            });
        });
    }

    static putBook(uid: string, book: Book) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE public.books SET title = ? WHERE id = ?', [book.title, uid], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            })
        });
    }

    static deleteBook(id: string) {
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
