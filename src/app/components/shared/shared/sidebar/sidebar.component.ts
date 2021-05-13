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

  test(){
    this.router.navigate(['branch-manager/loan-application/cashlimit-process']);

  }
  test2(){
    this.router.navigate(['branch-manager/loan-application/loanapproval-process']);

  }

}
