/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Component */
import { SidebarComponent } from './sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRolePermissionComponent } from './user-role-permission/user-role-permission.component';
import { AssignTargetsComponent } from './assign-targets/assign-targets.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoanManagementComponent } from './loan-management/loan-management.component';

/** Sidebar Routes */
const routes: Routes = [
    { path: 'sidebar', component: SidebarComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-role-permission', component: UserRolePermissionComponent },
    { path: 'assign-targets', component: AssignTargetsComponent },
    { path: 'customer-management', component: CustomerManagementComponent },
    { path: 'task-management', component: TaskManagementComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'loan-management', component: LoanManagementComponent },
];


/**
 * Sidebar Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
