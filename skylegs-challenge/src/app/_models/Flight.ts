import { Aircraft } from './Aircraft';
import { Airport } from './Airport';
import { Mission } from './Mission';
import { UserAgenda } from './UserAgenda';

export class Flight {
    id: number;
    departure: Airport;
    arrival: Airport;
    aircraft: Aircraft;
    mission: Mission;
    mission_id: number;
    actual_flight_time: string;
    actual_block_time: string;
    actual_fuel_end: number;
    actual_fuel_start: number;
    actual_fuel_uplift: number;
    actual_fuel_uplift_before: number;
    actual_ibt: string;
    actual_ldt: string;
    actual_obt: string;
    actual_tot: string;
    date: string;
    ibt: string;
    ldt: string;
    obt: string;
    tot: string;
    created_at: string;
    updated_at: string;
    block_fuel: Number;
    block_time: string;
    client_pdf_url: string;
    crew_string: string;
    empty_leg: boolean;
    flight_time: string;
    hash: string;
    number: number;
    pax: number;
    remarks: string;
    shared_leg: boolean;
    userAgendas = [];
	
    constructor(init?) {
        Object.assign(this, init);
        /** convert returned plain objects int Flight object. */
        if (init) {
            if (init.aircraft) {
                this.aircraft = new Aircraft(init.aircraft);
            }
            if (init.arrival) {
                this.arrival = new Airport(init.arrival);
            }
            if (init.departure) {
                this.departure = new Airport(init.departure);
            }
            if (init.mission) {
                this.mission = new Mission(init.mission);
            }
            if(init.userAgendas) {
                this.userAgendas = [];
                init.userAgendas.forEach(userAgenda$ => {
                    let userAgenda = new UserAgenda(userAgenda$);
                    this.userAgendas.push(userAgenda);
                });
            }
        }
    }
}