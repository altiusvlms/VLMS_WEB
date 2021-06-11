/** Angular Imports */
import { Component, OnInit, Inject } from '@angular/core';

/** Custom Forms and Services and Router and Material Dialog */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { SharedService } from '../../../../services/shared.service';
import {DomSanitizer} from "@angular/platform-browser";
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })


@Component({
  selector: 'vlms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  

  constructor(private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  customerOnline(){
    this.router.navigate(['loan-transfer-team/customer-online'])
  }
  loanAmountAdded(){
    this.router.navigate(['loan-transfer-team/loan-amount-added'])
  }

/** Advance Search Open the Dialog Model */
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
 
  /** Advance Search Variables */
  customerLoanDetails : any = [];
  filterResponse:any = [];
  customerImage: any;
  allCustomerImage: any = [];
  searchAccountNo: String = '';
  searchName: String = '';
  searchModel: String = '';
  searchVehicleNo: String = '';
  searchMobileNo: String = '';
  searchChassisNo: String = '';
  searchLoanAmount: String = '';

  constructor(public dialogRef: MatDialogRef<AdvancedSearch>, private router: Router, @Inject(MAT_DIALOG_DATA) public data:any, private crudService: CrudService,private sharedService: SharedService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.getCustomerDetails();
  }
  ngOnDestroy() {}

  /** Get the Customer Details */
  getCustomerDetails(){
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {
      this.customerLoanDetails = response;
      console.log(this.customerLoanDetails)
        /**Customer Image Get API */    
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
  }

/** Clear the Search */
  clearSearch(){
    this.advanceSearchForms.reset();
    this.getCustomerDetails();
    this.searchAccountNo = '';
    this.searchName = '';
    this.searchModel = '';
    this.searchVehicleNo = '';
    this.searchMobileNo = '';
    this.searchChassisNo = '';
    this.searchLoanAmount = '';
  }

/** Close the Dialog Model */
  close() {
    this.dialogRef.close();
  }

/** Filter for All Input Values */
  applyFilter(value : any , string_val: any){
     if(string_val == 'accountNumber'){
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

  /** Search for Filtered data */
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

}