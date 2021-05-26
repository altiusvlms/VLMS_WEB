/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../services/shell.service";

/** Custom Component */
import { MyTaskComponent } from './my-task/my-task.component';
import { TopupLoanComponent } from './topup-loan/topup-loan.component';


/** Cashier Dashboard Menu Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'my-task', component: MyTaskComponent },
    { path: 'topup-loan', component: TopupLoanComponent },
  ])
];


/** Cashier Dashboard Menu Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class CashierDashboardMenuRoutingModule { }
