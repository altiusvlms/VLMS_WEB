/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Component */
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

/** Login Routes */
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forget-password', component: ForgetPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },

];


/**
 * Login Routing Module */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
