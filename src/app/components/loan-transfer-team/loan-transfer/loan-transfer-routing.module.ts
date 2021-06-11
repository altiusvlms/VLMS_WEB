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
import { MyTaskComponent} from './my-task/my-task.component';
import { LoanStatusComponent } from './loan-status/loan-status.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';




/** Loan Transfer Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'dashboard', component: DashboardComponent },
    { path: 'customer-online', component: CustomerOnlineComponent },
    { path: 'loan-amount-added', component: LoanAmountAddedComponent },
    { path: 'task-management', component: TaskManagementComponent },
    { path: 'my-task', component: MyTaskComponent },
    { path: 'loan-status/:id', component: LoanStatusComponent },
    { path: 'customer-details/:id', component: CustomerDetailsComponent },
  ])
];


/** Loan Transfer Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class LoanTransferRoutingModule { }
