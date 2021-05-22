/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import ApplicantRoutingModule from './applicant-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';

/** Custom Components */
import { ApplicantOnlineComponent } from './applicant-online/applicant-online.component';
import { PickApplicantComponent } from './pick-applicant/pick-applicant.component';




/** Applicant Module */

@NgModule({
  declarations: [ApplicantOnlineComponent, PickApplicantComponent],
  imports: [
    CommonModule,
    ApplicantRoutingModule,
    SharedModule
  ]
})
export class ApplicantModule { }
