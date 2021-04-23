/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { LoanApplicationRoutingModule } from './loan-application-routing.module';

/** Custom Components */
import { LoanProcessComponent } from './loan-process/loan-process.component';

/** Loan Application Module */

@NgModule({
  declarations: [LoanProcessComponent],
  imports: [
    CommonModule,
    LoanApplicationRoutingModule
  ]
})
export class LoanApplicationModule { }
