/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

/** Custom Components */
import { PageNotFoundComponent } from './page-not-found.component';

/** Page Not Found Module */

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule { }
