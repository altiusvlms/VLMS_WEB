/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import DashboardMenuRoutingModule from './dashboard-menu-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';
// import {EMIModule} from './emi/emi.module'

/** Custom Components */
import { DashboardComponent,AdvancedSearch } from './dashboard/dashboard.component';
import { UserRolePermissionComponent } from './user-role-permission/user-role-permission.component';
import { AssignTargetsComponent } from './assign-targets/assign-targets.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { TaskManagementComponent ,CreateTask} from './task-management/task-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoanManagementComponent } from './loan-management/loan-management.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { MatTabsModule } from '@angular/material/tabs';
// import { ExistingUserComponent } from './existing-user/existing-user.component';
import { ExistingEmployeeComponent } from './existing-employee/existing-employee.component';
import { TopupLoanComponent } from './topup-loan/topup-loan.component';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';
import { Ng5SliderModule } from 'ng5-slider';
import {MatFormFieldModule} from '@angular/material/form-field';

// import { ChartsModule } from 'ng2-charts';
// import { chart } from 'chart.js'
// import { ChartsModule } from 'ng2-charts';
// import { PieChartComponent } from './piechart/piechart';


/** Dashboard Menu Module */

@NgModule({
  declarations: [DashboardComponent,AdvancedSearch,UserRolePermissionComponent, AssignTargetsComponent, CustomerManagementComponent, TaskManagementComponent, CreateTask,AnalyticsComponent, LoanManagementComponent, ManageEmployeeComponent, TopupLoanComponent, CreateReceiptComponent, ExistingEmployeeComponent],
  imports: [
    CommonModule,
    DashboardMenuRoutingModule,
    SharedModule,
    MatTabsModule,
    Ng5SliderModule,
    MatFormFieldModule,
    // ChartsModule
    // chart
    // ChartsModule
  ]
})
export class DashboardMenuModule { }
