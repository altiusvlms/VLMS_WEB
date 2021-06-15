/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../../services/shell.service";

/** Custom Component */
import { EmiCalculatorComponent } from './emi-calculator.component';





/** Loan Transfer Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'calculator', component: EmiCalculatorComponent }
  ])
];


/** Loan Transfer Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class EmiCalculatorRoutingModule { }
