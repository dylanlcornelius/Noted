import { connection } from './connection';

export default function query(query: string, fields: any[]) {
    return new Promise((resolve, reject) => {
        connection.query(query, fields, (error, response) => {
            if (error || !response) {
                reject(error);
            } else {
                resolve(response.rows);
            }
        });
    });
};
