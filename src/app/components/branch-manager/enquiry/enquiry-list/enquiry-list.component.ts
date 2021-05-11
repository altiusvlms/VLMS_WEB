/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';


/** Custom Forms */
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })



/** Enquiry List Component */
@Component({
  selector: 'vlms-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','Action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  submitted: Boolean = false;
  showGenerateModel:Boolean = false;
  responseEnquiryId:any;
  EnquiryVerfication_Data:any;

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService) { }

    /** Create Enquiry Form */
    createEnquiryForms = new FormGroup({
      customerName: new FormControl(''),
      mobileNumber: new FormControl('', Validators.required),
      vehicleNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      enquiryId: new FormControl(''),
    })

  ngOnInit(): void {
    this.getEnrollData();
    this.saveEnquiry();
  }

  ngOnDestroy() { }

 /** Page Navigation for Loan Application */
  createLoan(){
    this.router.navigate(['branch-manager/newloan-process']);

  }
  // Get Enquiry
  getEnrollData() {
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnquiry`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).subscribe(data => {
      console.log(data);
      this.EnquiryVerfication_Data = data;
    })
  }
 /** Save Enquiry */
  saveEnquiry(){
    this.submitted = true;
    this.crudService.post(`${appModels.FIELDEXECUTIVE}/enquiry`, this.createEnquiryForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      this.showGenerateModel = true;
      this.responseEnquiryId = data.resourceId;
      console.log(data)
      this.toast.success("Created Successfully");
      this.getEnrollData();
    })
  }




}
