/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { DatePipe } from '@angular/common';


/** Customer Enroll List Component */
@Component({
  selector: 'vlms-customer-enroll-list',
  templateUrl: './customer-enroll-list.component.html',
  styleUrls: ['./customer-enroll-list.component.scss']
})
export class CustomerEnrollListComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private crudService: CrudService,public datepipe: DatePipe) { }
    /** Create Customer Enrolment Form */
    createCustomerEnrolForms = new FormGroup({
      applicantId: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      alternateMobileNumber: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      dateFormat: new FormControl("dd MMMM yyyy", Validators.required),
      locale: new FormControl("en", Validators.required),
      fatherName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      applicantType: new FormControl('', Validators.required),
      proof1: new FormControl('', Validators.required),
      proof2: new FormControl('', Validators.required),
    })

  ngOnInit(): void {
  }
  
enrollid:any;
   /** Save Customer Enrolment */
   saveCustomerEnrolment(){
    this.createCustomerEnrolForms.value.dob =this.datepipe.transform(this.createCustomerEnrolForms.value.dob, 'dd MMMM yyyy');
    this.crudService.post(`${appModels.ENROLL}`, this.createCustomerEnrolForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe().subscribe( data => {
      console.log(data)
      this.enrollid = data.resourceId;
    })
  }

}
