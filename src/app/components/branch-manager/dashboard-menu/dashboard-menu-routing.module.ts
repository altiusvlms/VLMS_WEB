/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../services/shell.service";

/** Custom Component */
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRolePermissionComponent } from './user-role-permission/user-role-permission.component';
import { AssignTargetsComponent } from './assign-targets/assign-targets.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoanManagementComponent } from './loan-management/loan-management.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
// import { ExistingUserComponent } from './existing-user/existing-user.component';
import { ExistingEmployeeComponent } from './existing-employee/existing-employee.component';
import { TopupLoanComponent } from './topup-loan/topup-loan.component';
import { CreateReceiptComponent } from './create-receipt/create-receipt.component';

/** Dashboard Menu Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-role-permission', component: UserRolePermissionComponent },
    { path: 'assign-targets', component: AssignTargetsComponent },
    { path: 'customer-management', component: CustomerManagementComponent },
    { path: 'task-management', component: TaskManagementComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'loan-management', component: LoanManagementComponent },
    { path: 'manage-employee', component: ManageEmployeeComponent},
    { path: 'existing-employee', component: ExistingEmployeeComponent},    
    { path: 'topup-loan', component: TopupLoanComponent},
    { path: 'create-recipt', component:CreateReceiptComponent},
  ])
];


/**
 *Dashboard Menu Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class DashboardMenuRoutingModule { }
