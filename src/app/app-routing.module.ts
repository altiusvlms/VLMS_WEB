/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './components/branch-manager/dashboard/dashboard.component';

/** Fallback to this route when no prior route is matched.*/

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./components/branch-manager/dashboard/dashboard.module").then(
        d => d.DashboardModule
      )
  },
  {
    path: "**",
    loadChildren: () =>
      import("./components/page-not-found/page-not-found.module").then(
        m => m.PageNotFoundModule
      )
  }
];

/**
 * App Routing Module.
 *
 * Configures the fallback route.*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
