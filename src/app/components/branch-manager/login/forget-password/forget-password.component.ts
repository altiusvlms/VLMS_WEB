/** Angular Imports */
import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import {  CrudService } from '../../../../services/crud.service';
import firebase from 'firebase/app'; 
import { FormGroup, FormControl, Validators} from '@angular/forms';
import 'firebase/auth';
import { appModels } from 'app/services/utils/enum.util';
// import * as firebase from 'firebase';


/** Forget Password Component */
@Component({
  selector: 'vlms-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
 
  constructor(private router: Router, private authentication: AuthenticationService,private toast: ToastrService,private crudService: CrudService) { }
  ResetPaswrdform = new FormGroup({
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  })
  windowRef: any;
  UsermobData:any;

  phoneNumber:any;

  verificationCode: string;

  user: any;

  username: string;
  enterotp: number;

  mobdata:any;

  ngOnInit(): void {
    this.windowRef = this.authentication.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
    this.crudService.get(`${appModels.USERS}`, {
      params: {
               tenantIdentifier: 'default'
      }
    }).pipe().subscribe(data => {
      console.log(data);
      this.UsermobData = data;
      this.username = data;
      console.log(this.username);
    })
  }
  
  submit() : void {
    if(this.username == 'admin' && this.enterotp == 12345){
     this.router.navigate(["/reset-password"]);
    }else {
      alert("Invalid credentials");
    }
  }
  ResendOTP(){
    this.router.navigate(["/forget-password"]);
  }
  

  sendLoginCode() {
    

    const appVerifier = this.windowRef.recaptchaVerifier;
    console.log(appVerifier)


    const num = "+91" + this.phoneNumber;
    console.log(num)
    console.log(this.UsermobData);
  // if(this.UsermobData.username === this.phoneNumber){  
  
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then((result: any) => {
                this.windowRef.confirmationResult = result;
                console.log(result)

            })
            .catch( (error: any) => console.log(error) );

  // }
}

  verifyLoginCode()  {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( (result: { user: any; }) => {

                    this.user = result.user;
                    this.router.navigate(["/forget-password"]);

    })
    .catch( (error: any) => console.log(error, "Incorrect code entered?"));
    // this.toast.warning("Please enter correct verification code");

  }

  submitdata(){
          this.router.navigate(["/login"]);
  //   let data = {
  //       "mobileNo":"",
  //       "password":this.ResetPaswrdform.value.password,
        
  // }
  //   console.log(this.ResetPaswrdform.value)
  //   this.crudService.update(`${appModels.USERS}`,this.ResetPaswrdform.value.password,
  //     { params:{
  //       tenantIdentifier: "default"   
  //     }}
  //   ).pipe().subscribe( data => {
  //     console.log(data)
  //     this.toast.success("Updated Successfully");
  //   })
  // }
  }

}
