import { Component } from '@angular/core';
import { Flight } from './_models/Flight';
import { SkylegsService } from './_services/skylegs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'skylegs-challenge';
  error = '';
  loading = false;
  flights: Array<Flight>;
  start: Date = new Date('2019-01-01');
  end: Date = new Date('2019-12-31');

  constructor(private skylegsService: SkylegsService) { }

  /** Load flights on init */
  ngOnInit() {
    this.loading = true;
    this.skylegsService.getFlights(this.start, this.end)
      .subscribe(flights => {
        this.loading = false;
        this.flights = flights;

        console.log(flights);

      }, error => {
        this.loading = false;
        this.flights = [];
        this.error = error
      });

   
  }

}
