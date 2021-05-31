/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../services/shell.service";

/** Custom Component */
import { DashboardComponent } from './dashboard.component';


/** Dashboard Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'dashboard', component: DashboardComponent },
  ])
];


/** Dashboard Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class DashboardRoutingModule { }
