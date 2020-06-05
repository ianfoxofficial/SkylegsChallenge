import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
    getFlights(start: Date = null, end: Date = null) {
        if (!this.flights$) {
            this.flights$ = this.getFlightsRequest(start, end).pipe(
                shareReplay(CACHE_SIZE)
            )
        }

        return this.flights$;
    }


    /** Get flights from start to end dates  */
    private getFlightsRequest(start: Date = null, end: Date = null) {
        let params: HttpParams = new HttpParams();
        const startstr = this.transformDate(start);
        const endstr = this.transformDate(end);

        if (start) {
            params = params.append("start", startstr);
        }
        if (end) {
            params = params.append("end", endstr);
        }

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
}