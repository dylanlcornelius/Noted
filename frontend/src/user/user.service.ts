import axios from 'axios';

export default class UserService {
    
    static getUser(id: string) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3002/user/' + id).then(response => {
                console.log(response);
                console.log(response.data);
                resolve(response.data);
            }, error => {
                console.log(error);
                reject(error);
            });
        });
    }
}
