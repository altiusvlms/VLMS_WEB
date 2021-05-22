/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../services/shell.service";
import { CreateReceiptComponent } from '../create-receipt/create-receipt.component';
import { YetToReceiptComponent } from '../yet-to-receipt/yet-to-receipt.component';

/** Custom Component */
import { DashboardComponent } from './dashboard.component';


/** Dashboard Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'dashboard', component: DashboardComponent },
    { path: 'create-receipt', component: CreateReceiptComponent },
    {path: 'yet-to-receipt', component: YetToReceiptComponent}
  ])
];


/** Dashboard Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class DashboardRoutingModule { }
