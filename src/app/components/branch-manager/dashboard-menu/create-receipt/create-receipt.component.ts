import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Data } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })


// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'vlms-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {

  receiptData:any;
  constructor(private crudService: CrudService) { 
    // this.yrToggel = true; 
  }

  ngOnInit(): void {
    // this.getCreateReceipt();
  }

  // generatePdf(pdfmake : any){
  //   const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //   pdfmake.createPdf(documentDefinition).open();
  //  }
  // getCreateReceipt(){
  //   this.crudService.get(`${appModels.COMMON}/loans/1?associations=all&exclude=guarantors,futureSchedule`, {
  //     params: {
  //       tenantIdentifier: 'default'
  //     }
  //   }).pipe(untilDestroyed(this)).subscribe(data => {
  //     console.log(data);
  //     this.receiptData = data;
  //   })
  // }


}
