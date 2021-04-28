/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';

// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

/** Loan Process Component */ 
@Component({
  selector: 'vlms-loan-process',
  templateUrl: './loan-process.component.html',
  styleUrls: ['./loan-process.component.scss']
})
export class LoanProcessComponent implements OnInit {
       
  id:any;


  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute) { }


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

    bankDetailsForm = new FormGroup({
      accountNumber: new FormControl('', Validators.required),
      accountHolderName: new FormControl('', Validators.required),
      IFSC: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
      branchName: new FormControl('', Validators.required),
      loanEligibleAmount: new FormControl('', Validators.required),
     })

     loanTransferForm = new FormGroup({
      loanAmount: new FormControl('0', Validators.required),
      loanTerm: new FormControl('0', Validators.required),
      intrest: new FormControl('0', Validators.required),
      emiAmount: new FormControl('0', Validators.required),
      intrestEmiAmount: new FormControl('0', Validators.required),
      dueDate: new FormControl('', Validators.required),
      docCharge: new FormControl('0', Validators.required),
      processingCharge: new FormControl('0', Validators.required),
      pendingDoc: new FormControl('0', Validators.required),
      holdAmount: new FormControl('0', Validators.required),
      otherCharge: new FormControl('0', Validators.required),
      closingAC: new FormControl('0', Validators.required),
      closingDiscount: new FormControl('0', Validators.required),
      balance: new FormControl('0', Validators.required),
      rePaymentMode: new FormControl('0', Validators.required),
     })
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.getCustomerDetails();
  }
  
  getCustomerDetails(){
    this.crudService.get(`${appModels.COMMON}/customers/loanByLoanId/${this.id}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe().subscribe(data => {
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

      this.bankDetailsForm
      .patchValue({
      accountNumber: data.bankDetails.accountNumber,
      accountHolderName: data.bankDetails.accountHolderName,
      IFSC:data.bankDetails.IFSC ,
      bankName: data.bankDetails.bankName,
      branchName: data.bankDetails.branchName,
      loanEligibleAmount:data.bankDetails.loanEligibleAmount,
      });

    })
  }



}
