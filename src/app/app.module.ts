/** Angular Imports */
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/** Translation Imports */
import { TranslateModule } from '@ngx-translate/core';


/** Main Component */
import { WebAppComponent } from './web-app.component';


/** Main Routing Module */
import { AppRoutingModule } from './app-routing.module';

/**
 * App Module
 *
 * Core module and all feature modules should be imported here in proper order.
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [WebAppComponent],
  providers: [],
  bootstrap: [WebAppComponent]
})
export class AppModule { }
