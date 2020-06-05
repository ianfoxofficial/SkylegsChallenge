import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SkylegsService } from '../_services/skylegs.service';

@Component({
  selector: 'app-update-radiation',
  templateUrl: './update-radiation.component.html',
  styleUrls: ['./update-radiation.component.scss']
})
export class UpdateRadiationComponent implements OnInit {


  updateForm = this.formBuilder.group({

    FlightLog: ["SKYLEGS-TEST"],
    ACFTAIL: ["OO-DEMO"],
    DEP: ["EBBR"],
    DEST: ["EGLC"],
    STD: ["2019-10-08T11:30:00"],
    STA: ["2019-10-08T12:40:00"],
    ATCID: ["SKY2019"],
    DOSE: [1]

  });

  error = "";


  constructor(private formBuilder : FormBuilder, private skylegsService : SkylegsService) { 
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const values = this.updateForm.value;



    this.skylegsService.updateRadiationValue(values).subscribe(response => {
      console.log(response);
    }, error => {
      this.error = error
    });
  }
}
