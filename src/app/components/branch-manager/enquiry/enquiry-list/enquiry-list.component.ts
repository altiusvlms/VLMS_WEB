/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


/** Enquiry List Component */
@Component({
  selector: 'vlms-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {
  

  constructor(private router: Router,private formBuilder: FormBuilder ) { }

    /** Create Enquiry Form */
    createEnquiryForms = new FormGroup({
      customerName: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.required),
      vehicleName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    })

  ngOnInit(): void {
  }

 /** Page Navigation for Loan Application */
  createLoan(){
    this.router.navigate(['branch-manager/loan-process']);

  }
 /** Save Enquiry */
  saveEnquiry(){
    console.log(this.createEnquiryForms.value)
  }




}
