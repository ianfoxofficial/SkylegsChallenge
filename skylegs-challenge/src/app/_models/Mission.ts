export class Mission {
    id: number;
    hash: string;
    number: number;
   
    constructor(init?) {
        Object.assign(this, init);
    }
}