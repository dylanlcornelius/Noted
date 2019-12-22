import { connection } from '../util/connection';
import { Page } from './page.model';

export default class PageService {
    static getPages(uid: string) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM public.pages WHERE "Uid" = ?;', [uid], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            });
        });
    }
    
    static postPage(title: string, type: string, uid: string) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO public.pages (title, type, is_default, author, editor) VALUES ($1, $2, $3, $4, $5);', [title, type, false, uid, uid], (error, response) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response.rows);
                }
            });
        });
    }

    static putPage(page: Page) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE public.pages SET title = ? WHERE id = ?', [page.title, page.id], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            })
        });
    }

    static deletePage(id: string) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM public.pages WHERE id = ?', [id], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            })
        });
    }
}
