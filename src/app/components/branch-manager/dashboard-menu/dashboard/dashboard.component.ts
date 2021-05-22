/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms and Services and Router and Material Dialog */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { SharedService } from '../../../../services/shared.service';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
import { Options, LabelType } from 'ng5-slider';
@UntilDestroy({ checkProperties: true })

/** BranchManager Dashboard Component */
@Component({
  selector: 'vlms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mobileNum:any;
  showTable:Boolean = false;
  vehicledetailss:Boolean = false; 
  usedvehicle:Boolean = false;
  self:Boolean = false;

  id : any;
  filters: any;
  pemi = {
    value: "25"
  }
  remi = {
    value: "8.5"
  }
  temi = {
    value: "20"
  }
  memi = {
    value: "240"
  }

  query = {
    amount: "",
    interest: "",
    tenureYr: "",
    tenureMo: ""
  }

  result = {
    emi: "",
    interest: "",
    total: ""
  }
  yrToggel: boolean;
  poptions: Options = {
    floor: 1,
    ceil: 200,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>T</b>';
        case LabelType.High:
          return value + '<b>T</b>';
        default:
          return value + '<b>T</b>';
      }
    }
  };
  roptions: Options = {
    floor: 5,
    ceil: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>%</b>';
        case LabelType.High:
          return value + '<b>%</b>';
        default:
          return value + '<b>%</b>';
      }
    }
  };
  toptions: Options = {
    floor: 1,
    ceil: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Yr</b>';
        case LabelType.High:
          return value + '<b>Yr</b>';
        default:
          return value + '<b>Yr</b>';
      }
    }
  };
  moptions: Options = {
    floor: 1,
    ceil: 360,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Mo</b>';
        case LabelType.High:
          return value + '<b>Mo</b>';
        default:
          return value + '<b>Mo</b>';
      }
    }
  };

   TotalInterest : number;
   TotalPayable : number;
   MonthlyDue : number;




  constructor(private formBuilder: FormBuilder,private router: Router , private crudService: CrudService,private dialog: MatDialog) { this.yrToggel = true; }

  

  

  ngAfterViewInit() {
    // debugger
    this.update();
  }

  tbupdate(id : any) {
    // debugger
    if (id == 0) {
      this.pemi.value = (Number(this.query.amount) / 100000 ).toString();
    }
    else if (id == 1) {
      this.remi.value = this.query.interest;
    }
    else if (id == 2) {
      this.temi.value = this.query.tenureYr;
    }
    else if (id == 3) {
      this.memi.value = this.query.tenureMo;
    }
    this.update();
  }

  fromdate: Date;
  todate: Date;
  MonthlyCorrectDue:any;

  update() {
    // debugger
    var loanAmount = Number(this.query.amount);
    var rateOfInterest = Number(this.query.interest);
    var numberOfMonths = (this.yrToggel) ? (Number(this.query.tenureYr) * 12) : Number(this.query.tenureMo);
    // var monthlyInterestRatio = (rateOfInterest / 100) / 12;
console.log(this.fromdate);
     this.TotalInterest = (loanAmount * rateOfInterest) / 100;

     this.TotalPayable = loanAmount + this.TotalInterest;

     var MonthlyDue = this.TotalPayable / numberOfMonths;
     this.MonthlyCorrectDue = Number (Math.round(MonthlyDue))



    // this.query.amount = loanAmount.toString();
    // this.query.interest = rateOfInterest.toString();
    // if (this.yrToggel) {
    //   this.query.tenureYr = this.temi.value.toString();
    // }
    // else {
    //   this.query.tenureMo = this.memi.value.toString();
    // }

    // var top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    // var bottom = top - 1;
    // var sp = top / bottom;
    // var emi = ((loanAmount * monthlyInterestRatio) * sp);
    // var full = numberOfMonths * emi;
    // var interest = full - loanAmount;
    // var int_pge = (interest / full) * 100;

    // this.result.emi = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // this.result.total = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // this.result.interest = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DueCalc();
  }
  daydiff:any;
  delayDueAmount:any;
  totalAmt : any;
  DueCalc(){
    // debugger
     var totaltimediff =  this.todate.getTime() - this.fromdate.getTime();
      var daydiff = totaltimediff / ( 1000 * 3600 * 24);
     var interestPerYear = Number (this.query.interest) * 100 / 365;
     var dueInterest = Number (Math.round(interestPerYear))
     console.log("dueInterest")
     console.log(dueInterest)

      var delayDueAmount = dueInterest * daydiff;
      this.delayDueAmount = Number ((Math.ceil(delayDueAmount / 10) * 10))
      console.log("delayDueAmount")
      console.log(this.delayDueAmount)

     this.totalAmt = this.delayDueAmount + this.MonthlyCorrectDue



  }


  ngOnInit(): void {
    // this.mobileNumFetch()
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

  /** Advance Search Open the Dialog Model */
  advancedSearch() {
    const dialogRef = this.dialog.open(AdvancedSearch, {
      width: '100vw',
      height: '90vh',
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

@UntilDestroy({ checkProperties: true })

export class AdvancedSearch {
  /**  Advanced Search Form */
  advanceSearchForms = new FormGroup({
    accountNo: new FormControl('', Validators.required),
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

  /** Advance Search Variables */
  showSearchbtn : Boolean = true;
  customerLoanDetails : any = [];
  filterResponse:any = [];
  searchAccountNo: String = '';
  searchName: String = '';
  searchModel: String = '';
  searchVehicleNo: String = '';
  searchMobileNo: String = '';
  searchChassisNo: String = '';
  searchLoanAmount: String = '';

  constructor(public dialogRef: MatDialogRef<AdvancedSearch>, private router: Router, @Inject(MAT_DIALOG_DATA) public data:any, private crudService: CrudService,private sharedService: SharedService) {


    
  }

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
    }).pipe(untilDestroyed(this)).subscribe(data => {
      this.customerLoanDetails = data;
      console.log(this.customerLoanDetails)
    })
  }

/** Clear the Search */
  clearSearch(){
    this.advanceSearchForms.reset();
    this.showSearchbtn = true;
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
    this.showSearchbtn = false;
    for (let selectedUser of this.customerLoanDetails) {
      if(this.searchAccountNo !== '' || this.searchName !== '' || this.searchModel !== '' || this.searchVehicleNo !== '' || this.searchMobileNo !== '' || this.searchChassisNo !== ''){
      if (
        selectedUser.bankDetails.accountNumber.toLowerCase().search(this.searchAccountNo.toLowerCase()) != -1  &&
        selectedUser.customerName.toLowerCase().search(this.searchName.toLowerCase()) != -1  &&
        selectedUser.vehicleDetails.model.toLowerCase().search(this.searchModel.toLowerCase()) != -1  &&
        selectedUser.vehicleDetails.vehicleNumber.toLowerCase().search(this.searchVehicleNo.toLowerCase()) != -1 &&
        selectedUser.customerDetails.mobileNo.toLowerCase().search(this.searchMobileNo.toLowerCase()) != -1 &&
        selectedUser.vehicleDetails.chassisNumber.toLowerCase().search(this.searchChassisNo.toLowerCase()) != -1 
        // && selectedUser.loanDetailsData.loanAmount.toLowerCase().search(this.searchLoanAmount.toLowerCase()) != -1 
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
