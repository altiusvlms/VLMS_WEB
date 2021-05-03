/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from "../../../../services/shell.service";

/** Custom Component */
import { EnquiryListComponent } from './enquiry-list.component';

/** Enquiry Routes */
const routes: Routes = [
  Shell.childRoutes([
  { path: 'enquiry-list', component: EnquiryListComponent }
  ])
];


/**
 * Enquiry Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiryRoutingModule { }
