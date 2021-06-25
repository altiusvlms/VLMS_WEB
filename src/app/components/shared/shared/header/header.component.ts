
/** Angular Imports */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

/** Header Component*/
@Component({
  selector: 'vlms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  constructor( private router: Router) { }
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  ngOnInit(): void { 
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['./login'])
  }
  emiCalculator(){
    this.router.navigate(["./emi-calculator/calculator"]);
  }

 
   // toggle sidebar
   toggleSidebar() {
    let assidebar = document.querySelector('#sidebar');
    let body = document.querySelector('body');
    console.log(body);
   
      this.sidebarToggled = !this.sidebarToggled;
      console.log(this.sidebarToggled );
      if(this.sidebarToggled) {
        assidebar.classList.add('sidebar-hidden');
        body.classList.add('activemenu');
      } else {
        assidebar.classList.remove('sidebar-hidden');
        body.classList.remove('activemenu');
      }
    //}
  }
}
