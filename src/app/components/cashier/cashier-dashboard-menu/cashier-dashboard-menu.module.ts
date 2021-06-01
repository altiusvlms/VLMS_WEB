/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import CashierDashboardMenuRoutingModule from './cashier-dashboard-menu-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../../shared/shared/shared.module';

/** Custom Components */
import { MyTaskComponent,EditMyTask } from './my-task/my-task.component';
import { TopupLoanComponent } from './topup-loan/topup-loan.component';
import { CreateReceiptComponent,SearchReceipt } from './receipt/create-receipt/create-receipt.component';
import { HlPaymentComponent } from './receipt/hl-payment/hl-payment.component';
import { HlPaymentListComponent } from './receipt/hl-payment/hl-payment-list/hl-payment-list.component';
import { YetToReceiptComponent } from './receipt/create-receipt/yet-to-receipt/yet-to-receipt.component';
import { VoucherComponent } from './receipt/voucher/voucher.component';
import { VoucherListComponent } from './receipt/voucher/voucher-list/voucher-list.component';




/** Cashier Dashboard Menu Module */

@NgModule({
  declarations: [MyTaskComponent,EditMyTask, TopupLoanComponent,CreateReceiptComponent,SearchReceipt,HlPaymentComponent, HlPaymentListComponent,YetToReceiptComponent, VoucherComponent, VoucherListComponent],
  imports: [
    CommonModule,
    CashierDashboardMenuRoutingModule,
    SharedModule
  ]
})
export class CashierDashboardMenuModule { }
