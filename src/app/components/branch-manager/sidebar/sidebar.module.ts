/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** Custom Module */
import { SidebarRoutingModule } from './sidebar-routing.module';

/** Angular Material */
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

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
    SidebarRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SidebarModule { }
