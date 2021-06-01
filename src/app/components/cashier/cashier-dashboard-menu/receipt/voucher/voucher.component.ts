/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../../services/crud.service';
import { appModels } from '../../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../services/shared.service';
import { Router } from '@angular/router';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })


@Component({
  selector: 'vlms-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private sharedService: SharedService,public datepipe: DatePipe) { }

  fieldArray: any = [];
  multipleArray: any = [];

    /** Create Voucher Forms */
    createVoucherForms = new FormGroup({
      createdDate: new FormControl(''),
      particulars: new FormControl(''),
      voucherType: new FormControl(''),
      voucherNumber: new FormControl(''),
      credit: new FormControl(''),
      debit: new FormControl(''),
      remarks: new FormControl(''),
      dateFormat: new FormControl('dd MMMM yyyy'),
      locale: new FormControl('en'),
    })

  ngOnInit(): void {
    this.fieldArray.push(this.createVoucherForms.value);
  }

  addFieldValue() {
    this.fieldArray.push(this.createVoucherForms.value);
    if(this.createVoucherForms.value.credit == '' || this.createVoucherForms.value.debit == ''){
      this.createVoucherForms.value.credit = '0';
      this.createVoucherForms.value.debit  = '0';
    }
    this.createVoucherForms.value.createdDate=this.datepipe.transform(this.createVoucherForms.value.createdDate, 'dd MMMM yyyy');
    // this.multipleArray.push(this.createVoucherForms.value)
  }

  deleteFieldValue(index: any) {
      this.fieldArray.splice(index, 1);
  }

  saveVoucher(){
    if(this.createVoucherForms.value.credit == '' || this.createVoucherForms.value.debit == ''){
      this.createVoucherForms.value.credit = '0';
      this.createVoucherForms.value.debit  = '0';
    }
    this.createVoucherForms.value.createdDate=this.datepipe.transform(this.createVoucherForms.value.createdDate, 'dd MMMM yyyy');
    // this.multipleArray.push(this.createVoucherForms.value);
    
     this.crudService.post(`${appModels.VOUCHER}/createVoucher`,this.createVoucherForms.value,
      {params:{
      tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe(saved => {
        this.sharedService.setLoaderShownProperty(false); 
        this.toast.success("Voucher Saved Succesfully");  
        this.router.navigate(['/cashier/voucher-list'])
      })
    

  }


}
