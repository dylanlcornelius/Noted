import {connection} from '../util/connection';

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
    
}
