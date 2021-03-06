/** Angular Imports */
import { Component, OnInit } from '@angular/core';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import {DomSanitizer} from "@angular/platform-browser";
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../services/shared.service';



import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })



/** Customer Management Component */
@Component({
  selector: 'vlms-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  displayedColumns = ['index','customerName', 'mobileNo', 'altNumber','dob',
  'fatherName','vehicleNumber','Action'];
  dataSource = new MatTableDataSource();


  testImage:any;
  CustomerDetail:any;


  constructor(private crudService: CrudService,private sanitizer:DomSanitizer,private router: Router,public datepipe: DatePipe,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getCustomerData();
  }
  ngOnDestroy() { } 

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  getCustomerData() {
    this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).subscribe(response => {
      this.CustomerDetail = response;
      this.sharedService.setLoaderShownProperty(false); 
      this.dataSource = new MatTableDataSource(this.CustomerDetail)
    })
  }

  Loanprocess(id : any){
    this.router.navigate(['branch-manager/loan-process/'  + id]);

  }

  getImage(){
    this.crudService.get_Image(`${appModels.COMMON}/images/CustomerImage/4?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(data => {
      this.testImage = this.sanitizer.bypassSecurityTrustUrl(data);
      this.sharedService.setLoaderShownProperty(false); 
      console.log( this.testImage)
    })
  }
}
