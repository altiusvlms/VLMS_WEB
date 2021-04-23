/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

/** Custom Module */
import { DashboardRoutingModule } from './dashboard-routing.module';

/** Custom Components */
import { DashboardComponent } from './dashboard.component';

/** Page Not Found Module */

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule
  ]
})
export class DashboardModule { }
