/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


/** Dashboard Component */
@Component({
  selector: 'vlms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showTable:Boolean = false;

  constructor(private formBuilder: FormBuilder,private router: Router,private dialog: MatDialog) { }

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
 
  
  constructor(public dialogRef: MatDialogRef<AdvancedSearch>, private router: Router, @Inject(MAT_DIALOG_DATA) public data:any, 
   ) {

  }



 

  ngOnInit() {
  }
  ngOnDestroy() {}

    close() {
      this.dialogRef.close();
    }


}
