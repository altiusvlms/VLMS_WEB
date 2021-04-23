/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

/** Customer Enroll List Component */
@Component({
  selector: 'vlms-customer-enroll-list',
  templateUrl: './customer-enroll-list.component.html',
  styleUrls: ['./customer-enroll-list.component.scss']
})
export class CustomerEnrollListComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
    /** Create Customer Enrolment Form */
    createCustomerEnrolForms = new FormGroup({
      customerName: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.required),
      AltermobileNo: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      fatherName: new FormControl('', Validators.required),
      proof1: new FormControl('', Validators.required),
      proof2: new FormControl('', Validators.required),
    })
  ngOnInit(): void {
  }

}
