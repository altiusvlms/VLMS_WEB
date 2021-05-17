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

  };
  loan_approval(){
    this.router.navigate(['branch-manager/loanapproval-process']);

  };
  cash_limit(){
    this.router.navigate(['branch-manager/cashlimit-process']);

  }

  // ** Active Class Variales */
  activeClass : any = 'activeClass_dashboard';
  activeClass_dashboard : any;
  activeClass_employee : any;
  activeClass_roles : any;
  activeClass_customer : any;
  activeClass_loan : any;
  activeClass_task : any;
  activeClass_target : any;
  activeClass_topup : any;
  activeClass_report : any;
  activeClass_analytics : any;
  activeClass_receipt : any;
  activeClass_enquiry : any;
  activeClass_enrollcustomer : any;
  activeClass_createloan : any;
  
 // ** Active Class Function */
    onClick(check: any){
      console.log(check)
        if(check==1){
          this.activeClass = 'activeClass_dashboard';
          this.router.navigate(['branch-manager/dashboard']);
        }else if(check==2){
          this.activeClass = 'activeClass_employee';
          this.router.navigate(['branch-manager/existing-employee']);
        }else if(check==3){
          this.activeClass = 'activeClass_roles'; 
          this.router.navigate(['branch-manager/user-role-permission']);
        }else if(check==4){
          this.activeClass = 'activeClass_customer'; 
          this.router.navigate(['branch-manager/customer-management']);
        }else if(check==5){
          this.activeClass = 'activeClass_loan'; 
          this.router.navigate(['branch-manager/loan-verification']);
        } else if(check==6){
          this.activeClass = 'activeClass_cash'; 
        } else if(check==7){
          this.activeClass = 'activeClass_task'; 
          this.router.navigate(['branch-manager/task-management']);
        } else if(check==8){
          console.log("test")
          this.activeClass = 'activeClass_target'; 
          this.router.navigate(['branch-manager/assign-targets']);
        } else if(check==9){
          this.activeClass = 'activeClass_topup'; 
          this.router.navigate(['branch-manager/topup-loan']);
        } else if(check==10){
          this.activeClass = 'activeClass_report'; 
          this.router.navigate(['branch-manager/dashboard']);
        } else if(check==11){
          this.activeClass = 'activeClass_analytics'; 
          this.router.navigate(['branch-manager/analytics']);
        } else if(check==12){
          this.activeClass = 'activeClass_receipt'; 
          this.router.navigate(['branch-manager/create-recipt']);
        } else if(check==13){
          this.activeClass = 'activeClass_enquiry'; 
          this.router.navigate(['branch-manager/enquiry-list']);
        } else if(check==14){
          this.activeClass = 'activeClass_enrollcustomer'; 
          this.router.navigate(['branch-manager/customer-enroll-list']);
        } else if(check==15){
          this.activeClass = 'activeClass_createloan'; 
          this.router.navigate(['branch-manager/newloan-process']);
        }      
    
    }

}
