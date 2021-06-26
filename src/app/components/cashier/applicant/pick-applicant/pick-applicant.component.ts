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
  showLoanApprovelDetails:Boolean = false;
  loanApprovalStatus: any;
  
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
      if(this.id !== undefined || null){
        this.getApplicantDetails();
        this.getLoanApprovel();
        }
    });
   

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
    this.applicantDetails[0].loanDetailsData.id,
   ).pipe(untilDestroyed(this)).subscribe(async response => {
    this.toast.success("Saved Successfully");
    this.sharedService.setLoaderShownProperty(false);  

    await this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyBankDetails`,this.applicantDetailsForm.value.bankDetails,
    this.applicantDetails[0].bankDetails.id,
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
 

  getLoanApprovel(){
    this.crudService.get(`${appModels.APPROVEL}`, {
    params: {
      tenantIdentifier: 'default'  
    }
  }).pipe(untilDestroyed(this)).subscribe(async response => {
    console.log(response)
    this.sharedService.setLoaderShownProperty(false);  
    for(let loanDetail of response.pageItems){
      if(this.id == loanDetail.id){
        this.loanApprovalStatus = loanDetail.status;
        this.showLoanApprovelDetails = true;
      }
    }
  })
  }



  saveProcess(applicantLoanID: any){
    const dialogRef = this.dialog.open(SendToApprover, {
      width: '100vw',
      height: '90vh',
      data: applicantLoanID ? applicantLoanID : null
    });  
    dialogRef.afterClosed().subscribe((response : any) => {
      this.sharedService.setLoaderShownProperty(false);  
      this.getLoanApprovel();
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
      console.log(this.applicantLoanId)
    }

    showBranchStatus:Boolean = false;
    showBranchList:Boolean = false;
    showProcess: Boolean = true;
    showPeelamedu:Boolean = false;
    showLoanTransferDoc: Boolean = false;
    showGandhipuram: Boolean = false;
    showGanapathy:Boolean = false;
    showThudiyalur:Boolean = false;
    showVadavalli: Boolean = false;
    showSulur: Boolean = false;

    showDcTransfer:Boolean = false;
    showChangeBankCreatorAuthoriser: Boolean = false;
    showRemindCreator:Boolean = false;
    showAdditionalTransferDoc:Boolean = false;

    showCreatorStatus: Boolean = false;
    showCreatorJob:Boolean = false;
    showDelayTime: Boolean = false;
    showCreatorError: Boolean = false;

    showApprover:Boolean = false;
    showAuthoriserStatus:Boolean = false;
    showAuthoriser: Boolean = false;

    processForm = new FormGroup({
        process: new FormControl('')
      })

    branchStatusForm = new FormGroup({
        branchJob: new FormControl('')
      })
      
    branchListForm = new FormGroup({
        branchList : new FormControl('')
      })

    peelameduForm = new FormGroup({
        peelameduBranch :  new FormControl('')
      })

    gandhipuramForm = new FormGroup({
        gandhipuramBranch :  new FormControl('')
      })

    ganapathyForm = new FormGroup({
        ganapathyBranch :  new FormControl('')
      })

    thudiyalurForm = new FormGroup({
        thudiyalurBranch :  new FormControl('')
      }) 

    vadavalliForm = new FormGroup({
        vadavalliBranch :  new FormControl('')
      }) 
      
    sulurForm = new FormGroup({
        sulurBranch :  new FormControl('')
      }) 

    loanTransferForm = new FormGroup({
        loanAccountNo :  new FormControl('')
      })

    dcTransferForm = new FormGroup({
        brokerRefNo :  new FormControl(''),
        dcAmount :  new FormControl('')
      })

    changeBankCreatorAuthoriserForm = new FormGroup({
        bank :  new FormControl(''),
        creator: new FormControl(''),
        authoriser: new FormControl('')
      })

      creatorStatusForm = new FormGroup({
        creatorJob: new FormControl('')
      })
      creatorDelayTimeForm = new FormGroup({
        creatorDelay: new FormControl('')
      })
      creatorErrorForm = new FormGroup({
        creatorError: new FormControl('')
      })
      approverStatusForm = new FormGroup({
        approverStatus: new FormControl('')
      })
      authoriserStatusForm = new FormGroup({
        authoriserStatus: new FormControl(''),
        transferRemark: new FormControl(''),
      })

    ngOnInit(): void {
     console.log( this.applicantLoanId )
    }


    processStep(){
      console.log(this.processForm.value)
      if(this.processForm.value.process == "branch"){
          this.showBranchStatus = true;
          this.showProcess = false;
      } else if(this.processForm.value.process == "creator"){
        this.showCreatorStatus = true;
        this.showProcess = false;
    } else if(this.processForm.value.process == "approver"){
        this.showApprover = true;
        this.showProcess = false;
    }
    else if(this.processForm.value.process == "authoriser"){
      this.showAuthoriserStatus = true;
      this.showProcess = false;
  }
    }

    branchStatusStep(){
      console.log(this.branchStatusForm.value)
      if(this.branchStatusForm.value.branchJob == "loanTransfer"){
      this.showBranchStatus = false;
      this.showProcess = false;
      this.showBranchList = true;
      this.crudService.post(`${appModels.LOAN_TRANSFER_TEAM}/${this.applicantLoanId}`, {},{
        params: {
          command:this.branchStatusForm.value.branchJob,
          tenantIdentifier: 'default'  
        }
      }).pipe(untilDestroyed(this)).subscribe(async response => {
        console.log(response)
      })
      }
      else if(this.branchStatusForm.value.branchJob == "dcTransfer"){
        this.showProcess = false;
        this.showBranchStatus = false;
        this.showDcTransfer = true;
        this.crudService.post(`${appModels.LOAN_TRANSFER_TEAM}/${this.applicantLoanId}`, {},{
          params: {
            command:this.branchStatusForm.value.branchJob,
            tenantIdentifier: 'default'  
          }
        }).pipe(untilDestroyed(this)).subscribe(async response => {
          console.log(response)
        })
        }
        else if(this.branchStatusForm.value.branchJob == "loanTransferRequest"){
          this.showBranchStatus = false;
          this.showProcess = false;
          this.showBranchList = true;
          this.crudService.post(`${appModels.LOAN_TRANSFER_TEAM}/${this.applicantLoanId}`, {},{
            params: {
              command:this.branchStatusForm.value.branchJob,
              tenantIdentifier: 'default'  
            }
          }).pipe(untilDestroyed(this)).subscribe(async response => {
            console.log(response)
          })
          }
          else if(this.branchStatusForm.value.branchJob == "dcTransferRequest"){
            this.showProcess = false;
            this.showBranchStatus = false;
            this.showDcTransfer = true;
            this.crudService.post(`${appModels.LOAN_TRANSFER_TEAM}/${this.applicantLoanId}`, {},{
              params: {
                command:this.branchStatusForm.value.branchJob,
                tenantIdentifier: 'default'  
              }
            }).pipe(untilDestroyed(this)).subscribe(async response => {
              console.log(response)
            })
            }
            else if(this.branchStatusForm.value.branchJob == "changeRequest"){
              this.showProcess = false;
              this.showBranchStatus = false;
              this.showChangeBankCreatorAuthoriser = true;
              this.crudService.post(`${appModels.LOAN_TRANSFER_TEAM}/${this.applicantLoanId}`, {},{
                params: {
                  command:this.branchStatusForm.value.branchJob,
                  tenantIdentifier: 'default'  
                }
              }).pipe(untilDestroyed(this)).subscribe(async response => {
                console.log(response)
              })
              }
              else if(this.branchStatusForm.value.branchJob == "reminderRequest"){
                this.showProcess = false;
                this.showBranchStatus = false;
                this.showRemindCreator = true;
                this.crudService.post(`${appModels.LOAN_TRANSFER_TEAM}/${this.applicantLoanId}`, {},{
                  params: {
                    command:this.branchStatusForm.value.branchJob,
                    tenantIdentifier: 'default'  
                  }
                }).pipe(untilDestroyed(this)).subscribe(async response => {
                  console.log(response)
                })
                }

                else if(this.branchStatusForm.value.branchJob == "additionalDocumentRequest"){
                  this.showProcess = false;
                  this.showBranchStatus = false;
                  this.showAdditionalTransferDoc = true;
                  this.crudService.post(`${appModels.LOAN_TRANSFER_TEAM}/${this.applicantLoanId}`, {},{
                    params: {
                      command:this.branchStatusForm.value.branchJob,
                      tenantIdentifier: 'default'  
                    }
                  }).pipe(untilDestroyed(this)).subscribe(async response => {
                    console.log(response)
                  })
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
      }else if(this.branchListForm.value.branchList == "gandhipuram"){
        this.showGandhipuram = true;
        this.showBranchList = false;
      }else if(this.branchListForm.value.branchList == "ganapathy"){
        this.showGanapathy = true;
        this.showBranchList = false;
      }else if(this.branchListForm.value.branchList == "thudiyalur"){
        this.showThudiyalur = true;
        this.showBranchList = false;
      }else if(this.branchListForm.value.branchList == "vadavalli"){
        this.showVadavalli = true;
        this.showBranchList = false;
      }else if(this.branchListForm.value.branchList == "sulur"){
        this.showSulur = true;
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
      this.showChangeBankCreatorAuthoriser = false;
    }

    gandhipuramStep(){
      this.showGandhipuram = false;
      this.showLoanTransferDoc = true;
      this.showChangeBankCreatorAuthoriser = false;
    }
    ganapathyStep(){
      this.showGanapathy = false;
      this.showLoanTransferDoc = true;
      this.showChangeBankCreatorAuthoriser = false;
    }
    thudiyalurStep(){
      this.showThudiyalur = false;
      this.showLoanTransferDoc = true;
      this.showChangeBankCreatorAuthoriser = false;
    }
    vadavalliStep(){
      this.showVadavalli = false;
      this.showLoanTransferDoc = true;
      this.showChangeBankCreatorAuthoriser = false;
    }
    sulurStep(){
      this.showSulur = false;
      this.showLoanTransferDoc = true;
      this.showChangeBankCreatorAuthoriser = false;
    }
    loanTransferStep(){
      this.showChangeBankCreatorAuthoriser = true;
      this.showLoanTransferDoc = false;
    }

    dcTransferSubmit(){
      this.dialogRef.close();
    }
    changeBankCreatorAuthoriserSubmit(){
      this.dialogRef.close();
    }
    reminderCreatorSubmit(){
      this.dialogRef.close();
    }
    additionalTransferStep(){
      this.showAdditionalTransferDoc = false;
      this.showDcTransfer = true;
    }
    creatorStatusStep(){
      this.showCreatorJob = true;
      this.showCreatorStatus = false;
      if(this.creatorStatusForm.value.creatorJob == "InformDelaytoBranch"){
        this.showCreatorStatus = false;
        this.showDelayTime = true;
        this.showCreatorJob = false;
        }else if(this.creatorStatusForm.value.creatorJob == "Error"){
          this.showCreatorStatus = false;
          this.showCreatorError = true;
          this.showCreatorJob = false;
        }
    }
    creatorJobSubmit(){
      this.dialogRef.close();
    }
    creatorDelaySubmit(){
      this.dialogRef.close();
    }
    creatorErrorSubmit(){
      this.dialogRef.close();
    }
    authoriserStatusStep(){
      this.showAuthoriser = true;
      this.showAuthoriserStatus = false;
    }
    authoriserSubmit(){
      this.dialogRef.close();
    }
    approverSubmit(){
      this.dialogRef.close();
    }
    peelameduBack(){
      this.showBranchList = true;
      this.showPeelamedu = false;
      this.showLoanTransferDoc = false;
    }

    gandhipuramBack(){
      this.showBranchList = true;
      this.showGandhipuram = false;
      this.showLoanTransferDoc = false;
    }

    ganapathyBack(){
      this.showBranchList = true;
      this.showGanapathy = false;
      this.showLoanTransferDoc = false;
    }


    thudiyalurBack(){
      this.showBranchList = true;
      this.showThudiyalur = false;
      this.showLoanTransferDoc = false;
    }

    vadavalliBack(){
      this.showBranchList = true;
      this.showVadavalli = false;
      this.showLoanTransferDoc = false;
    }

    sulurBack(){
      this.showBranchList = true;
      this.showSulur = false;
      this.showLoanTransferDoc = false;
    }

    loanTransferBack(){
      this.showPeelamedu = true;
      this.showLoanTransferDoc = false;
    }

    dcTransferBack(){
      this.showDcTransfer = false;
      this.showBranchStatus = true;
    }
    changeBankCreatorAuthoriserBack(){
      this.showBranchStatus = true;
      this.showChangeBankCreatorAuthoriser = false;
    }
    reminderCreatorBack(){
      this.showBranchStatus = true;
      this.showRemindCreator = false;
    }
    additionalTransferBack(){
      this.showBranchStatus = true;
      this.showAdditionalTransferDoc = false;
    }
    creatorStatusBack(){
      this.showProcess = true;
      this.showCreatorStatus = false;
    }
    creatorJobBack(){
      this.showCreatorJob = false;
      this.showCreatorStatus = true;
    }
    creatorDelayBack(){
      this.showDelayTime = false;
      this.showCreatorStatus = true;
      this.showCreatorJob = false;
    }
    creatorErrorBack(){
      this.showCreatorStatus = true;
      this.showCreatorError = false;
    }
    approverBack(){
      this.showProcess = true;
      this.showApprover = false;
    }
    authoriserStatusBack(){
      this.showProcess = true;
      this.showAuthoriserStatus = false;
    }
    authoriserBack(){
      this.showAuthoriserStatus = true;
      this.showAuthoriser = false;
    }
    close(){
    this.dialogRef.close();
    }

  }