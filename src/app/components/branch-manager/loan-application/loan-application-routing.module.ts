/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Component */
import { LoanProcessComponent } from './loan-process/loan-process.component';

/** Loan Application Routes */
const routes: Routes = [{ path: 'loan-process', component: LoanProcessComponent }];


/**
 * Loan Application Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanApplicationRoutingModule { }
