import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

// Custom Routes
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { SharedService } from '../../../../services/shared.service';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'mifosx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loanTransferData: any;
  

  constructor(private router: Router , private crudService: CrudService) { }

  ngOnInit(): void {
    this.getDashBoardData();
  }

  customerOnline(){
    this.router.navigate(['loan-transfer-team/customer-online'])
  }
  loanAmountAdded(){
    this.router.navigate(['loan-transfer-team/loan-amount-added'])
  }

  getDashBoardData(){
    this.crudService.get(`${appModels.LOAN_TRANSFER_TEAM}/getLoanTransferDashboardData`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.loanTransferData = data;
      // this.loanTransferData.push(data)
      // for(var loanID of data){
      //   this.loanIDbyMobile.push(loanID)
      //   console.log(this.loanIDbyMobile[0].id);
      //   this.loanIDMob.push(this.loanIDbyMobile[0].id)
      //   console.log(this.loanIDMob);
      // }
      
    })
  }

}
