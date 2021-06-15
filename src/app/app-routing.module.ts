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
    path: "cashier",
    loadChildren: () =>
      import("./components/cashier/applicant/applicant.module").then(
        a => a.ApplicantModule
      )
  },
  {
    path: "cashier",
    loadChildren: () =>
      import("./components/cashier/cashier-dashboard-menu/cashier-dashboard-menu.module").then(
        c => c.CashierDashboardMenuModule
      )
  },
  /** Some same component used for branchManager Modules and Cashier Modules */
  {
    path: "branch-manager",
    loadChildren: () =>
      import("./components/cashier/cashier-dashboard-menu/cashier-dashboard-menu.module").then(
        c => c.CashierDashboardMenuModule
      )
  },

  {
    path: "cashier",
    loadChildren: () =>
      import("./components/branch-manager/dashboard-menu/dashboard-menu.module").then(
        d => d.DashboardMenuModule
      )
  },
  {
    path: "cashier",
    loadChildren: () =>
      import("./components/branch-manager/customer-enrollment/customer-enrollment.module").then(
        c => c.CustomerEnrollmentModule
      )
  },
  {
    path: "cashier",
    loadChildren: () =>
      import("./components/branch-manager/enquiry/enquiry-list/enquiry.module").then(
        e => e.EnquiryModule
      )
  },
  {
    path: "cashier",
    loadChildren: () =>
      import("./components/branch-manager/loan-application/loan-application.module").then(
        l => l.LoanApplicationModule
      )
  },


  
/** Loan Transfer Routes */
{
  path: "loan-transfer-team",
  loadChildren: () =>
    import("./components/loan-transfer-team/loan-transfer/loan-transfer.module").then(
      l => l.LoanTransferModule
    )
},
  
/** Shared Module */
{
  path: "emi-calculator",
  loadChildren: () =>
    import("./components/shared/shared/emi-calculator/emi-calculator.module").then(
      e => e.EmiCalculatorModule 
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
