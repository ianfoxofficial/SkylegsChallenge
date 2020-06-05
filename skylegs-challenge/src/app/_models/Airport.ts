export class  Airport {
    airport_of_entry: boolean;
    approach: string;
    city: string;
    country_id: number;
    country_name: string;
    customs: boolean;
    departure: false
    designated_international: boolean;
    distance_from_city: string;
    elevation: number;
    fuel: string;
    handling_mandatory: boolean;
    iata: string;
    icao: string;
    id:number;
    kind: string;
    label: string;
    landing_rights: boolean;
    latitude: number;
    length: number;
    longitude: number;
    name:string;
    runways: string;
    slots_required: boolean;
    timezone: string;
    user_fees: boolean;
    width: number;

    constructor(init) {
        Object.assign(this, init);
    }
}