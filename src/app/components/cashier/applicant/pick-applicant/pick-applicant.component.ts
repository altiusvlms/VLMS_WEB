/** Angular Imports */
import { Component, OnInit ,Inject} from '@angular/core';

/** Custom Services and Routing and Forms */
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute ,Params} from '@angular/router';
import { CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { DomSanitizer} from "@angular/platform-browser";
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

  constructor(private router: Router,private crudService: CrudService,private route: ActivatedRoute,private sanitizer:DomSanitizer,private dialog: MatDialog,public datepipe: DatePipe,private toast: ToastrService, private sharedService: SharedService) { }

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
                this.sharedService.setLoaderShownProperty(false);  

      console.log(this.applicantDetails)
       await this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${this.applicantDetails[0].customerDetails.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
         this.applicantImage =  this.sanitizer.bypassSecurityTrustUrl(data);
         this.sharedService.setLoaderShownProperty(false);  

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
    this.sharedService.setLoaderShownProperty(false);  

    await this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyBankDetails`,this.applicantDetailsForm.value.bankDetails,
    this.applicantDetails.bankDetails.id,
    ).pipe(untilDestroyed(this)).subscribe(response => {
      this.sharedService.setLoaderShownProperty(false);  

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



  saveProcess(applicantLoanID: any){
    const dialogRef = this.dialog.open(SendToApprover, {
      width: '100vw',
      height: '90vh',
      data: applicantLoanID ? applicantLoanID : null
    });  
    dialogRef.afterClosed().subscribe((response : any) => {
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

  applicantLoanId: any;

  constructor(public dialogRef: MatDialogRef<SendToApprover>, private toast: ToastrService,private router: Router, @Inject(MAT_DIALOG_DATA) public response:any,
    private crudService: CrudService,
    private sharedService: SharedService,public datepipe: DatePipe) {
      this.applicantLoanId = response;
    }

    showBranchStatus:Boolean = false;
    showBranchList:Boolean = false;
    showProcess: Boolean = true;
    showPeelamedu:Boolean = false;
    showLoanTransferDoc: Boolean = false;

    processForm = new FormGroup({
      process: new FormControl('')
      })

    branchStatusForm = new FormGroup({
        branchJob: new FormControl('')
      })
      
    branchListForm = new FormGroup({
      branchList : new FormControl('')
      })

      peelameduForm = new FormControl({
        peelameduBranch :  new FormControl('')
      })

      loanTransferForm = new FormControl({
        loanAccountNo :  new FormControl('')
      })

    ngOnInit(): void {
     console.log( this.applicantLoanId )
    }

    processStep(){
      console.log(this.processForm.value)
      if(this.processForm.value.process == "branch"){
          this.showBranchStatus = true;
          this.showProcess = false;
      }
    }

    branchStatusStep(){
      console.log(this.branchStatusForm.value)
      if(this.branchStatusForm.value.branchJob == "loanTransfer"){
      this.showBranchList = true;
      this.showBranchStatus = false;
      this.showProcess = false;
      // this.crudService.post(`${appModels.LOAN_TRANSFER_TEAM}/${this.applicantLoanId}`, {},{
      //   params: {
      //     command:this.branchStatusForm.value.branchJob,
      //     tenantIdentifier: 'default'  
      //   }
      // }).pipe(untilDestroyed(this)).subscribe(async response => {
      //   console.log(response)
      // })
      }
    }

    branchStatusBack(){
      this.showBranchStatus = false;
      this.showProcess = true;
    }

    branchListStep(){
      console.log(this.branchListForm.value)
      if(this.branchListForm.value.branchList == "peelamedu"){
        this.showPeelamedu = true;
        this.showBranchList = false;
      }

    }

    branchListBack(){
      this.showBranchStatus = true;
      this.showProcess = false;
      this.showBranchList = false;
    }

    peelameduStep(){
      this.showPeelamedu = false;
      this.showLoanTransferDoc = true;
    }

    peelameduBack(){
      this.showBranchList = true;
      this.showLoanTransferDoc = false;
    }

    loanTransferBack(){
      this.showPeelamedu = true;
    }

    loanTransferStep(){

    }

    close(){
    this.dialogRef.close();
    }

  }