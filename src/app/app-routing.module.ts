/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule ,NoPreloading} from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },

/** Branch Manager Routes */
  {
    path: "branch-manager",
    loadChildren: () =>
      import("./components/branch-manager/customer-enrollment/customer-enrollment.module").then(
        c => c.CustomerEnrollmentModule
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
      import("./components/branch-manager/loan-application/loan-application.module").then(
        
        l => l.LoanApplicationModule
      )
  },
  {
    path: "",
    loadChildren: () =>
      import("./components/login/login.module").then(
        l => l.LoginModule
      )
  },
  {
    path: "branch-manager",
    loadChildren: () =>
      import("./components/branch-manager/dashboard-menu/dashboard-menu.module").then(
        d => d.DashboardMenuModule
      )
  },

/** Cashier Routes */
{
  path: "cashier",
  loadChildren: () =>
    import("./components/cashier/dashboard/dashboard.module").then(
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
 * App Routing Module */
@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: NoPreloading, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
