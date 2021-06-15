
/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';

// Custom Forms and Service and Routing
import { CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { SharedService } from '../../../../services/shared.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from "@angular/platform-browser";
import { DatePipe } from '@angular/common';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.scss']
})
export class LoanStatusComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute,private sanitizer:DomSanitizer,public datepipe: DatePipe,private sharedService: SharedService) { }

  id: any;
  applicantDetails: any =[];
  applicantImage:any;
  
  applicantDetailsForm = new FormGroup({
    loanDetailsData:new FormGroup({
      loanAmount: new FormControl(''),
      loanTerm: new FormControl(''),
      loanInterest: new FormControl(''),
      emi: new FormControl(''),
      interestInr: new FormControl(''),
      docCharge: new FormControl(''),
      processingCharge: new FormControl(''),
      otherCharges: new FormControl(''),
      closingAC: new FormControl(''),
      closingDiscount: new FormControl(''),
      // payout: new FormControl(''),
      // dueDate: new FormControl('')
    }),
    bankDetails:new FormGroup({
      accountNumber: new FormControl(''),
      accountHolderName: new FormControl(''),
      loanEligibleAmount: new FormControl(''),
      IFSC: new FormControl(''),
      bankName: new FormControl(''),
      branchName: new FormControl(''),
      // disbursalType: new FormControl(''),
      // accountType: new FormControl('')
    })
  })

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log(this.id)
      if(this.id !== undefined || null){
        this.getCustomerDetails();
      }
    });
  }

  getCustomerDetails(){
    this.crudService.get(`${appModels.CUSTOMERS}/loanByLoanId/${this.id}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {
      this.applicantDetails.push(response);
      this.sharedService.setLoaderShownProperty(false);  

      await this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${this.applicantDetails[0].customerDetails.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
        this.applicantImage =  this.sanitizer.bypassSecurityTrustUrl(data);
        this.sharedService.setLoaderShownProperty(false);  

       },error => {
         console.error(error);
         this.applicantImage = 'assets/images/empty_image.png';
      });

      console.log(response)
      this.applicantDetailsForm.patchValue({
        loanDetailsData:{
          loanAmount: response.loanDetailsData.loanAmount,
          loanTerm: response.loanDetailsData.loanTerm,
          loanInterest: response.loanDetailsData.loanInterest,
          emi: response.loanDetailsData.emi,
          interestInr: response.loanDetailsData.interestInr,
          docCharge: response.loanDetailsData.docCharge,
          processingCharge: response.loanDetailsData.processingCharge,
          otherCharges:response.loanDetailsData.otherCharges,
          closingAC: response.loanDetailsData.closingAC,
          closingDiscount: response.loanDetailsData.closingDiscount,
          // payout: response.loanDetailsData.payout,
          // dueDate:this.datepipe.transform(response.loanDetailsData.dueDate, 'yyyy-MM-dd')
        },
        bankDetails:{
          accountNumber:  response.bankDetails.accountNumber,
          accountHolderName: response.bankDetails.accountHolderName,
          loanEligibleAmount: response.bankDetails.loanEligibleAmount,
          IFSC: response.bankDetails.IFSC,
          bankName: response.bankDetails.bankName,
          branchName: response.bankDetails.branchName,
          // disbursalType: response.bankDetails.disbursalType,
          // accountType: response.bankDetails.accountType,
        }
      })
    })
  }

  viewMore(id : any){
  this.router.navigate(['loan-transfer-team/customer-details/'  + id]);
  }
}
