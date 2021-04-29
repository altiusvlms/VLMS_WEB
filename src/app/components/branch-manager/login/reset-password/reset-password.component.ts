import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
// import { ConfirmedValidator } from './confirmed.validator';
import {  CrudService } from '../../../../services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { appModels } from 'app/services/utils/enum.util';


@Component({
  selector: 'vlms-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {



  constructor(private router: Router, private crudService: CrudService, private toast: ToastrService) { }

    ResetPaswrdform = new FormGroup({
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
    })
   
  // submit(){
  //   console.log(this.form.value);
  // }
  
  

  ngOnInit() {
  }

  submit(){
    let data = {
        "mobileNo":"1234567",
        "password":this.ResetPaswrdform.value.password,
        "email":"abcd@gmail.com",
        "newMobileNo":"567"
        
  }
    console.log(this.ResetPaswrdform.value)
    this.crudService.update(`${appModels.USERS}`,this.ResetPaswrdform.value.password,
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

