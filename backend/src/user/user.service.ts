import { connection } from '../util/connection';
import { User } from './user.model';

export default class UserService {
    static getUser(id: string) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM public.users WHERE "Id" = ' + id + ';', (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows[0]);
            });
        });
    }

    static postUser(email: string) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO public.books (email) VALUES (?);', [email], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            });
        });
    }

    static putUser(user: User) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE public.books SET (firstName, lastName) = (?, ?) WHERE id = ?', [user.firstName, user.lastName, user.id], (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response.rows);
            })
        });
    }
}
