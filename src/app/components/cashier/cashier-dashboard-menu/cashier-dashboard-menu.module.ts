/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import CashierDashboardMenuRoutingModule from './cashier-dashboard-menu-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';

/** Custom Components */
import { MyTaskComponent,EditMyTask } from './my-task/my-task.component';
import { TopupLoanComponent } from './topup-loan/topup-loan.component';





/** Cashier Dashboard Menu Module */

@NgModule({
  declarations: [MyTaskComponent,EditMyTask, TopupLoanComponent],
  imports: [
    CommonModule,
    CashierDashboardMenuRoutingModule,
    SharedModule
  ]
})
export class CashierDashboardMenuModule { }
