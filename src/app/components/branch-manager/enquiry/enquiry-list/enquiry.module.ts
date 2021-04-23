/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { EnquiryRoutingModule } from './enquiry-routing.module';

/** Custom Components */
import { EnquiryListComponent } from './enquiry-list.component';

/** Enquiry Module */

@NgModule({
  declarations: [EnquiryListComponent],
  imports: [
    CommonModule,
    EnquiryRoutingModule
  ]
})
export class EnquiryModule { }
