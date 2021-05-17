import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'vlms-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  loan_disbusal(){
    this.router.navigate(['branch-manager/loandisbursal-process']);

  }
  loan_approval(){
    this.router.navigate(['branch-manager/loanapproval-process']);

  }
  cash_limit(){
    this.router.navigate(['branch-manager/cashlimit-process']);

  }
}
