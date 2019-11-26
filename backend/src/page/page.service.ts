import { connection } from '../util/connection';
import { Page } from './page.model';

export default class PageService {
    static postPage(uid: string) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO public.books (uid) VALUES (?);', [uid], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            });
        });
    }

    static putPage(page: Page) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE public.books SET title = ? WHERE id = ?', [page.title, page.id], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            })
        });
    }

    static deletePage(id: string) {
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
