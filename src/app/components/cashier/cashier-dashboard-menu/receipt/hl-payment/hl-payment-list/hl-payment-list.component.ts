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

  HlPayment: any;
  arrayOfPrint: any = [];
  id : any;

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
      this.HlPayment = response;
      console.log(this.HlPayment )
      this.sharedService.setLoaderShownProperty(false);  
    })
  }

  eventCheck(value: any, event: any){
    if(event.checked === true){
      this.arrayOfPrint.push(value);
    }
  }

  openPDF() {
    var data = document.getElementById('pdfTable');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=700,toolbar=0,scrollbars=0,location=no,status=no,titlebar=no, fontFamily=Titillium Web');
    WindowPrt.document.write(data.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
   this.arrayOfPrint = [];
  }

  deleteHlPayment(id: any){
    console.log(id)
    // this.editIcon = false;
    if (confirm(`Are you sure, you want to delete?`)) {
    this.crudService.delete(`${appModels.HL_PAYMENT}/deleteHL`, id)
    .pipe(untilDestroyed(this)).subscribe(deleted => {
      // this.dialogRef.close(deleted);
      this.sharedService.setLoaderShownProperty(false); 
      this.toast.success("Deleted Succesfully"); 
      this.getHLPaymentList();
    })
    }
  }
  
}
