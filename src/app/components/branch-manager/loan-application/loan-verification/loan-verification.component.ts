import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

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

  loanProcess(id : any) {
    this.router.navigate(['branch-manager/loan-process/'  + id]);
  }
  getLoanVerification(){
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe().subscribe(data => {
      console.log(data);
      this.loanverifiData = data;
    })
  }
}
