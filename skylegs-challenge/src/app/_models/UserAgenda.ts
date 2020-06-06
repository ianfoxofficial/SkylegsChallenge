import { User } from './User';

export class UserAgenda{
    id: number;
    kind: string;
    pilot_flying: boolean;
    pilot_in_command: boolean;
    user: User;

    constructor(init?) {
        Object.assign(this, init);

        if(init.user) {

            this.user = new User(init.user);
        }
    }
}