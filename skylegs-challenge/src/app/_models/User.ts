export class User {
    code: string;
    email: string;
    first_name:string;
    icao: string;
    id: number;
    last_name: string;
    phone: string;

    constructor(init?) {
        Object.assign(this, init);
    }
}