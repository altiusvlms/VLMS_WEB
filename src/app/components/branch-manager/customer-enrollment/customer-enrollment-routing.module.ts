/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from "../../../services/shell.service";

/** Custom Component */
import { CustomerEnrollListComponent } from './customer-enroll-list/customer-enroll-list.component';

/** Customer Enrollment Routes */
const routes: Routes = [
  Shell.childRoutes([
  { path: 'customer-enroll-list', component: CustomerEnrollListComponent }
  ])
];


/**
 * Customer Enrollment Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerEnrollmentRoutingModule { }
