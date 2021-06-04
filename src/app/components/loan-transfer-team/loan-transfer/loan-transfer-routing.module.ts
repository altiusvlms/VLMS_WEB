/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../services/shell.service";

/** Custom Component */
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerOnlineComponent } from './customer-online/customer-online.component';
import { LoanAmountAddedComponent } from './loan-amount-added/loan-amount-added.component';
import { TaskManagementComponent } from './task-management/task-management.component';




/** Loan Transfer Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'dashboard', component: DashboardComponent },
    { path: 'customer-online', component: CustomerOnlineComponent },
    { path: 'loan-amount-added', component: LoanAmountAddedComponent },
    { path: 'task-management', component: TaskManagementComponent },
  ])
];


/** Loan Transfer Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class LoanTransferRoutingModule { }
