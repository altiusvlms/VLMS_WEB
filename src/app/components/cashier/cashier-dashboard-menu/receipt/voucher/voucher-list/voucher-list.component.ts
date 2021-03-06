/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms and Routing and Services */
import {  CrudService } from '../../../../../../services/crud.service';
import { appModels } from '../../../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Voucher List Component */
@Component({
  selector: 'vlms-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private sharedService: SharedService,public datepipe: DatePipe) { }

/** Voucher List Variables */
  voucherList: any;
  arrayOfPrint: any = [];

  ngOnInit(): void {
    this.getVoucherList();
  }

/** Create Voucher Routing */  
  createVoucher(){
    this.router.navigate(['/cashier/voucher'])
  }

/** Get Voucher List */   
  getVoucherList(){
    this.crudService.get(`${appModels.VOUCHER}/getVoucherData`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
      this.voucherList = response;
      console.log( this.voucherList)
      this.sharedService.setLoaderShownProperty(false);  
    })
  }

/** Change the of Print */ 
  eventCheck(value: any, event: any){
    if(event.checked === true){
      this.arrayOfPrint.push(value);
    }
 
  }

/** Print of Voucher List */   
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

deleteVoucher(id: any){
  console.log(id)
  // this.editIcon = false;
  if (confirm(`Are you sure, you want to delete?`)) {
  this.crudService.delete(`${appModels.VOUCHER}/deleteVoucher`, id)
  .pipe(untilDestroyed(this)).subscribe(deleted => {
    // this.dialogRef.close(deleted);
    this.sharedService.setLoaderShownProperty(false); 
    this.toast.success("Deleted Succesfully"); 
    this.getVoucherList();
  })
  }
}

}
