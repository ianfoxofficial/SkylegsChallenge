import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { shareReplay, map, catchError } from 'rxjs/operators';
import { Flight } from '../_models/Flight';

import { Md5 } from 'ts-md5/dist/md5';


const CACHE_SIZE = 1;
@Injectable({ providedIn: 'root' })
export class SkylegsService {

    private flights$: Observable<Flight[]>;

    constructor(private http: HttpClient, private datePipe: DatePipe) { }

    /** Transforms Date objects to yyyy-MM-dd strings */
    transformDate(date: Date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    /** Get cached flights from start to end dates */
    getFlights(force: boolean = false) {

        if (!this.flights$ || force) {
            this.flights$ = this.getFlightsRequest().pipe(
                shareReplay(CACHE_SIZE)
            )
        }

        return this.flights$;
    }

    /** Get single flight based on id */
    getFlight(id: number) {
        if (!this.flights$) {
            this.refreshFlights();
        }
        return this.flights$.pipe(map(flights => flights.find(flight => flight.id == id)));

    }

    /** Force reload Flights */
    refreshFlights() {
        this.flights$ = this.getFlightsRequest().pipe(
            shareReplay(CACHE_SIZE)
        )
        return this.flights$;
    }

    /** Get flights from start to end dates  */
    private getFlightsRequest() {
        let params: HttpParams = new HttpParams();

        const startstr = this.transformDate(environment.start);
        const endstr = this.transformDate(environment.end);

        params = params.append("start", startstr);
        params = params.append("end", endstr);

        /** get flights, turn into "Flight objects" */
        return this.http.get<Flight[]>(`${environment.apiUrl}/all`, { params: params }).pipe(
            map(response => {
                let flights: Flight[] = [];
                response.forEach(function (_flight) {
                    let flight = new Flight(_flight);
                    flights.push(flight);
                });
                return flights;
            })
        );
    }

    /** Update Radiation Value */
    updateRadiationValue(params) {

        /** Prepare Certificate property */
        let certificatestr = params.ACFTAIL + params.DEP + params.DEST + params.STD + params.ATCID + params.DOSE;
        let certificate = Md5.hashStr(certificatestr);

        params.Certificate = certificate;

        /** API expects array of values */
        let payload = [];
        payload.push(params);

        return this.http.post(`${environment.apiUrl}/store-radiation`, payload, { responseType: 'text' });
    }
}