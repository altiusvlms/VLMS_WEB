/** Angular Imports */
import { Component, OnInit } from '@angular/core';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import {DomSanitizer} from "@angular/platform-browser";


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })



/** Customer Management Component */
@Component({
  selector: 'vlms-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  testImage:any;

  constructor(private crudService: CrudService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }
  ngOnDestroy() { } 

  getImage(){
    this.crudService.get_Image(`${appModels.COMMON}/images/CustomerImage/4?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
      this.testImage = this.sanitizer.bypassSecurityTrustUrl(data);
      console.log( this.testImage)
    })
  }
}
