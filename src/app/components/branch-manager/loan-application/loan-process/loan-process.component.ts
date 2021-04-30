/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';

// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Loan Process Component */ 
@Component({
  selector: 'vlms-loan-process',
  templateUrl: './loan-process.component.html',
  styleUrls: ['./loan-process.component.scss']
})
export class LoanProcessComponent implements OnInit {
  
  
  
       
  id:any;
  loan_Id:any;
  resource_Id:any;  
  customer_Id:any;
  guarantor_Id:any;
  bankDetails_Id:any;
  userId:any;


  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute) { }

  // setTab(tabname: string) {
  //   this.router.navigate([`/${tabname}`]);
  // }
  mobile_num = localStorage.getItem("mobile_number");


  applicantDetailsForm = new FormGroup({
    userId: new FormControl('1', Validators.required),
    spouseName: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    maritalStatus: new FormControl('', Validators.required),
    
    })

    coapplicantDetailsForm = new FormGroup({
      spouseName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      })


    vehicleDetailsForm = new FormGroup({
      vehicleNumber: new FormControl('', Validators.required),
      maker: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      mfgYear: new FormControl('', Validators.required),
      engineNumber: new FormControl('', Validators.required),
      chassisNumber: new FormControl('', Validators.required),
      insuranceCompany: new FormControl('', Validators.required),
      insurancePolicy: new FormControl('', Validators.required),
      insuranceExpiry: new FormControl('', Validators.required),
      kmReading: new FormControl('', Validators.required)
      })

     loanTransferForm = new FormGroup({
      loanAmount: new FormControl('', Validators.required),
      loanTerm: new FormControl('', Validators.required),
      intrest: new FormControl('', Validators.required),
      emiAmount: new FormControl('', Validators.required),
      intrestEmiAmount: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      docCharge: new FormControl('', Validators.required),
      processingCharge: new FormControl('', Validators.required),
      pendingDoc: new FormControl('', Validators.required),
      holdAmount: new FormControl('', Validators.required),
      otherCharge: new FormControl('', Validators.required),
      closingAC: new FormControl('', Validators.required),
      closingDiscount: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      rePaymentMode: new FormControl('', Validators.required)
     })

    bankDetailsForm = new FormGroup({
      accountNumber: new FormControl('', Validators.required),
      accountHolderName: new FormControl('', Validators.required),
      IFSC: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
      branchName: new FormControl('', Validators.required),
      loanEligibleAmount: new FormControl('', Validators.required)
     })

     
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.getCustomerDetails(); 
    // this.newLoanCustomerDetails()
    
  }

  ngOnDestroy() { }

  getCustomerDetails(){
    this.crudService.get(`${appModels.COMMON}/customers/loanByLoanId/${this.id}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {

      this.applicantDetailsForm
      .patchValue({
        customerName: data.customerName,
        maritalStatus: data.customerDetails.maritalStatus,
      })

      this.coapplicantDetailsForm
      .patchValue({
        spouseName: data.customerGuarantor.spouseName,
        mobileNumber: data.customerGuarantor.mobileNumber,
      })

      this.vehicleDetailsForm
      .patchValue({
        vehicleNumber: data.vehicleDetails.vehicleNumber,
        maker: data.vehicleDetails.maker,
        model: data.vehicleDetails.model,
        color: data.vehicleDetails.color,
        mfgYear: data.vehicleDetails.mfgYear,
        engineNumber: data.vehicleDetails.engineNumber,
        chassisNumber: data.vehicleDetails.chassisNumber,
        insuranceCompany: data.vehicleDetails.insuranceCompany,
        insurancePolicy: data.vehicleDetails.insurancePolicy,
        insuranceExpiry: data.vehicleDetails['insuranceExpiry'],
        kmReading: data.vehicleDetails.kmReading
      });
      this.loanTransferForm 
      .patchValue({
        loanAmount: 0,
        loanTerm: 0,
        intrest: 0,
        emiAmount: 0,
        intrestEmiAmount: 0,
        dueDate: 0,
        docCharge: 0,
        processingCharge: 0,
        pendingDoc: 0,
        holdAmount: 0,
        otherCharge: 0,
        closingAC: 0,
        closingDiscount: 0,
        balance: 0,
        rePaymentMode:0
       });

      this.bankDetailsForm
      .patchValue({
      accountNumber: data.bankDetails.accountNumber,
      accountHolderName: data.bankDetails.accountHolderName,
      IFSC:data.bankDetails.IFSC ,
      bankName: data.bankDetails.bankName,
      branchName: data.bankDetails.branchName,
      loanEligibleAmount:data.bankDetails.loanEligibleAmount,
      });
   
console.log(this.mobile_num)

    })
  }

  newLoanCustomerDetails(){
    this.crudService.post(`${appModels.NEWLOAN}`, this.applicantDetailsForm.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      console.log(data)
      // console.log(this.mobile_num)
      this.loan_Id = data.loanId;
      this.resource_Id = data.resourceId;
      this.customer_Id = data.customerId;
      this.guarantor_Id = data.guarantorId;
      this.bankDetails_Id = data.bankDetailsId;
    })
  }

  submit(){
    // this.getMobileNumber();
    console.log(this.mobile_num)
  this.toast.success("Loan Approved")    
  }

  getMobileNumber(){
    console.log(this.mobile_num);
    this.crudService.get(`${appModels.USERS}/${this.mobile_num}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.userId = data.id;
      console.log(this.userId)
    })

      }
  

}
