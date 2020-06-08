import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SkylegsService } from '../_services/skylegs.service';
import { ActivatedRoute } from '@angular/router';
import { FlightlistComponent } from '../flightlist/flightlist.component';
import { Flight } from '../_models/Flight';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, take, share } from 'rxjs/operators';

@Component({
  selector: 'app-update-radiation',
  templateUrl: './update-radiation.component.html',
  styleUrls: ['./update-radiation.component.scss']
})
export class UpdateRadiationComponent implements OnInit {
  error = '';
  _flight$ = new BehaviorSubject<Flight | null>(null);
  loading = false;
  formError = '';
  success$: Observable<string>;

  updateForm = this.formBuilder.group({

    FlightLog: ['SKYLEGS-TEST'],
    ACFTAIL: [''],
    DEP: [''],
    DEST: [''],
    STD: [''],
    STA: [''],
    ATCID: ['SKY2019'],
    DOSE: [1]

  });


  
  

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private skylegsService: SkylegsService) {

  }

  /** Init: load flight */
  ngOnInit(): void {
    this.getFlight();
  }

  /** Get flight */
  getFlight() {
    this.error = '';
    const id = +this.route.snapshot.paramMap.get('id');
    this.skylegsService.getFlight(id).pipe(

      catchError(err => {
        this.error = err;
        return throwError(err);
      })).subscribe(data => {
        this._flight$.next(data)
        if (data) {

          /** Prefill form data */
          this.updateForm.controls['ACFTAIL'].setValue(data.aircraft.registration);
          this.updateForm.controls['DEP'].setValue(data.departure.icao);
          this.updateForm.controls['DEST'].setValue(data.arrival.icao);
          this.updateForm.controls['STD'].setValue(data.obt);
          this.updateForm.controls['STA'].setValue(data.ibt);
        }
      });
  }

  /** submit form */
  onSubmit() {
    const values = this.updateForm.value;
    this.error = '';


    this.success$ = this.skylegsService.updateRadiationValue(values).pipe(
      share(),
      catchError(err => {
        this.formError = err;
        return throwError(err);
      }
      ));
  }
}
