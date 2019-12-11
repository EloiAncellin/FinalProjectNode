export default class User {
    id: string;
    email: string;
    password: string | null;
    firstName: string;
    lastName: string;

    constructor(id: string, email: string, password: string | null, firstName: string, lastName: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
