/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import { appModels } from '../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';

/** Login Component */
@Component({
  selector: 'vlms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  

  constructor(private router: Router, private _auth:AuthenticationService,private toast: ToastrService) { }

  createLoginForms = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })


  loginUserdata = {};

  username: string;
password: string;

  ngOnInit(): void {
  }
     
    loginusers(){
    // this.toast.success("Created Successfully");

    console.log(this.createLoginForms.value)
    this._auth.post(`${appModels.COMMON}/authentication`, this.createLoginForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe().subscribe( data => {
      console.log(data)
      this.toast.success("Created Successfully");
    })
  }
    
    loginUser(){
             this._auth.loginUser(this.loginUserdata)
             .subscribe(
               res => console.log(res),
               err => console.log(err)
             )

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

