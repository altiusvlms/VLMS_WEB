/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { SharedService } from '../../../../services/shared.service';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Dashboard Component */
@Component({
  selector: 'vlms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showTable:Boolean = false;
  vehicledetailss:Boolean = false; 
  usedvehicle:Boolean = false;
  self:Boolean = false;

  constructor(private formBuilder: FormBuilder,private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  customer(){
    this.router.navigate(['branch-manager/customer-management']);
  }
  enquiry(){
    this.router.navigate(['branch-manager/enquiry-list']);
  }
  customerEntrol(){
    this.router.navigate(['branch-manager/customer-enroll-list']);
  }
  newLoan(){
    this.router.navigate(['branch-manager/loan-process']);
  }
  loanVerification(){
    this.router.navigate(['branch-manager/loan-verification']);
  }
  vehicledetail(){
    this.router.navigate(['branch-manager/newloan-process']);
  }


  advancedSearch() {
    const dialogRef = this.dialog.open(AdvancedSearch, {
      width: '100vw',
      height: '90vh',
    });
  }
}




@Component({
  selector: 'vlms-dashboard',
  templateUrl: './advancedsearch.component.html',
  styleUrls: ['./dashboard.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class AdvancedSearch {
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

  constructor(public dialogRef: MatDialogRef<AdvancedSearch>, private router: Router, @Inject(MAT_DIALOG_DATA) public data:any, private crudService: CrudService,private sharedService: SharedService) {

  }

  ngOnInit() {
    this.getLoanDetails();
  }
  ngOnDestroy() {}

  getLoanDetails(){
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      this.customerLoanDetails = data;
      this.customerDetailsfilter =  this.customerLoanDetails;
    })
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
    this.getLoanDetails();
  }
  }


  clearSearch(){
    this.advanceSearchForms.reset();
    this.showSearchbtn = true;
    this.getLoanDetails();
  }

  close() {
    this.dialogRef.close();
  }


}
