import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'vlms-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router) { }
  Newpassword: any;
  Conformpassword: any;

  ngOnInit(): void {
  }

submit() : void {
    if(this.Newpassword == 'admin' && this.Conformpassword == 'admin'){
     this.router.navigate(["/login"]);
    }else {
      alert("Invalid credentials");
    }
  }
}
