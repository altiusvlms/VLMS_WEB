/** Angular Imports */
import { Component, OnInit } from '@angular/core';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import {DomSanitizer} from "@angular/platform-browser";
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })



/** Customer Management Component */
@Component({
  selector: 'vlms-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  displayedColumns = ['Customer ID','Customer Name', 'Contact no', 'Alternative contact number','D.O.B',
  'Father’s Name','ID proof Type','Action'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  testImage:any;
  CustomerDetail_Data:any;


  constructor(private crudService: CrudService,private sanitizer:DomSanitizer,private router: Router,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getCustomerData();
  }
  ngOnDestroy() { } 

  getCustomerData() {
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).subscribe(data => {
      console.log(data);
      this.CustomerDetail_Data = data;
      this.dataSource = new MatTableDataSource(this.CustomerDetail_Data)

    })
  }

  Loanprocess(id : any){
    this.router.navigate(['branch-manager/loan-process/'  + id]);

  }

  getImage(){
    this.crudService.get_Image(`${appModels.COMMON}/images/CustomerImage/4?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
      this.testImage = this.sanitizer.bypassSecurityTrustUrl(data);
      console.log( this.testImage)
    })
  }
}
