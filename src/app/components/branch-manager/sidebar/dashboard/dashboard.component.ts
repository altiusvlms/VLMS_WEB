/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

/** Dashboard Component */
@Component({
  selector: 'vlms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showTable:Boolean = false;

  constructor(private formBuilder: FormBuilder,private router: Router) { }

  /** Create Advanced Search Form */
  createAdvanceSearchForms = new FormGroup({
    branch: new FormControl('', Validators.required),
    loanNo: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    vehicleNo: new FormControl('', Validators.required),
    customerMobileNo: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    coApplicantMobileName: new FormControl('', Validators.required),
    coApplicantMobileNo: new FormControl('', Validators.required),
    GovtId: new FormControl('', Validators.required),
    dealer: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  advancedSearch(){
  this.showTable = true;
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
}
