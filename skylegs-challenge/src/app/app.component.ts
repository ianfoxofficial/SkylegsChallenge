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
  
}
