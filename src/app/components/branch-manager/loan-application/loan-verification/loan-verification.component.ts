import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { DatePipe } from '@angular/common';


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })


@Component({
  selector: 'mifosx-loan-verification',
  templateUrl: './loan-verification.component.html',
  styleUrls: ['./loan-verification.component.scss']
})
export class LoanVerificationComponent implements OnInit {

  loanverifiData:any;
  loanDisburalData:any;
  loanApprovalData:any;
  // id:any;

  constructor(private router: Router,private crudService: CrudService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getLoanVerification();
    this.Loan_Disbural_Limit();
    this.Loan_Approval_Limit();
  }

  ngOnDestroy() { }


  loanProcess(id : any) {
    this.router.navigate(['branch-manager/loan-process/'  + id]);
  }
  getLoanVerification(){
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.loanverifiData = data;
    })
  }

  Loan_Disbural_Limit(){
    this.crudService.get(`${appModels.Employee}/getLoanDisbursal`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.loanDisburalData = data;
    })
  }

  Loan_Approval_Limit(){
    this.crudService.get(`${appModels.Employee}/getLoanApproval`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.loanApprovalData = data;
    })
  }
}
