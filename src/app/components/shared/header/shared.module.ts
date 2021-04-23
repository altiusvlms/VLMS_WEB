/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { SharedRoutingModule } from './shared-routing.module';

/** Custom Components */
import { HeaderComponent } from './header.component';

/** Shared Module */

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
