import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';


// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-newloan-process',
  templateUrl: './newloan-process.component.html',
  styleUrls: ['./newloan-process.component.scss']
})
export class NewloanProcessComponent implements OnInit {

  loan_Id:any;
  resource_Id:any;  
  customer_Id:any;
  guarantor_Id:any;
  bankDetails_Id:any;

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute) { }

  mobile_num = localStorage.getItem("mobile_number");

  applicantDetailsForm = new FormGroup({
    spouseName: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    maritalStatus: new FormControl('', Validators.required),
    
    })

    coapplicantDetailsForm = new FormGroup({
      mobileNumber: new FormControl('', Validators.required),
      })

  vehicleDetailsForm = new FormGroup({
    vehicleNumber: new FormControl('', Validators.required),
    maker: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    mfgyear: new FormControl('', Validators.required),
    engineNumber: new FormControl('', Validators.required),
    chassis_number: new FormControl('', Validators.required),
    insuranceCompany: new FormControl('', Validators.required),
    insurancePolicy: new FormControl('', Validators.required),
    insuranceExpiry: new FormControl('', Validators.required),
    kmReading: new FormControl('', Validators.required),
    noofOwner: new FormControl('', Validators.required)
    })


  ngOnInit(): void {
    // this.getUserId();
    // this.saveNewLoan();
    
  }

  getUserId(){
    this.crudService.get(`${appModels.USERS}/${this.mobile_num}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
    })
  }

  saveNewLoan(){
    console.log(this.vehicleDetailsForm.value)
    console.log(this.applicantDetailsForm.value)
    console.log(this.coapplicantDetailsForm.value)
  }

  newLoanCustomerDetails(){
    this.crudService.post(`${appModels.NEWLOAN}`,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      console.log(data)
      // console.log(this.mobile_num)
      this.loan_Id = data.loanId;
      this.resource_Id = data.resourceId;
      this.customer_Id = data.customerId;
      this.guarantor_Id = data.guarantorId;
      this.bankDetails_Id = data.bankDetailsId;
    })
  }

}
