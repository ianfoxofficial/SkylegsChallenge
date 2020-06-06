import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightlistComponent } from './flightlist/flightlist.component';
import { UpdateRadiationComponent } from './update-radiation/update-radiation.component';


const routes: Routes = [
  { path: '', component: FlightlistComponent},
  { path: 'flight/:id', component: UpdateRadiationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
