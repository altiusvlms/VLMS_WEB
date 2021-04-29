import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })


@Component({
  selector: 'mifosx-loan-verification',
  templateUrl: './loan-verification.component.html',
  styleUrls: ['./loan-verification.component.scss']
})
export class LoanVerificationComponent implements OnInit {

  loanverifiData:any;
  // id:any;

  constructor(private router: Router,private crudService: CrudService) { }

  ngOnInit(): void {
    this.getLoanVerification();
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
}
