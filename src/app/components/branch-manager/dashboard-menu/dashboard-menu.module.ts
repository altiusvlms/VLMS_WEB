/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import DashboardMenuRoutingModule from './dashboard-menu-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';

/** Custom Components */
import { DashboardComponent,AdvancedSearch } from './dashboard/dashboard.component';
import { UserRolePermissionComponent ,CreateRole} from './user-role-permission/user-role-permission.component';
import { AssignTargetsComponent } from './assign-targets/assign-targets.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { TaskManagementComponent ,CreateTask} from './task-management/task-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ExistingEmployeeComponent } from './existing-employee/existing-employee.component';
import { TopupLoanComponent } from './topup-loan/topup-loan.component';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';
import { Ng5SliderModule } from 'ng5-slider';
import {MatFormFieldModule} from '@angular/material/form-field';
// For MDB Angular Pro
import { ChartsModule, ChartSimpleModule, WavesModule } from 'ng-uikit-pro-standard'
import { IgxDoughnutChartModule, IgxRingSeriesModule } from "igniteui-angular-charts";
import { NgCircleProgressModule } from 'ng-circle-progress';

import { chart } from 'chart.js';
import { SetPermissionComponent } from './user-role-permission/set-permission/set-permission.component';


/** Dashboard Menu Module */

@NgModule({
  declarations: [DashboardComponent,AdvancedSearch,UserRolePermissionComponent,CreateRole, AssignTargetsComponent, CustomerManagementComponent, TaskManagementComponent, CreateTask,AnalyticsComponent, ManageEmployeeComponent, TopupLoanComponent, CreateReceiptComponent, ExistingEmployeeComponent, SetPermissionComponent],
  imports: [
    CommonModule,
    DashboardMenuRoutingModule,
    SharedModule,
    MatTabsModule,
    Ng5SliderModule,
    MatFormFieldModule,
    ChartsModule,
    ChartSimpleModule,
    WavesModule,
    IgxDoughnutChartModule,
    IgxRingSeriesModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    })
  ]
})
export class DashboardMenuModule { }
