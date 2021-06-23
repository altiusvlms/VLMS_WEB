import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute,Params } from '@angular/router';
import {  CrudService } from '../../../../../services/crud.service';
import { appModels } from '../../../../../services/utils/enum.util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DomSanitizer} from "@angular/platform-browser";
import { SharedService } from '../../../../../services/shared.service';

import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {

  

  constructor(private router: Router,private crudService: CrudService,private dialog: MatDialog,private route: ActivatedRoute, private sanitizer:DomSanitizer,private toast: ToastrService, public datepipe: DatePipe,private sharedService: SharedService) { }
  id: any;
  getCustomerLoanDetails: any = [];
  customerImage: any;
  receiptData : any;
  loanType:any;
  transactions: any = [];
  fromdate: any;
  dueDate: any;
  loanIDbyMobile:any = [];
  loanIDMob:any = [];
  startDate:any;
  endDate:any;
  delayDays:any;
  // dates: any;
  loanRepayment:any;
  delayAmount:any;
  startPay:any = [];
  calAmt:any = [];
  Topup : any;
  printData: any;
  arrayOfPrint: any = [];

  loanRepaymentForm = new FormGroup({
    paymentTypeId: new FormControl('', Validators.required),
    transactionAmount: new FormControl('', Validators.required),
    transactionDate:new FormControl('', Validators.required),
    locale:new FormControl('en', Validators.required),
    dateFormat:new FormControl('dd MMMM yyyy', Validators.required),   
  })

  

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
     if(this.id !== undefined || null){
      this.getReceipt();
      
     }
     else{
      this.viewPopUp();
     }
    })
    // this.getLoanId();
    this.getCreateReceipt();
    // getCreateReceipt
  }
  
  viewPopUp(){
      const dialogRef = this.dialog.open(SearchReceipt, {
        width: '50vw',
        height: '50vh',
      });   
      dialogRef.afterClosed().subscribe((response : any) => {
      });     
    }
    loanID: any;
  getReceipt(){
    this.crudService.get(`${appModels.CUSTOMERS}/loanByLoanId/${this.id}`, {
      params: {
        tenantIdentifier: 'default'  
      }
      }).pipe(untilDestroyed(this)).subscribe(async response => {
        this.getCustomerLoanDetails.push(response)
        this.sharedService.setLoaderShownProperty(false);  

        await this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${response.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.customerImage = this.sanitizer.bypassSecurityTrustUrl(data);
          this.sharedService.setLoaderShownProperty(false);  

        })
        await this.crudService.get(`${appModels.CUSTOMERS}/loanByMobileNo/${response.customerDetails.mobileNo}`, {
            params: {
              tenantIdentifier: 'default'
            }
          }).pipe(untilDestroyed(this)).subscribe(res => {
            console.log(res[0].id)
            this.loanID = res[0].id;
            console.log(this.loanID)
            this.getCreateReceipt();
            this.sharedService.setLoaderShownProperty(false);  
          })
      })
  }

  // getLoanId(){
  //   this.crudService.get(`${appModels.CUSTOMERS}/loanByMobileNo/7585852883`, {
  //     params: {
  //       tenantIdentifier: 'default'
  //     }
  //   }).pipe(untilDestroyed(this)).subscribe(data => {
  //     console.log(data);
  //     for(var loanID of data){
  //       this.loanIDbyMobile.push(loanID)
  //       console.log(this.loanIDbyMobile[0].id);
  //       this.loanIDMob.push(this.loanIDbyMobile[0].id)
  //       console.log(this.loanIDMob);
  //     }
      
  //   })
  // }


  getCreateReceipt(){
    console.log(this.loanID)
    // this.manageEmployeeForm.value.dob = this.datepipe.transform(this.manageEmployeeForm.value.dob, 'dd MMMM yyyy');
    this.crudService.get(`${appModels.COMMON}/loans/${this.loanID}?associations=all&exclude=guarantors,futureSchedule`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      if( data.isTopup == true) {
        this.Topup = data.isTopup;  
      }
      console.log(data.isTopup);
      console.log(this.Topup);
      // console.log(data.loanType);
      console.log(data.repaymentSchedule.periods);
      this.sharedService.setLoaderShownProperty(false);  

      for(var i =1; i<data.repaymentSchedule.periods.length; i++){
      
        // console.log(data.repaymentSchedule.periods[i].fromDate)
        // console.log(data.repaymentSchedule.periods[i].dueDate)
        // console.log(this.dates.fromDate)
        this.startDate = data.repaymentSchedule.periods[i].fromDate
        this.endDate = data.repaymentSchedule.periods[i].dueDate
        
        var startDateStr = this.startDate[1] + '/' + this.startDate[2] + '/' + this.startDate[0]
        this.startDate = new Date (startDateStr)

        var endDateStr = this.endDate[1] + '/' + this.endDate[2] + '/' + this.endDate[0]
        this.endDate = new Date (endDateStr)
       
      var totalTimeDiff =  this.endDate.getTime() - this.startDate.getTime();
      var dayDiff = totalTimeDiff / ( 1000 * 3600 * 24);
      console.log(dayDiff)
      this.delayDays = dayDiff;
      
      
    }
      // console.log(data.repaymentSchedule.periods.fromDate);
      // console.log(data.repaymentSchedule.periods.dueDate);
      // console.log(data.transactions.amount);
      // for(var dueAmount of data.transactions){
      //   console.log(dueAmount.amount)
      //   this.transactions.push(dueAmount.amount)
      // }
      // this.transactions.push(dueAmount.amount)
      
      this.receiptData = data.repaymentSchedule.periods;
      this.loanType = data.loanType;
      
      // this.transactions.push(data.transactions.amount)
      for(var dueAmount of data.transactions){
        console.log(dueAmount)
        this.transactions.push(dueAmount.amount)
      }
      // for(var startAmount of data.repaymentSchedule.periods){
      //   console.log(startAmount)
      //   this.startPay.push(startAmount.totalDueForPeriod)
      // }
      // debugger
      var delayAmount = this.startPay[i] - this.transactions[i]
      console.log(delayAmount)
      this.calAmt.push(delayAmount)
      console.log(this.calAmt);
      // this.loanRepaymentReceipt();
    })
    this.loanRepaymentReceipt();
  }

  loanRepaymentReceipt(){
    console.log(this.loanRepaymentForm.value)
    
    this.loanRepaymentForm.value.transactionDate=this.datepipe.transform(this.loanRepaymentForm.value.transactionDate, 'dd MMMM yyyy');
    this.crudService.post(`${appModels.COMMON}/loans/${this.loanID}/transactions?command=repayment`, this.loanRepaymentForm.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      console.log(data)
      this.printData = data
      console.log(this.printData)
      this.toast.success("Receipt Created")
      this.sharedService.setLoaderShownProperty(false);  
    })
    
  }

  // Print the receipt
  eventCheck(value: any, event: any){
    if(event.checked === true){
      this.arrayOfPrint.push(value);
    }
  }

  openPDF() {
    var data = document.getElementById('pdfTable');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=700,toolbar=0,scrollbars=0,location=no,status=no,titlebar=no, fontFamily=Titillium Web');
    WindowPrt.document.write(data.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
   this.arrayOfPrint = [];
  }

  

}




@Component({
  selector: 'vlms-create-receipt',
  templateUrl: 'search-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class SearchReceipt {
  customerMobileNoBaseList: any = [];

  constructor(public dialogRef: MatDialogRef<SearchReceipt>,private router: Router,private crudService: CrudService, @Inject(MAT_DIALOG_DATA) public response:any,private sharedService: SharedService) { }

   
  customername: any;
  customerMobileNo: any;
  customerList: any = [];
  showDropdown: Boolean = false;
  customerMblNo: any;
  customerMobileList: any = [];

  searchForms = new FormGroup({
    customerName: new FormControl(''),
    customerMobileNo: new FormControl('')
  })

  ngOnInit(): void {
    }



  /** Filter on CustomerName and Mobile Number */    
  applyFilter(value : any , string_val: any){
    this.showDropdown = true;
    if(string_val == 'name'){
    const filterValue = (event.target as HTMLInputElement).value;
    this.customername = filterValue.trim().toLowerCase();
  }
  if(this.customername != ''){
  this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
    params: {
      tenantIdentifier: 'default'
    }
  }).pipe(untilDestroyed(this)).subscribe(async response => {
    this.sharedService.setLoaderShownProperty(false);  

    for(let x of response){
        if (
          x.customerDetails.name.toLowerCase().search(this.customername.toLowerCase()) != -1 ){
            this.customerList.push(x)
        }
    }
    console.log(this.customerList);

    })
  }
  else{
    this.customerList = [];
    this.showDropdown = false;
    this.searchForms.patchValue({
      customerMobileNo:'',
    })
  }
  }
  

  /** Filter on CustomerName and Mobile Number */    
  applyfilter(value : any , string_val: any){
    this.showDropdown = true;
    if(string_val == 'mobileno'){
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerMblNo = filterValue.trim().toLowerCase();
  }
  if(this.customerMblNo != ''){
  this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
    params: {
      tenantIdentifier: 'default'
    }
  }).pipe(untilDestroyed(this)).subscribe(async response => {
    this.sharedService.setLoaderShownProperty(false);  

    for(let x of response){
        if (
          x.customerDetails.mobileNo.toLowerCase().search(this.customerMblNo.toLowerCase()) != -1 ){
            this.customerMobileList.push(x)
        }
    }
    console.log(this.customerMobileList);
    })
  }
  else{
    this.customerMobileList = [];
    this.showDropdown = false;
    this.searchForms.patchValue({
      customerName:'',
    })
  }
  }

/** Auto Fetch for Customer based on MobileNo and MobileNo based on CustomerName */    
  customer(val: any){
    this.showDropdown = false;
    this.customerList.map((res: any) => {
      if(res.customerDetails.name.toLowerCase().search(val.value.toLowerCase()) != -1 ){
      this.searchForms.patchValue({
        customerMobileNo:res.customerDetails.mobileNo,
        customerName:val.value
      })
      }
      // else{
      //   this.searchForms.patchValue({
      //     customerName:res.customerDetails.name,
      //     customerMobileNo:val.value
      //   })
      // }
    }
    )
  }

  customerMobile(val: any){
    this.showDropdown = false;
    this.customerMobileList.map((res: any) => {
      if(res.customerDetails.mobileNo.toLowerCase().search(val.value.toLowerCase()) != -1 ){
      this.searchForms.patchValue({
        customerMobileNo:val.value,
        customerName:res.customerDetails.name
      })
      }
    })
  }

  /** Close the Dialog Model */
  close() {
    this.dialogRef.close();
  }
  role: any;
  createReceipt(){
    this.customerList.map((res: any) => {
      console.log(res)
    this.role = localStorage.getItem("roles");
      if(this.role === "Cashier"){
          if(res.customerDetails.name == this.searchForms.value.customerName){
              this.router.navigate(['/cashier/create-receipt/' +res.id]);
              this.dialogRef.close(res.customerDetails.name);
          }
      }
      else{
        if(res.customerDetails.name == this.searchForms.value.customerName){
          this.router.navigate(['/branch-manager/create-receipt/' +res.id]);
          this.dialogRef.close(res.customerDetails.name);
      }
      }
    })

    this.customerMobileList.map((res: any) => {
      console.log(res)
    this.role = localStorage.getItem("roles");
      if(this.role === "Cashier"){
          if(res.customerDetails.name == this.searchForms.value.customerName){
              this.router.navigate(['/cashier/create-receipt/' +res.id]);
              this.dialogRef.close(res.customerDetails.name);
          }
      }
      else{
        if(res.customerDetails.name == this.searchForms.value.customerName){
          this.router.navigate(['/branch-manager/create-receipt/' +res.id]);
          this.dialogRef.close(res.customerDetails.name);
      }
      }
    })

  }

}