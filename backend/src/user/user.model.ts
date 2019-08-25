export class User {
    id: string | undefined;
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string, id?: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
