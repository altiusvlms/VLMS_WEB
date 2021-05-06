/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Material and Form Module */
import { SharedModule } from '../../../shared/shared/shared.module';

/** Custom Routing Module */
import { EnquiryRoutingModule } from './enquiry-routing.module';

/** Custom Components */
import { EnquiryListComponent } from './enquiry-list.component';

/** Enquiry Module */

@NgModule({
  declarations: [EnquiryListComponent],
  imports: [
    CommonModule,
    EnquiryRoutingModule,
    SharedModule
  ]
})
export class EnquiryModule { }
