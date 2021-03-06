/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Services */
import { CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";
import { SharedService } from '../../../../services/shared.service';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Applicant On Line Component */
@Component({
  selector: 'vlms-applicant-online',
  templateUrl: './applicant-online.component.html',
  styleUrls: ['./applicant-online.component.scss']
})
export class ApplicantOnlineComponent implements OnInit {

  constructor(private crudService: CrudService,private router: Router,private sanitizer:DomSanitizer,private sharedService: SharedService) { }
  /** Applicant OnLine Variables */
  applicantLoanDetails : any = [];
  customerImage: any;
  allCustomerImage: any = [];
  loanTypeDetails: any;

  ngOnInit(): void {
    this.getApplicantLoanDetails();
    this.getLoanType();
  }
 
  /** Get the Applicant Loan Details */
  getApplicantLoanDetails(){
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {
      this.applicantLoanDetails = response;
      this.sharedService.setLoaderShownProperty(false);  

      await this.applicantLoanDetails.map((res: any) => {
        this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${res.customerDetails.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
         this.customerImage =  this.sanitizer.bypassSecurityTrustUrl(data);
            this.allCustomerImage.push({image:this.customerImage})
            this.sharedService.setLoaderShownProperty(false);  
        },error => {
          console.error(error);
          this.customerImage = 'assets/images/empty_image.png';
          this.allCustomerImage.push({image:this.customerImage} )
                    this.sharedService.setLoaderShownProperty(false);  

       });
    })
    })
    this.allCustomerImage = [];

  }

/** Get the Applicant Loan Type Details */
  getLoanType(){
    this.crudService.get(`${appModels.APPROVEL}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async respose => {
     await respose.pageItems.map((res: any) => {
       this.loanTypeDetails = res.loanType;
       this.sharedService.setLoaderShownProperty(false);  

        })
    });
  }

  /** Page Navigate to Pick Applicant */
  pickApplicant(id: any){
    this.router.navigate(['cashier/pick_applicant/' + id]);
  }

  /** Page Navigate to Applicant All Details */
  viewApplicant(applicantId: any){
    this.router.navigate(['cashier/loan-process/'  + applicantId]);
  }
}
