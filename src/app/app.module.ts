/** Angular Imports */
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Custom Interceptor and Services */
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/core/auth.interceptor';
import { ErrorInterceptor } from './services/core/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Main Component */
import { WebAppComponent } from './web-app.component';

/** Main Routing Module */
import { AppRoutingModule } from './app-routing.module';


/** Custom Module */
import { SharedModule } from './components/shared/shared/shared.module';

/** Custom Toaster and Datepipe */
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

/** Custom Fire Base Module */
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CreateReceiptComponent } from './components/cashier/create-receipt/create-receipt.component';
import { YetToReceiptComponent } from './components/cashier/yet-to-receipt/yet-to-receipt.component';

/** Custom Fire Base Config */
const firebaseConfig = {
  apiKey: "AIzaSyA-oOVkeahih3FnlMhC7BcwU9sYv7vAGMY",
  authDomain: "angularfinanceapp.firebaseapp.com",
  projectId: "angularfinanceapp",
  storageBucket: "angularfinanceapp.appspot.com",
  messagingSenderId: "1032938783466",
  appId: "1:1032938783466:web:db274506677f3dbdc34d93",
  measurementId: "G-DT6DFHCKFC"
}


/**
 * App Module */

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      tapToDismiss: true
    }), // ToastrModule added
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule, 
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [WebAppComponent, CreateReceiptComponent, YetToReceiptComponent],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe],
  bootstrap: [WebAppComponent]
})
export class AppModule { }
