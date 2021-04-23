/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


/** Login Component */
@Component({
  selector: 'vlms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  

  constructor(private router: Router) { }

  username: string;
password: string;

  ngOnInit(): void {
  }

  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
     this.router.navigate(["/branch-manager/dashboard"]);
    }else {
      alert("Invalid credentials");
    }
  }
  forgotPassword(){
    this.router.navigate(["/forget-password"]);
  }
  // moveToSelectedTab(tabName: string) {
  //   for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
  //   if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) 
  //      {
  //         (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
  //      }
  //    }
  // }
}

