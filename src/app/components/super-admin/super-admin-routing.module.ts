/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../services/shell.service";

/** Custom Component */
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';
import { EnrolListComponent } from './enrol-list/enrol-list.component';
import { CustomerLoanDetailsComponent } from './customer-loan-details/customer-loan-details.component';
import { ManageUserPermissionComponent } from './manage-user-permission/manage-user-permission.component';
import { VehicleManagementComponent } from './vehicle-management/vehicle-management.component';
import { AreaManagementComponent } from './area-management/area-management.component';
import { WarehouseManagementComponent } from './warehouse-management/warehouse-management.component';
import { AgentDealerManagementComponent } from './agent-dealer-management/agent-dealer-management.component';
import { BranchManagementComponent } from './branch-management/branch-management.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { InsuranceManagementComponent } from './insurance-management/insurance-management.component';
import { IdProofManagementComponent } from './id-proof-management/id-proof-management.component';
import { BankManagementComponent } from './bank-management/bank-management.component';
import { LoanTypeManagementComponent } from './loan-type-management/loan-type-management.component';
import { LoanValueManagementComponent } from './loan-value-management/loan-value-management.component';
import { CashLimitComponent } from './cash-limit/cash-limit.component';
import { LoanEligibleComponent } from './loan-eligible/loan-eligible.component';
import { LoanInterestComponent } from './loan-interest/loan-interest.component';
import { AssignTargetComponent } from './assign-target/assign-target.component';
import { IncentiveManagementComponent } from './incentive-management/incentive-management.component';
import { LetterManagementComponent } from './letter-management/letter-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';



/** Super Admin Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'dashboard', component: DashboardComponent },
    { path: 'enquiry-list', component: EnquiryListComponent },
    { path: 'enrol-list', component: EnrolListComponent },
    { path: 'customer-loan-details/:id', component: CustomerLoanDetailsComponent },
    { path: 'manage-user-permission', component: ManageUserPermissionComponent },
    { path: 'vehicle-management', component: VehicleManagementComponent },
    { path: 'area-management', component: AreaManagementComponent },
    { path: 'warehouse-management', component: WarehouseManagementComponent },
    { path: 'agent-dealer-management', component: AgentDealerManagementComponent },
    { path: 'branch-management', component: BranchManagementComponent },
    { path: 'company-management', component: CompanyManagementComponent },
    { path: 'insurance-management', component: InsuranceManagementComponent },
    { path: 'id-proof-management', component: IdProofManagementComponent },
    { path: 'bank-management', component: BankManagementComponent },
    { path: 'loan-type-management', component: LoanTypeManagementComponent },
    { path: 'loan-value-management', component: LoanValueManagementComponent },
    { path: 'cash-limit', component: CashLimitComponent },
    { path: 'loan-eligible', component: LoanEligibleComponent },
    { path: 'loan-interest', component: LoanInterestComponent },
    { path: 'assign-target', component: AssignTargetComponent },
    { path: 'incentive-management', component: IncentiveManagementComponent },
    { path: 'letter-management', component: LetterManagementComponent },
    { path: 'analytics', component: AnalyticsComponent },

  ])
];


/** Super Admin Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class SuperAdminRoutingModule { }
