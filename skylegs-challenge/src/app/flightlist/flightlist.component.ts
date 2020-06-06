import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../_models/Flight';
import { Observable, throwError } from 'rxjs';
import { SkylegsService } from '../_services/skylegs.service';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-flightlist',
  templateUrl: './flightlist.component.html',
  styleUrls: ['./flightlist.component.scss']
})
export class FlightlistComponent implements OnInit {
  error = '';
  loading = false;
  flights: Observable<Flight[]>;


  constructor(private skylegsService: SkylegsService) {  }
  ngOnInit(): void {
    this.refresh();
  }

  /** Load items.
   * @param forceRefresh boolean
   */
  refresh(forceRefresh = false) {
    this.error = '';
    console.log('refresh');
    this.flights = null;
    this.flights = this.skylegsService.getFlights(forceRefresh).pipe(
      catchError(err => {
        this.error = err;
        return throwError(err);
      }));


  }
}
