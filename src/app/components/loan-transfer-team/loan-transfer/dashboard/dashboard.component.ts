import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mifosx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  customerOnline(){
    this.router.navigate(['loan-transfer-team/customer-online'])
  }
  loanAmountAdded(){
    this.router.navigate(['loan-transfer-team/loan-amount-added'])
  }

}
