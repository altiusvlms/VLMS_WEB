/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import LoanTransferRoutingModule from './loan-transfer-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';

/** Custom Components */
import { DashboardComponent,AdvancedSearch } from './dashboard/dashboard.component';
import { CustomerOnlineComponent } from './customer-online/customer-online.component';
import { LoanAmountAddedComponent } from './loan-amount-added/loan-amount-added.component';
import { TaskManagementComponent ,CreateTask} from './task-management/task-management.component';
import { MyTaskComponent ,EditMyTask} from './my-task/my-task.component';
import { LoanStatusComponent } from './loan-status/loan-status.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';





/** Loan Transfer Module */

@NgModule({
  declarations: [DashboardComponent,AdvancedSearch, CustomerOnlineComponent, LoanAmountAddedComponent, TaskManagementComponent,CreateTask, MyTaskComponent,EditMyTask, LoanStatusComponent, CustomerDetailsComponent],
  imports: [
    CommonModule,
    LoanTransferRoutingModule,
    SharedModule
  ]
})
export class LoanTransferModule { }
