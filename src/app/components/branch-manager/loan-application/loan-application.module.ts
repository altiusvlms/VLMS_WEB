/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Routing Module */
import { LoanApplicationRoutingModule } from './loan-application-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Ng5SliderModule } from 'ng5-slider';

/** Custom Components */
import { LoanProcessComponent } from './loan-process/loan-process.component';
import { LoanVerificationComponent } from './loan-verification/loan-verification.component';
import { NewloanProcessComponent } from './newloan-process/newloan-process.component';
import { LoanDisbursalComponent } from './loan-disbursal/loan-disbursal.component';
import { LoanApprovalComponent } from './loan-approval/loan-approval.component';
import { CashLimitComponent , EditCashLimit} from './cash-limit/cash-limit.component';

/** Loan Application Module */

@NgModule({
  declarations: [LoanProcessComponent, LoanVerificationComponent, NewloanProcessComponent, LoanDisbursalComponent, LoanApprovalComponent, CashLimitComponent, EditCashLimit],
  imports: [
    CommonModule,
    LoanApplicationRoutingModule,
    SharedModule,
    MatDatepickerModule,
    Ng5SliderModule
    ]
})
export class LoanApplicationModule { }

