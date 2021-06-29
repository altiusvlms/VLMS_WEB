/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Forms and Services and Router */ 
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
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
  
  hide = true;
  
  constructor(private router: Router, private _auth:AuthenticationService,private toast: ToastrService, private crudService: CrudService) { }

/**Login Forms */
  createLoginForms = new FormGroup({
    username: new FormControl('+91', Validators.required),
    password: new FormControl('', Validators.required),
  })

    ngOnInit(): void {
    }
     
/** User Login */    
    loginusers(){
    this._auth.post(`${appModels.COMMON}/authentication`, this.createLoginForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe().subscribe( response => {
      console.log(response)
        if (response.roles[0].name === "BranchManager") {
          this.router.navigate(["/branch-manager/dashboard"]);
        }else if (response.roles[0].name === "Cashier") {
          this.router.navigate(["/cashier/dashboard"]);
        }else if (response.roles[0].name === "LoanTransfer") {
          this.router.navigate(["/loan-transfer-team/dashboard"]);
        }else if (response.roles[0].name === "Super user") {
          this.router.navigate(["/super-admin/dashboard"]);
        }
      
          localStorage.setItem('mobile_number', response.username);
          localStorage.setItem('roles', response.roles[0].name);
          this.toast.success("Login Successfully");
    }, error => {
      this.toast.error('Something Went Wrong')
    })
  }

/** User Forget Password */   
  forgotPassword(){
  this.router.navigate(["/forget-password"]);
}

get passwordInput() { 
  return this.createLoginForms.get('password'); 
}  
msg = '';

handleSubmit(e : any){
  e.preventDefault();
  // alert(this.msg);
}

handleKeyUp(e : any){
   if(e.keyCode === 13){
      this.handleSubmit(e);
   }
}


}