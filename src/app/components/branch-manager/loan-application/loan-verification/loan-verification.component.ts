import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {DomSanitizer} from "@angular/platform-browser";

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })


@Component({
  selector: 'mifosx-loan-verification',
  templateUrl: './loan-verification.component.html',
  styleUrls: ['./loan-verification.component.scss']
})
export class LoanVerificationComponent implements OnInit {

  showAdvanceSearch: any;
  // id:any;

   /**  Advanced Search Form */
   advanceSearchForms = new FormGroup({
    loanNo: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    vehiclemodel: new FormControl('', Validators.required),
    vehicleNo: new FormControl('', Validators.required),
    customerMobileNo: new FormControl('', Validators.required),
    loanAmount: new FormControl('', Validators.required),
    chassisNo: new FormControl('', Validators.required),
    idProof: new FormControl('', Validators.required),
    // area: new FormControl('', Validators.required),
    // dealer: new FormControl('', Validators.required),
    // loanstatus: new FormControl('', Validators.required),
    // dues: new FormControl('', Validators.required)
  })
 
    showSearchbtn : Boolean = true;
    customerLoanDetails : any = [];
    customerDetailsfilter: any = [];
    customer_name : any;
    vehicle_no : any;
    vehicle_modal : any;
    chassis_no : any;
    customerImage: any = [];

  constructor(private router: Router,private crudService: CrudService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getLoanVerification();
  }

  ngOnDestroy() { }


  loanProcess(id : any) {
    this.router.navigate(['branch-manager/loan-process/'  + id]);
  }
  getLoanVerification(){
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.customerLoanDetails = data;
      this.customerDetailsfilter = data;
    })
  }

  advancedSearch() {
  this.showAdvanceSearch = true;
  }
  search(filters: any): void {
    console.log(filters)
    this.showSearchbtn = false;
    this.customer_name = filters.customerName;
    this.vehicle_no = filters.vehicleNo;
    this.vehicle_modal = filters.vehiclemodel;
    this.chassis_no = filters.chassisNo;
    console.log(  this.chassis_no,this.vehicle_modal,this.vehicle_no,this.customer_name)
   if(this.customer_name !== null || undefined && this.vehicle_modal !== null || undefined && this.vehicle_no !== null || undefined && this.chassis_no !== null || undefined){

    for(let i=0; i< this.customerDetailsfilter.length; i++) {
      if(
          (this.customer_name == "" || this.customer_name == this.customerDetailsfilter[i].customerName) &&
          (this.vehicle_no == "" || this.vehicle_no == this.customerDetailsfilter[i].vehicleDetails.vehicleNumber) &&
          (this.vehicle_modal == "" || this.vehicle_modal == this.customerDetailsfilter[i].vehicleDetails.model) &&
          (this.chassis_no == "" || this.chassis_no == this.customerDetailsfilter[i].vehicleDetails.chassisNumber) 
        ) 
        {
        this.customerLoanDetails.push(this.customerDetailsfilter[i]);
        console.log(this.customerLoanDetails)
      }
      else {
        this.customerLoanDetails = [];
      }
    } 
  }
  else{
    this.getLoanVerification();
  }
  }


  clearSearch(){
    this.advanceSearchForms.reset();
    this.showSearchbtn = true;
    this.getLoanVerification();
  }

  close() {
    this.showAdvanceSearch = false;
  }

}
