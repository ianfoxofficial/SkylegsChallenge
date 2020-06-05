import { Component } from '@angular/core';
import { Flight } from './_models/Flight';
import { SkylegsService } from './_services/skylegs.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'skylegs-challenge';
  error = '';
  loading = false;
  flights: Observable<Flight[]>;
  start: Date = new Date('2019-01-01');
  end: Date = new Date('2019-12-31');

  constructor(private skylegsService: SkylegsService) { 

    this.refresh();

  }

  /** Load flights on init */
  ngOnInit() {
   


  }

  refresh() {
    this.error = '';
    console.log('refresh');
    this.flights = null;
    this.flights = this.skylegsService.getFlights(this.start, this.end).pipe(
      catchError(err => {
        this.error = err;
        return throwError(err);
      }));
    

  }
}
