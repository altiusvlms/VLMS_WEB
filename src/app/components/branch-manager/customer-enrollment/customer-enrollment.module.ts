/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { CustomerEnrollmentRoutingModule } from './customer-enrollment-routing.module';

/** Custom Components */
import { CustomerEnrollListComponent } from './customer-enroll-list/customer-enroll-list.component';

/** Customer Enrollment Module */

@NgModule({
  declarations: [CustomerEnrollListComponent],
  imports: [
    CommonModule,
    CustomerEnrollmentRoutingModule
  ]
})
export class CustomerEnrollmentModule { }
