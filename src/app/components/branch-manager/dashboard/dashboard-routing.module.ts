/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Component */
import { DashboardComponent } from './dashboard.component';

/** Dashboard Routes */
const routes: Routes = [{ path: '', component: DashboardComponent }];


/**
 * Dashboard Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
