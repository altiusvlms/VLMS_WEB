/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
// import { SharedRoutingModule } from './shared-routing-module';
import { RouterModule } from '@angular/router';

/** Custom Components */
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';


/** Shared Module */

@NgModule({
  declarations: [SharedComponent,HeaderComponent],
  imports: [
    CommonModule,
    // SharedRoutingModule,
    RouterModule
  ],
  exports: [SharedComponent,HeaderComponent],
})
export class SharedModule { }
