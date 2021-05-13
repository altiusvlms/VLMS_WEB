import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {DomSanitizer} from "@angular/platform-browser";
import { DatePipe } from '@angular/common';


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })


@Component({
  selector: 'vlms-loan-verification',
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

  constructor(private router: Router,private crudService: CrudService,private sanitizer:DomSanitizer,public datepipe: DatePipe) { }
  loanverifiData:any;
  loanDisburalData:any;
  loanApprovalData:any;
  // id:any;


  ngOnInit(): void {
    this.getLoanVerification();
    this.Loan_Disbural_Limit();
    this.Loan_Approval_Limit();
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
      // this.customerDetailsfilter = data;
    })
  }

  advancedSearch() {
  this.showAdvanceSearch = true;
  }
  // search(filters: any): void {
  //   console.log(filters)
  //   this.showSearchbtn = false;
  //   this.customer_name = filters.customerName;
  //   this.vehicle_no = filters.vehicleNo;
  //   this.vehicle_modal = filters.vehiclemodel;
  //   this.chassis_no = filters.chassisNo;
  //   console.log(  this.chassis_no,this.vehicle_modal,this.vehicle_no,this.customer_name)
  //  if(this.customer_name !== null || undefined && this.vehicle_modal !== null || undefined && this.vehicle_no !== null || undefined && this.chassis_no !== null || undefined){

  //   for(let i=0; i< this.customerDetailsfilter.length; i++) {
  //     if(
  //         (this.customer_name == "" || this.customer_name == this.customerDetailsfilter[i].customerName) &&
  //         (this.vehicle_no == "" || this.vehicle_no == this.customerDetailsfilter[i].vehicleDetails.vehicleNumber) &&
  //         (this.vehicle_modal == "" || this.vehicle_modal == this.customerDetailsfilter[i].vehicleDetails.model) &&
  //         (this.chassis_no == "" || this.chassis_no == this.customerDetailsfilter[i].vehicleDetails.chassisNumber) 
  //       ) 
  //       {
  //       this.customerLoanDetails.push(this.customerDetailsfilter[i]);
  //       console.log(this.customerLoanDetails)
  //     }
  //     else {
  //       this.customerLoanDetails = [];
  //     }
  //   } 
  // }
  // else{
  //   this.getLoanVerification();
  // }
  // }
  searchLoanNo: any;
  searchName: any;
  searchModel: any;
  searchVehicleNo: any;
  searchMobileNo: any;
  searchChassisNo: any;
  searchLoanAmount: any;

  applyFilter(value : any , val: any){
    console.log(value);
    console.log(val);
     if(val == 'loannumber'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchLoanNo = filterValue.trim().toLowerCase();
    }
   else if(val == 'name'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchName = filterValue.trim().toLowerCase();
    }
   else if(val == 'model'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchModel = filterValue.trim().toLowerCase();
    }
    else if(val == 'vehicleno'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchVehicleNo = filterValue.trim().toLowerCase();
    }
    else if(val == 'mobileno'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchMobileNo = filterValue.trim().toLowerCase();
    }
    else if(val == 'chassisno'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchChassisNo = filterValue.trim().toLowerCase();
    }
    else if(val == 'loanamount'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchLoanAmount = filterValue.trim().toLowerCase();
    }
   
  }
  // filteredUserList: any = [];
  showTable:Boolean = false;
  customerLoanDetailss: any;
  res:any = [];
  searchdata(){
    console.log( this.searchLoanNo,this.searchName,this.searchModel,this.searchVehicleNo,this.searchMobileNo,this.searchChassisNo,this.searchLoanAmount);
    for (let selectedUser of this.customerLoanDetails) {
      console.log(selectedUser)
      if (selectedUser.loanDetailsData.loanAmount.toLowerCase().search(this.searchLoanNo.toLowerCase()) != -1 || selectedUser.customerName.toLowerCase().search(this.searchName.toLowerCase()) != -1){
        // selectedUser.lastName.toLowerCase().search(this.searchVal.toLowerCase()) != -1) {
          this.res.push(selectedUser)
      }
    }
    console.log(this.res)
    if(this.res.length >0){
      this.customerLoanDetails = this.res;
      this.res = [];
    }
    else if(this.res.length == 0){
      this.customerLoanDetails = [];
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

  Loan_Disbural_Limit(){
    this.crudService.get(`${appModels.Employee}/getLoanDisbursal`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.loanDisburalData = data;
    })
  }

  Loan_Approval_Limit(){
    this.crudService.get(`${appModels.Employee}/getLoanApproval`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.loanApprovalData = data;
    })
  }
}
