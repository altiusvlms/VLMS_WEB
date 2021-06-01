/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../../services/crud.service';
import { appModels } from '../../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Create HL Payment Component */

@Component({
  selector: 'vlms-hl-payment',
  templateUrl: './hl-payment.component.html',
  styleUrls: ['./hl-payment.component.scss']
})
export class HlPaymentComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private sharedService: SharedService,private dialog: MatDialog,public datepipe: DatePipe) { }

  fieldArray: any = [];
  showInsurenceTable: Boolean = false;
  showRTOTable:Boolean = false;

    /** Create HL Payment Forms */
    createHlForms = new FormGroup({
      postDate: new FormControl(''),
      postType: new FormControl(''),
      agent: new FormControl(''),
      agtno: new FormControl(''),
      customerName: new FormControl(''),
      actualAmount: new FormControl(''),
      postAmount: new FormControl(''),
      expiryDate: new FormControl(''),
      policyNo: new FormControl(''),
      insuranceCompany: new FormControl(''),
      remark: new FormControl(''),
      dateFormat: new FormControl('dd MMMM yyyy'),
      locale: new FormControl('en'),
    })

    ngOnInit(): void {
    }

    addFieldValue() {
        this.fieldArray.push(this.createHlForms.value);
    }

    deleteFieldValue(index: any) {
        this.fieldArray.splice(index, 1);
    }

    onTypeChange(value: any){
      if(value == 'insurance'){
        this.fieldArray.length = 1;
        this.showInsurenceTable = true;
        this.showRTOTable = false;
      }
      else if(value == 'RTO_Charges'){
        this.fieldArray.push(this.createHlForms.value);
        this.showInsurenceTable = false;
        this.showRTOTable = true;
      }
    }

    saveHl(){
      this.createHlForms.value.postDate=this.datepipe.transform(this.createHlForms.value.postDate, 'dd MMMM yyyy');
      this.createHlForms.value.expiryDate=this.datepipe.transform(this.createHlForms.value.expiryDate, 'dd MMMM yyyy');

      if(this.createHlForms.value.expiryDate == null){
        this.createHlForms.value.expiryDate=this.datepipe.transform(this.createHlForms.value.postDate, 'dd MMMM yyyy');
      }

      this.crudService.post(`${appModels.HL_PAYMENT}/createHLPayment`,this.createHlForms.value,
        {params:{
        tenantIdentifier: "default"   
        }}
      ).pipe(untilDestroyed(this)).subscribe(saved => {
          this.sharedService.setLoaderShownProperty(false); 
          this.toast.success("HL Payment Saved Succesfully");
          this.router.navigate(['/cashier/hl-payment-list'])  
        })
    }

}


