import { Component, OnInit, Inject } from '@angular/core';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import {DomSanitizer} from "@angular/platform-browser";
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../../../services/shared.service';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-loan-approval',
  templateUrl: './loan-approval.component.html',
  styleUrls: ['./loan-approval.component.scss']
})
export class LoanApprovalComponent implements OnInit {


  
  displayedColumns = ['Sr no','Branch', 'Requested On', 'Requested Loan Amount','Approved Amount',
  'Status'];
  dataSource = new MatTableDataSource();
  loanApprovalData: any;
  resFieldExecutiveId:any;

  constructor(private crudService: CrudService,private sanitizer:DomSanitizer,private router: Router,private toast: ToastrService, public datepipe: DatePipe) { }

  // requestForms = new FormGroup({
  //   Cash_Limit: new FormControl('', Validators.required),
  //   Notes: new FormControl('', Validators.required),
  // })

  AddLoanApprovalForm = new FormGroup({
    branchName: new FormControl('', Validators.required),
    cashLimit: new FormControl('', Validators.required),
    // duration: new FormControl('', Validators.required),
    requestedOn:new FormControl('', Validators.required),
    dateFormat:new FormControl('dd MMMM yyyy', Validators.required),
    locale:new FormControl('en', Validators.required),
    requestedAmount:new FormControl('', Validators.required),
    approvedAmount:new FormControl('', Validators.required),
    status:new FormControl('approved', Validators.required)
  })
  ngOnInit(): void {
    this.Loan_Approval_Limit();
  }
  ngOnDestroy() { } 
  
  
 
  Loan_Approval_Limit(){
    this.crudService.get(`${appModels.EMPLOYEE}/getLoanApproval`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.loanApprovalData = data;
      this.dataSource = new MatTableDataSource(this.loanApprovalData)

    })
  }

  saveRequest(){
    for(var singleDat of this.loanApprovalData){
      // console.log("singleDat")
      // console.log(singleDat.fieldExecutiveName)
      if(singleDat.fieldExecutiveName == this.AddLoanApprovalForm.value.feName){
        console.log(singleDat)
        this.AddLoanApprovalForm.value.fieldExecutiveId=singleDat.id
      }
    }
    console.log(this.AddLoanApprovalForm.value)
    // debugger
    // console.log(this.AddExecutiveForms.controls.feName.value)
    this.AddLoanApprovalForm.value.requestedOn=this.datepipe.transform(this.AddLoanApprovalForm.value.requestedOn, 'dd MMMM yyyy');
    this.crudService.post(`${appModels.EMPLOYEE}/submitLoanApproval`, this.AddLoanApprovalForm.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      this.resFieldExecutiveId = data.resourceId
      console.log("data")
      console.log(this.resFieldExecutiveId)
      this.toast.success("Created Successfully");
      this.Loan_Approval_Limit();    
      this.AddLoanApprovalForm.reset();
    })
    
  };

}

// Create request HTML

// @Component({
//   selector: 'vlms-cash-limit',
//   templateUrl: 'edit-cash-limit.component.html',
//   styleUrls: ['./cash-limit.component.scss']
// })

// @UntilDestroy({ checkProperties: true })

// export class LoanApproval {

//   editCashLimit:any;
//   array_cashlimit : any = [];

//   constructor(public dialogRef: MatDialogRef<LoanApproval>, private router: Router, @Inject(MAT_DIALOG_DATA) public response:any, private formBuilder: FormBuilder,
//   private crudService: CrudService,
//   private sharedService: SharedService,public datepipe: DatePipe,private toast: ToastrService) { 
//     if (response) {
//       this.editCashLimit = { ...response };
//       this.array_cashlimit.push(this.editCashLimit);
//       console.log(this.array_cashlimit)
//       // if(response.status == ''){
//       //   response.status = "open";
//       // }
//      this.cashLimitForms
//     .patchValue({
//       status:response.status
//     });
//     }

//   }

//   cashLimitForms = new FormGroup({
//     status: new FormControl(''),
//     requiredAmount : new FormControl('')
//   })
  

//   ngOnInit(): void {
    
//   }
//   ngOnDestroy() { } 

//   close() {
//     this.dialogRef.close();
//   }

  
  


// }
