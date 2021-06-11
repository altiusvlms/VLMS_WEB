/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Services and Routing */
import { CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Customer or (Applicant) Loan Amount Added List Component */
@Component({
  selector: 'vlms-loan-amount-added',
  templateUrl: './loan-amount-added.component.html',
  styleUrls: ['./loan-amount-added.component.scss']
})
export class LoanAmountAddedComponent implements OnInit {

  constructor(private crudService: CrudService,private router: Router,private sanitizer:DomSanitizer) { }

  /** Customer Loan Amount Added Variables */
  customerLoanDetails : any = [];
  customerImage: any;
  allCustomerImage: any = [];
  loanTypeDetails: any;

  ngOnInit(): void {
    this.getCustomerLoanDetails();
    this.getLoanType();
  }

   /** Get the Customer Loan Details */
   getCustomerLoanDetails(){
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {
      this.customerLoanDetails = response;
      await this.customerLoanDetails.map((res: any) => {
        this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${res.customerDetails.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
         this.customerImage =  this.sanitizer.bypassSecurityTrustUrl(data);
            this.allCustomerImage.push({image:this.customerImage})
        },error => {
          console.error(error);
          this.customerImage = 'assets/images/empty_image.png';
          this.allCustomerImage.push({image:this.customerImage} )
       });
    })
    })
    this.allCustomerImage = [];

  }

/** Get the Customer Loan Type Details */
  getLoanType(){
    this.crudService.get(`${appModels.APPROVEL}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async respose => {
     await respose.pageItems.map((res: any) => {
       this.loanTypeDetails = res.loanType;
        })
    });
  }

/** Page Navigate to Pick Customer */
  pickCustomer(id: any){
    this.router.navigate(['loan-transfer-team/loan-status/' + id]);
  }
}
