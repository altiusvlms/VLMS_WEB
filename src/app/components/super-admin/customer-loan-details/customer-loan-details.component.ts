import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute,Params } from '@angular/router';
import { CrudService } from '../../../services/crud.service';
import { appModels } from '../../../services/utils/enum.util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer} from "@angular/platform-browser";
import { SharedService } from '../../../services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-customer-loan-details',
  templateUrl: './customer-loan-details.component.html',
  styleUrls: ['./customer-loan-details.component.scss']
})
export class CustomerLoanDetailsComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService,private dialog: MatDialog,private route: ActivatedRoute, private sanitizer:DomSanitizer,private toast: ToastrService, public datepipe: DatePipe,private sharedService: SharedService) { }

    id: any;
    selectedIndex: any = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log(this.id)
     if(this.id !== undefined || null){
        this.getCustomerDetails();
     }
    })
  }
  
  ontabClick(event:any){
    this.selectedIndex = event.index;
  }
  nextStep(){
    this.selectedIndex += 1;
  }
  previousStep() {
    this.selectedIndex -= 1;
  }

  getCustomerDetails(){
    this.crudService.get(`${appModels.CUSTOMERS}/loanByLoanId/${this.id}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {
      console.log(response)
      this.sharedService.setLoaderShownProperty(false); 
    });

    }

}
