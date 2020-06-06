import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SkylegsService } from '../_services/skylegs.service';
import { ActivatedRoute } from '@angular/router';
import { FlightlistComponent } from '../flightlist/flightlist.component';
import { Flight } from '../_models/Flight';

@Component({
  selector: 'app-update-radiation',
  templateUrl: './update-radiation.component.html',
  styleUrls: ['./update-radiation.component.scss']
})
export class UpdateRadiationComponent implements OnInit {

  flight : Flight;

  updateForm = this.formBuilder.group({

    FlightLog: ['SKYLEGS-TEST'],
    ACFTAIL: ['OO-DEMO'],
    DEP: ['EBBR'],
    DEST: ['EGLC'],
    STD: ['2019-10-08T11:30:00'],
    STA: ['2019-10-08T12:40:00'],
    ATCID: ['SKY2019'],
    DOSE: [1]

  });

  error = '';


  constructor(private route: ActivatedRoute, private formBuilder : FormBuilder, private skylegsService : SkylegsService) { 
    
  }

  ngOnInit(): void {
    this.getFlight();
  }

  getFlight() {
    
      const id = +this.route.snapshot.paramMap.get('id');
      this.skylegsService.getFlight(id).subscribe(flight => {
        this.flight = flight;
        console.log(flight);
      });
      
  }

  onSubmit() {
    const values = this.updateForm.value;
    this.error = '';


    this.skylegsService.updateRadiationValue(values).subscribe(response => {
      console.log(response);
    }, error => {
      this.error = error
    });
  }
}
