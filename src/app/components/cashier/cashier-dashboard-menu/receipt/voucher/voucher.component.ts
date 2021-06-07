/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CrudService } from '../../../../../services/crud.service';
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


  createVoucherForms: FormGroup;

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private sharedService: SharedService,public datepipe: DatePipe,private fb:FormBuilder) {
    this.createVoucherForms = this.fb.group({
      createdDate: '',
      voucherType: '',
      voucherNumber: '',
      remarks: '',
      dateFormat:'dd MMMM yyyy',
      locale: 'en',
      voucher: this.fb.array([]) ,
    });

   }

   
  ngOnInit(): void {
  }

  voucher() : FormArray {
    return this.createVoucherForms.get("voucher") as FormArray;
  }

  newVoucher(): FormGroup {
    return this.fb.group({
      particulars: '',
      credit: '',
      debit: '',
    })
  }
   
  addVoucher() {
    this.voucher().push(this.newVoucher());
  }
   
  removeVoucher(i:number) {
    this.voucher().removeAt(i);
  }
   
  saveVoucher(){
    console.log(this.createVoucherForms.value);
    this.createVoucherForms.value.createdDate=this.datepipe.transform(this.createVoucherForms.value.createdDate, 'dd MMMM yyyy');
    
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
