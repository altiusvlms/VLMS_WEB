/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** Custom Module */
import { DashboardMenuRoutingModule } from './dashboard-menu-routing.module';

/** Angular Material */
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

/** Custom Components */
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRolePermissionComponent } from './user-role-permission/user-role-permission.component';
import { AssignTargetsComponent } from './assign-targets/assign-targets.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoanManagementComponent } from './loan-management/loan-management.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';

/** Sidebar Module */

@NgModule({
  declarations: [DashboardComponent,UserRolePermissionComponent, AssignTargetsComponent, CustomerManagementComponent, TaskManagementComponent, AnalyticsComponent, LoanManagementComponent, ManageEmployeeComponent],
  imports: [
    CommonModule,
    DashboardMenuRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ]
})
export class DashboardMenuModule { }
