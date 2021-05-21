/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../services/shell.service";

/** Custom Component */
import { ApplicantOnlineComponent } from './applicant-online/applicant-online.component';
import { PickApplicantComponent } from './pick-applicant/pick-applicant.component';


/** Applicant Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'applicant_online', component: ApplicantOnlineComponent },
    { path: 'pick_applicant/:id', component: PickApplicantComponent }

  ])
];


/** Applicant Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class ApplicantRoutingModule { }
