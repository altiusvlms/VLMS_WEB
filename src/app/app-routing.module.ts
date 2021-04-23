/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';



/** Fallback to this route when no prior route is matched.*/

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },

/** Branch Manager Routes */
  {
    path: "branch-manager",
    loadChildren: () =>
      import("./components/branch-manager/dashboard/dashboard.module").then(
        d => d.DashboardModule
      )
  },
  {
    path: "branch-manager",
    loadChildren: () =>
      import("./components/branch-manager/enquiry/enquiry-list/enquiry.module").then(
        e => e.EnquiryModule
      )
  },
  {
    path: "branch-manager",
    loadChildren: () =>
      import("./components/branch-manager/login/login.module").then(
        l => l.LoginModule
      )
  },
  {
    path: "branch-manager",
    loadChildren: () =>
      import("./components/branch-manager/sidebar/sidebar.module").then(
        s => s.SidebarModule
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
  imports: [RouterModule.forRoot(routes), MatSidenavModule, MatToolbarModule],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
