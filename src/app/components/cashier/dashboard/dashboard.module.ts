/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import DashboardRoutingModule from './dashboard-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';

/** Custom Components */
import { DashboardComponent,AdvancedSearch } from '../dashboard/dashboard.component';



/** Dashboard Module */

@NgModule({
  declarations: [DashboardComponent,AdvancedSearch],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
