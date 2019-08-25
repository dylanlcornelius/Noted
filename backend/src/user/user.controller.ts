import UserService from './user.service';

export default class UserController {

    static getUser(request: any, response: any) {
        UserService.getUser(request.params.id).then(user => {
            response.send(user);
        }, (error) => {
            response.send(error);
        });
    }

    static postUser() {

    }

    static putUser() {

    }

    static deleteUser() {
        
    }
}
