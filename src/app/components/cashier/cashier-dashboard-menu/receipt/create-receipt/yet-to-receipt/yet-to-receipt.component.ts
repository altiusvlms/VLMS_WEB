import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../../../services/crud.service';
import { appModels } from '../../../../../../services/utils/enum.util';
import {DomSanitizer} from "@angular/platform-browser";
import { DatePipe } from '@angular/common';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-yet-to-receipt',
  templateUrl: './yet-to-receipt.component.html',
  styleUrls: ['./yet-to-receipt.component.scss']
})
export class YetToReceiptComponent implements OnInit {
 
  constructor(private router: Router,private crudService: CrudService,private sanitizer:DomSanitizer,public datepipe: DatePipe) { }

  customerLoanDetails : any = [];
  customerImage: any;
  allCustomerImage: any = [];

  ngOnInit(): void {
    this.getLoanVerification();
  }

  
  getLoanVerification(){
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async respose => {
      this.customerLoanDetails = respose;

      await this.customerLoanDetails.map((res: any) => {
        this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${res.customerDetails.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
         this.customerImage =  this.sanitizer.bypassSecurityTrustUrl(data);
            this.allCustomerImage.push({image:this.customerImage})
        },error => {
          console.error(error);
          this.customerImage = 'assets/images/empty_image.png';
          this.allCustomerImage.push({image:this.customerImage} )
       });
    })
    })
    this.allCustomerImage = [];
  }

  createReceiptByID(id: any){
    console.log(id)
    this.router.navigate(['cashier/create-receipt/'  + id]);
  }
  createReceipt(){
    this.router.navigate(['cashier/create-receipt']);
  }
}
