/** Angular Imports */
import { Component, OnInit ,Inject} from '@angular/core';

/** Custom Services and Routing and Forms */
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute ,Params} from '@angular/router';
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import {DomSanitizer} from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Pick Applicant Component */
@Component({
  selector: 'vlms-pick-applicant',
  templateUrl: './pick-applicant.component.html',
  styleUrls: ['./pick-applicant.component.scss']
})
export class PickApplicantComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService,private route: ActivatedRoute,private sanitizer:DomSanitizer,private dialog: MatDialog) { }

  /** Pick Applicant Variables */
  id: any;
  applicantDetails: any = [];
  applicantImage: any;

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
    });
    this.getApplicantDetails();
  }

  /** Get Applicant Details Based on ApplicantID */
  getApplicantDetails(){
    this.crudService.get(`${appModels.CUSTOMERS}/loanByLoanId/${this.id}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {
      this.applicantDetails.push(response);
      console.log(this.applicantDetails)
       await this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${this.applicantDetails[0].customerDetails.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
         this.applicantImage =  this.sanitizer.bypassSecurityTrustUrl(data);
        },error => {
          console.error(error);
          this.applicantImage = 'assets/images/empty_image.png';
       });
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

  saveProcess(){
    console.log("test")
    const dialogRef = this.dialog.open(SendToApprover, {
      width: '100vw',
      height: '90vh',
    });  
  }

}



@Component({
  selector: 'vlms-pick-applicant',
  templateUrl: 'send-to-approver.component.html',
  styleUrls: ['./pick-applicant.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class SendToApprover {


  constructor(public dialogRef: MatDialogRef<SendToApprover>, private toast: ToastrService,private router: Router, @Inject(MAT_DIALOG_DATA) public response:any,
    private crudService: CrudService,
    private sharedService: SharedService,public datepipe: DatePipe) { 
    }

    step1Form = new FormGroup({
        branch: new FormControl(''),
        creator: new FormControl(''),
        approver: new FormControl(''),
        authoriser: new FormControl(''),
      })
      step2Form = new FormGroup({
        loanTransfer: new FormControl(''),
        DCTransfer: new FormControl(''),
        request: new FormControl(''),
        authoriser: new FormControl(''),
        remindAuthoriser: new FormControl(''),
        additionalTransfer: new FormControl('')
      })

    showStep2:Boolean = false;
    sendToapproval: any;

    ngOnInit(): void {
    }
    step1(){
       console.log(this.step1Form.value)
       if(this.step1Form.value.branch !== ''){
         console.log("tesrs")
         this.showStep2 = true;
       }
    }
    step2(){
      console.log(this.step2Form.value)
      this.sendToapproval = this.step2Form.value;
      console.log( this.sendToapproval)
      localStorage.setItem('sentoToApprover', this.sendToapproval);
      this.dialogRef.close();

    }
    back(){
      this.showStep2 = true;
    }
  }