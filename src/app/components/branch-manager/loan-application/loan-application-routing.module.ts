/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../services/shell.service";
import { CashLimitComponent } from './cash-limit/cash-limit.component';
import { LoanApprovalComponent } from './loan-approval/loan-approval.component';
import { LoanDisbursalComponent } from './loan-disbursal/loan-disbursal.component';

/** Custom Component */
import { LoanProcessComponent } from './loan-process/loan-process.component';
import { LoanVerificationComponent } from './loan-verification/loan-verification.component';
import { NewloanProcessComponent } from './newloan-process/newloan-process.component';


/** Loan Application Routes */
const routes: Routes = [
  Shell.childRoutes([
  { path: 'loan-process', component: LoanProcessComponent },
  { path: 'loan-verification', component: LoanVerificationComponent },
  { path: 'loan-process/:id', component: LoanProcessComponent },
  { path: 'newloan-process' , component: NewloanProcessComponent},
  { path: 'loandisbursal-process' , component: LoanDisbursalComponent},
  { path: 'loanapproval-process' , component: LoanApprovalComponent},
  { path: 'cashlimit-process' , component: CashLimitComponent}

  ])
];


/**
 * Loan Application Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanApplicationRoutingModule { }
