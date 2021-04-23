/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { SidebarRoutingModule } from './sidebar-routing.module';

/** Custom Components */
import { SidebarComponent } from './sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRolePermissionComponent } from './user-role-permission/user-role-permission.component';
import { AssignTargetsComponent } from './assign-targets/assign-targets.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoanManagementComponent } from './loan-management/loan-management.component';

/** Sidebar Module */

@NgModule({
  declarations: [SidebarComponent, DashboardComponent,UserRolePermissionComponent, AssignTargetsComponent, CustomerManagementComponent, TaskManagementComponent, AnalyticsComponent, LoanManagementComponent],
  imports: [
    CommonModule,
    SidebarRoutingModule
  ]
})
export class SidebarModule { }
