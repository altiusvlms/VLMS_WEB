/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })


/** Dashboard Component */
@Component({
  selector: 'vlms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mobileNum:any;
  showTable:Boolean = false;
  

  constructor(private formBuilder: FormBuilder,private router: Router , private crudService: CrudService,private dialog: MatDialog) { }

  /** Create Advanced Search Form */
  createAdvanceSearchForms = new FormGroup({
    loanNo: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    vehiclemodel: new FormControl('', Validators.required),
    vehicleNo: new FormControl('', Validators.required),
    customerMobileNo: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    dealer: new FormControl('', Validators.required),
    idProof: new FormControl('', Validators.required),
    loanAmount: new FormControl('', Validators.required),
    GovtId: new FormControl('', Validators.required),
    ChassisNo: new FormControl('', Validators.required),
    loanstatus: new FormControl('', Validators.required),
    dues: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    // this.mobileNumFetch()
  }
  vehicledetailss:Boolean = false; 
  usedvehicle:Boolean = false;
  self:Boolean = false;
  

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
  
    dialogRef.afterClosed().subscribe((data : any) => {
      // if (data) {
      // }
    });
  }
  
  mobileNumFetch(mobile : any){
    console.log(mobile)
    // if (this.mobileNum) {
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      for(let mobileNo of data){
        this.mobileNum = mobileNo.customerGuarantor.mobileNumber;
        var id = mobileNo.customerGuarantor.id;
        
      }
      
      console.log("mobilenum")
      console.log(this.mobileNum)
      
      if (this.mobileNum) {
        this.router.navigate(['branch-manager/loan-process/'  + id]);
      }
      else {
    this.router.navigate(['branch-manager/newloan-process']);
  }
    })
  // }
  // else {
    // this.router.navigate(['branch-manager/newloan-process']);
  // }
  }

}








@Component({
  selector: 'vlms-dashboard',
  templateUrl: './advancedsearch.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class AdvancedSearch {
  /** Create Advanced Search Form */
  createAdvanceSearchForms = new FormGroup({
    loanNo: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    vehiclemodel: new FormControl('', Validators.required),
    vehicleNo: new FormControl('', Validators.required),
    customerMobileNo: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    dealer: new FormControl('', Validators.required),
    idProof: new FormControl('', Validators.required),
    loanAmount: new FormControl('', Validators.required),
    GovtId: new FormControl('', Validators.required),
    ChassisNo: new FormControl('', Validators.required),
    loanstatus: new FormControl('', Validators.required),
    dues: new FormControl('', Validators.required)
  })
 
  
  constructor(public dialogRef: MatDialogRef<AdvancedSearch>, private router: Router , private crudService: CrudService, @Inject(MAT_DIALOG_DATA) public data:any, 
   ) {

  }



  mobileNum :any;

  ngOnInit() {
    // this.mobileNumFetch();
  }
  ngOnDestroy() {}

    close() {
      this.dialogRef.close();
    }

    // mobileNumFetch(){
    //   if (this.mobileNum) {
    //   this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
    //     params: {
    //       tenantIdentifier: 'default'
    //     }
    //   }).pipe(untilDestroyed(this)).subscribe(data => {
    //     console.log(data);
    //     this.mobileNum = data.customerGuarantor.mobileNumber;
    //     console.log("mobilenum")
    //     console.log(this.mobileNum)
    //     this.router.navigate(['branch-manager/loan-process']);
    //   })
    // }
    // else {
    //   this.router.navigate(['branch-manager/newloan-process']);
    // }
    // }

}
