/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Component */
import { PageNotFoundComponent } from "./page-not-found.component";
import { Shell } from "../../services/shell.service";


/** Page Not Found Routes */
const routes: Routes = [
  Shell.childRoutes([
  { path: '', component: PageNotFoundComponent }
  ])
];


/**
 * Page Not Found Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule { }
