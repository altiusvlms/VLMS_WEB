/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { DashboardRoutingModule } from './dashboard-routing.module';

/** Custom Components */
import { DashboardComponent } from './dashboard.component';

/** Page Not Found Module */

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
