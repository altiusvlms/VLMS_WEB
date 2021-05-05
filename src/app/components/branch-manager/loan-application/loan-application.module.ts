/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';



/** Custom Module */
import { LoanApplicationRoutingModule } from './loan-application-routing.module';

/** Custom Components */
import { LoanProcessComponent } from './loan-process/loan-process.component';
import { LoanVerificationComponent } from './loan-verification/loan-verification.component';
import { NewloanProcessComponent } from './newloan-process/newloan-process.component';


/** Loan Application Module */

@NgModule({
  declarations: [LoanProcessComponent, LoanVerificationComponent, NewloanProcessComponent],
  imports: [
    CommonModule,
    LoanApplicationRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule
    ]
})
export class LoanApplicationModule { }

