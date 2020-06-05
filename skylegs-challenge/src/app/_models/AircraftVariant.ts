export class AircraftVariant {
    cruise_speed: number;
    icao: string;
    id: number;
    label: string;
    logo_picture_url: string;
    manufacturer: string;
    max_seats: number;
    model: string;
    mtow: number;
    range: number;

    constructor(init?) {
        Object.assign(this, init);
    }
}