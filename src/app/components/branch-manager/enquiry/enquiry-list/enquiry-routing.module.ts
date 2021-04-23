/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Component */
import { EnquiryListComponent } from './enquiry-list.component';

/** Enquiry Routes */
const routes: Routes = [{ path: 'enquiry-list', component: EnquiryListComponent }];


/**
 * Enquiry Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiryRoutingModule { }
