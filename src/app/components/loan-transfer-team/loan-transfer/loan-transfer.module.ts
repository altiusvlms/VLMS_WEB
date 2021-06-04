/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import LoanTransferRoutingModule from './loan-transfer-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';

/** Custom Components */
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerOnlineComponent } from './customer-online/customer-online.component';
import { LoanAmountAddedComponent } from './loan-amount-added/loan-amount-added.component';
import { TaskManagementComponent } from './task-management/task-management.component';





/** Loan Transfer Module */

@NgModule({
  declarations: [DashboardComponent, CustomerOnlineComponent, LoanAmountAddedComponent, TaskManagementComponent],
  imports: [
    CommonModule,
    LoanTransferRoutingModule,
    SharedModule
  ]
})
export class LoanTransferModule { }
