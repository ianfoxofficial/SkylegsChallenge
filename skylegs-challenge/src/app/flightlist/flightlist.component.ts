import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../_models/Flight';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-flightlist',
  templateUrl: './flightlist.component.html',
  styleUrls: ['./flightlist.component.scss']
})
export class FlightlistComponent implements OnInit  {
  @Input() flights:  Observable<Flight[]>;
  
  ngOnInit(): void {
  }

}
