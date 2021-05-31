/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../../../services/crud.service';
import { appModels } from '../../../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })


@Component({
  selector: 'vlms-hl-payment-list',
  templateUrl: './hl-payment-list.component.html',
  styleUrls: ['./hl-payment-list.component.scss']
})
export class HlPaymentListComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private sharedService: SharedService,public datepipe: DatePipe) { }

  HlPayment: any = [];

  ngOnInit(): void {
    this.getHLPaymentList();
  }
  createHL(){
    this.router.navigate(['/cashier/hl-payment'])
  }
  getHLPaymentList(){
    this.crudService.get(`${appModels.HL_PAYMENT}/getHLData`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
      this.HlPayment.push(response);
      console.log(this.HlPayment)
      this.sharedService.setLoaderShownProperty(false);  
    })
  }
}
