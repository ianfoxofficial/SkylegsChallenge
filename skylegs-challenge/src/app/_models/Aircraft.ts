import { AircraftVariant } from './AircraftVariant';

export class Aircraft {
    id: number;
    label: string;
    large_picture_url: string;
    phone: string;
    profile_picture_url: string;
    registration: string;
    variant: AircraftVariant;

    constructor(init?) {
        Object.assign(this, init);

        if(init.variant) {
            this.variant = new AircraftVariant(init.variant);
        }

    }
}