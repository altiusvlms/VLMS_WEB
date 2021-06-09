import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {DomSanitizer} from "@angular/platform-browser";
import { DatePipe } from '@angular/common';

import { Observable, forkJoin } from 'rxjs';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })


@Component({
  selector: 'vlms-loan-verification',
  templateUrl: './loan-verification.component.html',
  styleUrls: ['./loan-verification.component.scss']
})
export class LoanVerificationComponent implements OnInit {


   /**  Advanced Search Form */
   advanceSearchForms = new FormGroup({
    accountNo: new FormControl(''),
    customerName: new FormControl(''),
    vehiclemodel: new FormControl(''),
    vehicleNo: new FormControl(''),
    customerMobileNo: new FormControl(''),
    loanAmount: new FormControl(''),
    chassisNo: new FormControl(''),
    idProof: new FormControl(''),
    // area: new FormControl(''),
    // dealer: new FormControl(''),
    // loanstatus: new FormControl(''),
    // dues: new FormControl('')
  })

    showAdvanceSearch: any;
    customerLoanDetails : any = [];
    customerImage: any;
    allCustomerImage: any = [];
    loanTypeDetails: any;
    filterResponse:any = [];
    searchAccountNo: String = '';
    searchName: String = '';
    searchModel: String = '';
    searchVehicleNo: String = '';
    searchMobileNo: String = '';
    searchChassisNo: String = '';
    searchLoanAmount: String = '';


  constructor(private router: Router,private crudService: CrudService,private sanitizer:DomSanitizer,public datepipe: DatePipe) { }


  ngOnInit(): void {
    this.getLoanVerification();
    this.getLoanType();
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
    }).pipe(untilDestroyed(this)).subscribe(async respose => {
      this.customerLoanDetails = respose;

      await this.customerLoanDetails.map((res: any) => {
        this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${res.customerDetails.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
         this.customerImage =  this.sanitizer.bypassSecurityTrustUrl(data);
            this.allCustomerImage.push({image:this.customerImage})
        },error => {
          console.error(error);
          this.customerImage = 'assets/images/empty_image.png';
          this.allCustomerImage.push({image:this.customerImage} )
       });
    })
    })
    this.allCustomerImage = [];
  }

  getLoanType(){
    this.crudService.get(`${appModels.APPROVEL}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async respose => {
     await respose.pageItems.map((res: any) => {
       this.loanTypeDetails = res.loanType;
        })
    });
  }

  advancedSearch() {
  this.showAdvanceSearch = true;
  }


  applyFilter(value : any , string_val: any){
     if(string_val == 'accountnumber'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchAccountNo = filterValue.trim().toLowerCase();
    }
   else if(string_val == 'name'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchName = filterValue.trim().toLowerCase();
    }
   else if(string_val == 'model'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchModel = filterValue.trim().toLowerCase();
    }
    else if(string_val == 'vehicleno'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchVehicleNo = filterValue.trim().toLowerCase();
    }
    else if(string_val == 'mobileno'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchMobileNo = filterValue.trim().toLowerCase();
    }
    else if(string_val == 'chassisno'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchChassisNo = filterValue.trim().toLowerCase();
    }
    else if(string_val == 'loanamount'){
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchLoanAmount = filterValue.trim().toLowerCase();
    }
   
  }
  searchdata(){
    for (let selectedUser of this.customerLoanDetails) {
       /** loanAmount type of Number */
      let loanAmount = selectedUser.loanDetailsData.loanAmount;
       /** LoanAmount Values convert Number to String */
      let LoanAmount = loanAmount.toString();
      if(this.searchAccountNo !== '' || this.searchName !== '' || this.searchModel !== '' || this.searchVehicleNo !== '' || this.searchMobileNo !== '' || this.searchChassisNo !== '' || this.searchLoanAmount !== ''){
      if (
        selectedUser.bankDetails.accountNumber.toLowerCase().search(this.searchAccountNo.toLowerCase()) != -1  &&
        selectedUser.customerName.toLowerCase().search(this.searchName.toLowerCase()) != -1  &&
        selectedUser.vehicleDetails.model.toLowerCase().search(this.searchModel.toLowerCase()) != -1  &&
        selectedUser.vehicleDetails.vehicleNumber.toLowerCase().search(this.searchVehicleNo.toLowerCase()) != -1 &&
        selectedUser.customerDetails.mobileNo.toLowerCase().search(this.searchMobileNo.toLowerCase()) != -1 &&
        selectedUser.vehicleDetails.chassisNumber.toLowerCase().search(this.searchChassisNo.toLowerCase()) != -1 
        && LoanAmount.toLowerCase().search(this.searchLoanAmount.toLowerCase()) != -1 
      ){
          this.filterResponse.push(selectedUser)
      }
    }
    }
  
    if(this.filterResponse.length >0){
      this.customerLoanDetails = this.filterResponse;
      this.filterResponse = [];
    }
    else if(this.filterResponse.length == 0){
      this.customerLoanDetails = [];
    }
    
  }

  clearSearch(){
    this.advanceSearchForms.reset();
    this.searchAccountNo = '';
    this.searchName = '';
    this.searchModel = '';
    this.searchVehicleNo = '';
    this.searchMobileNo = '';
    this.searchChassisNo = '';
    this.searchLoanAmount = '';
    this.getLoanVerification();
  }

  close() {
    this.showAdvanceSearch = false;
  }

}
