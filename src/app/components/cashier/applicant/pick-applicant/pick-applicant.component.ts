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

  constructor(private router: Router,private crudService: CrudService,private route: ActivatedRoute,private sanitizer:DomSanitizer,private dialog: MatDialog,public datepipe: DatePipe,private toast: ToastrService) { }

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

  approvelForm = new FormGroup({
    approvedOnDate: new FormControl(''),
    approvedLoanAmount: new FormControl(''),
    expectedDisbursementDate: new FormControl(''),
    disbursementData: new FormControl(''),
    locale: new FormControl('en'),
    dateFormat: new FormControl('dd MMMM yyyy')
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

  save(){
    this.applicantDetailsForm.value.loanDetailsData.dueDate = this.datepipe.transform(this.applicantDetailsForm.value.loanDetailsData.dueDate, 'dd MMMM yyyy');
    this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyLoanDetails`,this.applicantDetailsForm.value.loanDetailsData,
    this.applicantDetails.loanDetailsData.id,
   ).pipe(untilDestroyed(this)).subscribe(async response => {
    this.toast.success("Saved Successfully");

    await this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyBankDetails`,this.applicantDetailsForm.value.bankDetails,
    this.applicantDetails.bankDetails.id,
    ).pipe(untilDestroyed(this)).subscribe(response => {

    //   this.approvelForm.value.approvedOnDate=this.datepipe.transform(this.approvelForm.value.approvedOnDate, 'dd MMMM yyyy');
    //   this.approvelForm.value.expectedDisbursementDate=this.datepipe.transform(this.approvelForm.value.expectedDisbursementDate, 'dd MMMM yyyy');
    // this.crudService.post(`${appModels.APPROVEL}/${response.resourceId}`, this.approvelForm.value,
    //   {params:{
    //     command: "approve"   
    //   }}
    // ).pipe(untilDestroyed(this)).subscribe(response => {
    // })

  })
  })
  }
  arrayOfapprovel: any = [];
  getApprovelData: any;

  getStep2(){
    this.getApprovelData = JSON.parse(localStorage.getItem('sentoToApprover'));
    this.arrayOfapprovel.push(this.getApprovelData);
    console.log(this.arrayOfapprovel)
  }

  saveProcess(){
    console.log("test")
    const dialogRef = this.dialog.open(SendToApprover, {
      width: '100vw',
      height: '90vh',
    });  
    dialogRef.afterClosed().subscribe((response : any) => {
        this.getStep2();
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
      branchForm = new FormGroup({
        loanTransfer: new FormControl(''),
        DCTransfer: new FormControl(''),
        request: new FormControl(''),
        authoriser: new FormControl(''),
        remindAuthoriser: new FormControl(''),
        additionalTransfer: new FormControl('')
      })
      areaForm = new FormGroup({
        peelamedu : new FormControl(''),
        gandhipuram : new FormControl(''),
        ganapathy : new FormControl(''),
        thudiyalur : new FormControl(''),
        vadavalli : new FormControl(''),
        sulur : new FormControl(''),
      })
      peelameduForm = new FormControl({
        KAF :  new FormControl(''),
        KI : new FormControl(''),
        KHPF:  new FormControl(''),
      })


    showStep2:Boolean = false;
    showStep3:Boolean = false;
    showStep4:Boolean = false;
    sendToapproval: any;

    ngOnInit(): void {
    }

    step1(){
       if(this.step1Form.value.branch !== ''){
         this.showStep2 = true;
       }
    }
    step2(){
      // this.sendToapproval = this.branchForm.value;
      // localStorage.setItem('sentoToApprover', JSON.stringify(this.sendToapproval));
      // this.dialogRef.close();
      if(this.branchForm.value.loanTransferBeneficiaryAdded !== ''){
        this.showStep3 = true;
      }
    }
    step3(){
      if(this.peelameduForm.value.KAF !== ''){
        this.showStep4 = true;
      }
    }
    // step4(){
    //   if(this.peelameduForm.value.KAF !== ''){
    //     this.showStep4 = true;
    //   }
    // }
    back(){
      this.showStep2 = false;
    }

  }