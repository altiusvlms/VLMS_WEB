/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Component */
import { CustomerEnrollListComponent } from './customer-enroll-list/customer-enroll-list.component';

/** Customer Enrollment Routes */
const routes: Routes = [{ path: 'customer-enroll-list', component: CustomerEnrollListComponent }];


/**
 * Customer Enrollment Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerEnrollmentRoutingModule { }
