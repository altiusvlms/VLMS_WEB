/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Services */
import { CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Applicant On Line Component */
@Component({
  selector: 'vlms-applicant-online',
  templateUrl: './applicant-online.component.html',
  styleUrls: ['./applicant-online.component.scss']
})
export class ApplicantOnlineComponent implements OnInit {

  constructor(private crudService: CrudService,private router: Router) { }
  /** Applicant OnLine Variables */
  applicantLoanDetails : any = [];

  ngOnInit(): void {
    this.getApplicantLoanDetails();
  }

  /** Get the Applicant Loan Details */
  getApplicantLoanDetails(){
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
      console.log(response);
      this.applicantLoanDetails = response;
    })
  }

  /** Page Navigate to Pick Applicant */
  pickApplicant(id: any){
    this.router.navigate(['cashier/pick_applicant/' + id]);
  }
}
