import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';
import {  CrudService } from '../../../../services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { appModels } from 'app/services/utils/enum.util';


@Component({
  selector: 'vlms-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({});


  constructor(private router: Router, private crudService: CrudService, private toast: ToastrService,private fb: FormBuilder) {
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
   
  submitdata(){
    this.toast.success("Updated Successfully");
  }
  
  

  ngOnInit() {
  }
  
   matchPassword() {  
    var pw1 = document.getElementById("pswd1");  
    var pw2 = document.getElementById("pswd2");  
    if(pw1 != pw2)  
    {   
      alert("Passwords did not match");  
    } else {  
      alert("Password created successfully");  
    }  
  } 
  get f(){
    return this.form.controls;
  }
   
  submit(){
    console.log(this.form.value);
  }

  submits(){
    let data = {
        "mobileNo":"1234567",
        "password":this.form.value.password,
        "email":"abcd@gmail.com",
        "newMobileNo":"567"
        
  }
    console.log(this.form.value)
    this.crudService.update(`${appModels.USERS}`,this.form.value.password,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe().subscribe( data => {
      console.log(data)
      this.toast.success("Updated Successfully");
    })
  }

}

// submits() : void {
//     if(this.Newpassword == 'admin' && this.Conformpassword == 'admin'){
//      this.router.navigate(["/login"]);
//     }else {
//       alert("Invalid credentials");
//     }
//   }

