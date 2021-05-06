/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

/** Custom Material and Form Module */
import { SharedModule } from '../shared/shared/shared.module';

/** Custom Components */
import { PageNotFoundComponent } from './page-not-found.component';

/** Page Not Found Module */

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    SharedModule
  ]
})
export class PageNotFoundModule { }
