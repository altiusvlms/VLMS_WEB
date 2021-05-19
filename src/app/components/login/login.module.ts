/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { LoginRoutingModule } from './login-routing.module';

/** Custom Material Module */
import { SharedModule } from '../shared/shared/shared.module';

/** Custom Components */
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

/** Login Module */

@NgModule({
  declarations: [LoginComponent,ForgetPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
