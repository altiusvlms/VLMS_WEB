/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import SuperAdminRoutingModule from './super-admin-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from './../shared/shared/shared.module';

/** Custom Components */
import { DashboardComponent,AdvancedSearch } from './dashboard/dashboard.component';
import { EnquiryListComponent, CreateEnquiry } from './enquiry-list/enquiry-list.component';
import { EnrolListComponent, CreateEnroll } from './enrol-list/enrol-list.component';
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
import { LetterManagementComponent, CreateLetter } from './letter-management/letter-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';


/** Super Admin Module */

@NgModule({
  declarations: [DashboardComponent, AdvancedSearch, EnquiryListComponent, CreateEnquiry, EnrolListComponent, CreateEnroll, CustomerLoanDetailsComponent, ManageUserPermissionComponent, VehicleManagementComponent, AreaManagementComponent, WarehouseManagementComponent, AgentDealerManagementComponent, BranchManagementComponent, CompanyManagementComponent, InsuranceManagementComponent, IdProofManagementComponent, BankManagementComponent, LoanTypeManagementComponent, LoanValueManagementComponent, CashLimitComponent, LoanEligibleComponent, LoanInterestComponent, AssignTargetComponent, IncentiveManagementComponent, LetterManagementComponent,CreateLetter, AnalyticsComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule
  ]
})
export class SuperAdminModule { }
