/** Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Custom Module */
import { RouterModule } from '@angular/router';

/** Custom Components */
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';


/** Shared Module */

@NgModule({
  declarations: [SharedComponent,HeaderComponent, SidebarComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SharedComponent,HeaderComponent,SidebarComponent,LoaderComponent],
})
export class SharedModule { }
