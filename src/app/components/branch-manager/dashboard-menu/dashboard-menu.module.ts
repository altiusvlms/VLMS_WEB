/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Routing Module */
import { DashboardMenuRoutingModule } from './dashboard-menu-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';

/** Custom Components */
import { DashboardComponent,AdvancedSearch } from './dashboard/dashboard.component';
import { UserRolePermissionComponent } from './user-role-permission/user-role-permission.component';
import { AssignTargetsComponent } from './assign-targets/assign-targets.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { TaskManagementComponent ,CreateTask} from './task-management/task-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoanManagementComponent } from './loan-management/loan-management.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';

/** Dashboard Menu Module */

@NgModule({
  declarations: [DashboardComponent,AdvancedSearch,UserRolePermissionComponent, AssignTargetsComponent, CustomerManagementComponent, TaskManagementComponent, CreateTask,AnalyticsComponent, LoanManagementComponent, ManageEmployeeComponent],
  imports: [
    CommonModule,
    DashboardMenuRoutingModule,
    SharedModule
  ]
})
export class DashboardMenuModule { }
