import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../../../services/shared.service';

import {DomSanitizer} from "@angular/platform-browser";
import { DatePipe } from '@angular/common';

import { Observable, forkJoin } from 'rxjs';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'vlms-topup-loan',
  templateUrl: './topup-loan.component.html',
  styleUrls: ['./topup-loan.component.scss']
})
export class TopupLoanComponent implements OnInit {
  
  topUpLoanDetails: any = [];

  constructor(private router: Router,private crudService: CrudService,private sanitizer:DomSanitizer,public datepipe: DatePipe,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.topUpLoan();
  }

  topUpLoan(){
    this.crudService.get(`${appModels.APPROVEL}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {
     await response.pageItems.map((res: any) => {
      // for(let res of response) {
       this.topUpLoanDetails.push(res)
       console.log(this.topUpLoanDetails)
      //  console.log(this.topUpLoanDetails.accountNo)
             this.sharedService.setLoaderShownProperty(false);  
            // }
        })
        
    });
  }

}
