export class User {
    id: string | undefined;
    email: string;
    firstName: string;
    lastName: string;

    constructor(email: string, firstName: string, lastName: string, id?: string) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
