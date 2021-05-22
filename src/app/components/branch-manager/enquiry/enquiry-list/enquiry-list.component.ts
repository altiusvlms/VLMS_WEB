/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


/** Custom Forms */
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';



import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })



/** Enquiry List Component */
@Component({
  selector: 'vlms-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {
  [x: string]: any;

  displayedColumnsa: string[] = ['position', 'name', 'weight', 'symbol','Action'];
  displayedColumns = ['Enquiry ID', 'customerName', 'mobileNumber','vehicleNumber','email','Action'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  submitted: Boolean = false;
  showGenerateModel:Boolean = false;
  responseEnquiryId:any;
  EnquiryVerfication_Data:any;
  unamePattern = "^[A-Z]{2}[ \-][0-9]{2}[ ,][A-Z0-9]{2,3}[ \-][0-9]{4}$"

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService,private dialog: MatDialog) { }

    /** Create Enquiry Form */
    createEnquiryForms = new FormGroup({
      customerName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      vehicleNumber: new FormControl('',Validators.required),
      email: new FormControl(''),
      enquiryId: new FormControl(''),
    })
  ngOnInit(): void {
    this.getEnrollData();
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
      this.dataSource = new MatTableDataSource(this.EnquiryVerfication_Data)
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
      this.getEnrollData();
      this.dialogRef.close(data);
    })
  }




}
