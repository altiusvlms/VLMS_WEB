/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

// Custom Forms
import {  CrudService } from '../../../services/crud.service';
import { appModels } from '../../../services/utils/enum.util';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';



/** Login Component */
@Component({
  selector: 'vlms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  

  constructor(private router: Router, private _auth:AuthenticationService,private toast: ToastrService, private crudService: CrudService) { }

  createLoginForms = new FormGroup({
    username: new FormControl('+91', Validators.required),
    password: new FormControl('', Validators.required),
  })

  user_name = this.createLoginForms.value.username;
  data :any = [];
  
  // data:any;
  rolebase: any;
  loginUserdata = {};
  UsermobData:any;

  username: string;
password: string;

  ngOnInit(): void {
  }
     
    loginusers(){
    // this.toast.success("Created Successfully");

    console.log(this.createLoginForms.value)
    console.log(this.user_name)
    this._auth.post(`${appModels.COMMON}/authentication`, this.createLoginForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe().subscribe( response => {
      console.log(response)
      console.log(response.roles[0].name)
      if (response.roles[0].name === "BranchManager") {
        this.router.navigate(["/branch-manager/dashboard"]);
     }else if (response.roles[0].name === "Cashier") {
      
       this.router.navigate(["/cashier/dashboard"]);
     }
      
          localStorage.setItem('mobile_number', response.username);
          console.log("mobile_number")
          console.log(response.username)

          localStorage.setItem('roles', response.roles[0].name);
          console.log("roles")
          console.log(response.roles[0].name)

          this.toast.success("Login Successfully");

      // this.router.navigate(["/branch-manager/dashboard"]);
    }, error => {
      this.toast.error('Something Went Wrong')
    }
    
    )
    // this.toast.error("Please enter correct username");
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