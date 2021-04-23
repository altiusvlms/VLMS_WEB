/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


/** Forget Password Component */
@Component({
  selector: 'vlms-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private router: Router) { }
  username: string;
  enterotp: number;

  ngOnInit(): void {
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

}
