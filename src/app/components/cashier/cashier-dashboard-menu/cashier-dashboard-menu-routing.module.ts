/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Services */
import { Shell } from "../../../services/shell.service";

/** Custom Component */
import { MyTaskComponent } from './my-task/my-task.component';
import { TopupLoanComponent } from './topup-loan/topup-loan.component';
import { CreateReceiptComponent } from './receipt/create-receipt/create-receipt.component';
import { HlPaymentComponent } from './receipt/hl-payment/hl-payment.component';
import { HlPaymentListComponent } from './receipt/hl-payment/hl-payment-list/hl-payment-list.component';
import { YetToReceiptComponent } from './receipt/create-receipt/yet-to-receipt/yet-to-receipt.component';



/** Cashier Dashboard Menu Routes */
const routes: Routes = [
  Shell.childRoutes([
    { path: 'my-task', component: MyTaskComponent },
    { path: 'topup-loans', component: TopupLoanComponent },
    { path: 'create-receipt', component: CreateReceiptComponent },
    { path: 'create-receipt/:id', component: CreateReceiptComponent },
    { path: 'hl-payment', component: HlPaymentComponent },
    { path: 'hl-payment-list', component: HlPaymentListComponent },
    { path: 'yet-to-receipt', component: YetToReceiptComponent },
  ])
];


/** Cashier Dashboard Menu Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class CashierDashboardMenuRoutingModule { }
