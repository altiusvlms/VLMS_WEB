
/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** Header Component*/
@Component({
  selector: 'vlms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['./login'])
  }
  emiCalculator(){
    this.router.navigate(["./emi-calculator/calculator"]);
  }
}
