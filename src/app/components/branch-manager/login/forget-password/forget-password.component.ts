/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import {  CrudService } from '../../../../services/crud.service';
import firebase from 'firebase/app'; 
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import 'firebase/auth';
import { appModels } from 'app/services/utils/enum.util';
import { ConfirmedValidator } from './confirmed.validator';


// import * as firebase from 'firebase';


/** Forget Password Component */
@Component({
  selector: 'vlms-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  number: any;
  res: any;
  data: any;
  forgetGetnumber:any;
  constructor(private router: Router, private authentication: AuthenticationService,
    private toast: ToastrService,private crudService: CrudService,private fb: FormBuilder) {

      this.form = fb.group({
        password: ['', [Validators.required]],
        confirm_password: ['', Validators.required],
      },{
        validator: ConfirmedValidator('password', 'confirm_password')
      }
      )
     }

  ResetPaswrdform = new FormGroup({
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  })
  
  
   Mob_num = new FormGroup({
     mobileNumber: new FormControl('', )
   })
   
  
  windowRef: any;
  UsermobData:any;

  phoneNumber:any;

  

  verificationCode: string;

  user: any;
  mobile_Number:any;

  username: string;
  enterotp: number;
   
  mobdata:any;

  ngOnInit(): void {
    this.windowRef = this.authentication.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
    console.log(this.Mob_num);
    
  };


modelChanged(phoneNumber: number){
  let data = '+91'+ phoneNumber
    this.crudService.get(`${appModels.CUSTOMERS}/mobileNumber/${data}`,
       { params:{
       tenantIdentifier: "default"   
       }}
    ).subscribe( data => {
      this.forgetGetnumber = data;
    })
}

  
  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier
    const num = "+91" + this.phoneNumber;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then((result: any) => {
                this.windowRef.confirmationResult = result;

            })
            .catch( (error: any) => console.log(error) );
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
  get f(){
    return this.form.controls;
  }
   
  // submit(){
  //   console.log(this.form.value);
  // }

  submit(){
    const num = "+91" + this.phoneNumber;
    let data = {
        "mobileNo":num,
        "password":this.form.value.password,
        // "email":"Gokul@gmail.com",
        // "newMobileNo":"+917708161955"  
  }
    console.log(data);
    this.crudService.forgetPassword(data).subscribe( data => {
      console.log(data)
      this.router.navigate(["/login"]);
      this.toast.success("Updated Successfully");
    })
  }
  

}
