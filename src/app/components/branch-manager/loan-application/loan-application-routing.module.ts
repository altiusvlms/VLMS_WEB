/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../services/shell.service";

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
  { path: 'newloan-process' , component: NewloanProcessComponent}
  ])
];


/**
 * Loan Application Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanApplicationRoutingModule { }
