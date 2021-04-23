/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** Custom Module */
import { CustomerEnrollmentRoutingModule } from './customer-enrollment-routing.module';

/** Custom Components */
import { CustomerEnrollListComponent } from './customer-enroll-list/customer-enroll-list.component';

/** Customer Enrollment Module */

@NgModule({
  declarations: [CustomerEnrollListComponent],
  imports: [
    CommonModule,
    CustomerEnrollmentRoutingModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class CustomerEnrollmentModule { }
