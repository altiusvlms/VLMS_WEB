/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** Custom Module */
import { EnquiryRoutingModule } from './enquiry-routing.module';

/** Custom Components */
import { EnquiryListComponent } from './enquiry-list.component';

/** Enquiry Module */

@NgModule({
  declarations: [EnquiryListComponent],
  imports: [
    CommonModule,
    EnquiryRoutingModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class EnquiryModule { }
