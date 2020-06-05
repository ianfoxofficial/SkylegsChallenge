import { Aircraft } from './Aircraft';
import { Airport } from './Airport';

export class Flight {
    id: number;
    departure: Airport;
    arrival: Airport;
    label: string;
    aircraft: Aircraft;

    actual_flight_time: string;

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
        }
    }

}