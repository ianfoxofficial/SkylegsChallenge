import { Aircraft } from './Aircraft';
import { Airport } from './Airport';
import { Mission } from './Mission';
import { UserAgenda } from './UserAgenda';

export class Flight {
    id: number;
    departure: Airport;
    arrival: Airport;
    label: string;
    aircraft: Aircraft;
    mission: Mission;
    mission_id: number;

    actual_flight_time: string;
    actual_block_time: string;

    actual_fuel_end: number;
    actual_fuel_start: number;
    actual_fuel_uplift: number;
    actual_fuel_uplift_before: number;

    actual_ibt: Date;
    actual_ldt: Date;
    actual_obt: Date;
    actual_tot: Date;
    date: Date;
    ibt: Date;
    ldt: Date;
    obt: Date;
    tot: Date;
    created_at: Date;
    updated_at: Date;


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

            for (let [key, value] of Object.entries(init)) {
                switch (key) {
                    case "actual_ibt":
                    case "actual_ldt":
                    case "actual_obt":
                    case "actual_tot":
                    case "date":
                    case "ibt":
                    case "ldt":
                    case "obt":
                    case "tot":
                    case "created_at":
                    case "updated_at":
                        if (value) {
                            this[key] = new Date(String(value));
                        }
                        break;
                }
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

