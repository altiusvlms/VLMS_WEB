/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Component */
import { HeaderComponent } from "./header.component";

/** Shared Routes */
const routes: Routes = [{ path: '/header', component: HeaderComponent }];


/**
 * Shared Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
