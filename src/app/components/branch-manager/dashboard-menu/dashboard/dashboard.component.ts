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
import * as Highcharts from 'highcharts';
import {DomSanitizer} from "@angular/platform-browser";

// import * as CanvasJS from '../../../../../../node_modules/canvasjs/dist/canva';
// import * as CanvasJS from '../../../../../';
@UntilDestroy({ checkProperties: true })

/** BranchManager Dashboard Component */
@Component({
  selector: 'vlms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mobileNum:any;
  vehicledetailss:Boolean = false; 
  usedvehicle:Boolean = false;
  self:Boolean = false;

  Highcharts: typeof Highcharts = Highcharts;

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
          return value + '<b>L</b>';
        case LabelType.High:
          return value + '<b>L</b>';
        default:
          return value + '<b>L</b>';
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


   public data: any;
  dashboardData: any;
  newLoanvsClosedLoanAmount: any;
  enquiryDashboardCount:any;

  constructor(private formBuilder: FormBuilder,private router: Router , private sharedService: SharedService, private crudService: CrudService,private dialog: MatDialog) { this.yrToggel = true;
  }


  ngAfterViewInit() {
    this.update();
  }

  tbupdate(id : any) {
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
     this.TotalInterest = (loanAmount * rateOfInterest) / 100;

     this.TotalPayable = loanAmount + this.TotalInterest;

     var MonthlyDue = this.TotalPayable / numberOfMonths;
     this.MonthlyCorrectDue = Number (Math.round(MonthlyDue))

    // this.DueCalc();
  }
  daydiff:any;
  delayDueAmount:any;
  totalAmt : any;
  // DueCalc(){
  //   // debugger
  //    var totaltimediff =  this.todate.getTime() - this.fromdate.getTime();
  //     var daydiff = totaltimediff / ( 1000 * 3600 * 24);
  //    var interestPerYear = Number (this.query.interest) * 100 / 365;
  //    var dueInterest = Number (Math.round(interestPerYear))
    

  //     var delayDueAmount = dueInterest * daydiff;
  //     this.delayDueAmount = Number ((Math.ceil(delayDueAmount / 10) * 10))
     

  //    this.totalAmt = this.delayDueAmount + this.MonthlyCorrectDue



  // }


  ngOnInit(): void {
  this.dashboardStatusbar();  
  this.enquiryStatusData(); 
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
    // if (this.mobileNum) {
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      for(let mobileNo of data){
        this.mobileNum = mobileNo.customerGuarantor.mobileNumber;
        var id = mobileNo.customerGuarantor.id;
        
      }
      
    
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

  dashboardStatusbar(){
    this.crudService.get(`${appModels.DASHBOARD_STATUS}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      this.dashboardData = data;
      Highcharts.chart("newLoanvsClosedLoan", this.newLoanvsClosedLoan() );
      Highcharts.chart("amountCollection", this.newLoanvsClosedLoans() );
      this.sharedService.setLoaderShownProperty(false);
    })
  }

  enquiryStatusData(){
    this.crudService.get(`${appModels.ANALYTICS_OVERALL_DATA}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      // console.log(data);
      this.enquiryDashboardCount = data;
      this.sharedService.setLoaderShownProperty(false); 
      console.log("enquiryDashboardCount")
      console.log(this.enquiryDashboardCount)      
    })
  }

  // Demand Vs Collection Pie chart
  newLoanvsClosedLoan():any{
    let newLoan = this.dashboardData[0].newloan
    let closedLoan = this.dashboardData[0].closedloan
    
      this.newLoanvsClosedLoanAmount = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'New Loan vs Closed Loan'
      },
      tooltip: {
        pointFormat: '{series.name}: {point.y}'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}'
            // format: '<b>{point.name}</b>: {point.y:.1f}'
          }
        }
      },
      series: [{
        name: 'Count',
        colorByPoint: true,
        data: [{
          name: 'New Loan',
          y: newLoan,
          // sliced: true,
          // selected: true
          
        }, {
          name: 'Closed Loan',
          y: closedLoan,
        },
      ]
      }]
    
    }
    return this.newLoanvsClosedLoanAmount;
    }

    loanCollectedbankVsCashAmountss:any
    // Semi Doughtnut Chart
    newLoanvsClosedLoans():any{

      let bankCashCollection = this.dashboardData[0].bankCashCollection
    // let closedloan = this.dashboardData[0].closedloan

    // Highcharts.chart('newLoanvsClosedLoans', {
      this.loanCollectedbankVsCashAmountss = {      
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        text: 'Total Collection',
       
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Amount',
        innerSize: '50%',
        data: [
          // ['Chrome', 58.9],
          // ['Firefox', 13.29],
          // ['Internet Explorer', 13],
          // ['Edge', 3.78],
          // ['Safari', 3.42],
          {
            name: 'Bank Cash Collection',
            y: bankCashCollection,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y}'
            }
          },
          // {
          //   name: 'Other',
          //   y: closedloan,
          //   dataLabels: {
          //     enabled: false
          //   }
          // }
        ]
      }]
    }
    // });
    return this.loanCollectedbankVsCashAmountss;
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

  constructor(public dialogRef: MatDialogRef<AdvancedSearch>, private router: Router, @Inject(MAT_DIALOG_DATA) public data:any, private crudService: CrudService,private sharedService: SharedService,private sanitizer:DomSanitizer) {


    
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
    }).pipe(untilDestroyed(this)).subscribe(async response => {
      this.customerLoanDetails = response;

  /**Customer Image Get API */    
      await this.customerLoanDetails.map((res: any) => {
        this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${res.customerDetails.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
         this.customerImage =  this.sanitizer.bypassSecurityTrustUrl(data);
            this.allCustomerImage.push({image:this.customerImage})
            this.sharedService.setLoaderShownProperty(false);
        },error => {
          console.error(error);
          this.customerImage = 'assets/images/empty_image.png';
          this.allCustomerImage.push({image:this.customerImage} )
          this.sharedService.setLoaderShownProperty(false);
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
      if(this.searchAccountNo !== '' || this.searchName !== '' || this.searchModel !== '' || this.searchVehicleNo !== '' || this.searchMobileNo !== '' || this.searchChassisNo !== ''  || this.searchLoanAmount !== ''){
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
