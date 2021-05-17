/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Routing Module */
import { CustomerEnrollmentRoutingModule } from './customer-enrollment-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/** Custom Components */
import { CustomerEnrollListComponent } from './customer-enroll-list/customer-enroll-list.component';

/** Customer Enrollment Module */

@NgModule({
  declarations: [CustomerEnrollListComponent],
  imports: [
    CommonModule,
    CustomerEnrollmentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerEnrollmentModule { }
