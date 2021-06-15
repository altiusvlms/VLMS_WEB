/** Angular Imports */
import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


/** Custom Forms */
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../services/shared.service';



import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
import { values } from 'lodash';
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
  displayedColumns = ['index','customerName', 'mobileNumber','vehicleNumber','email','Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fromdate:any;
  todate:any;
  latest_date:any;
  submitted: Boolean = false;
  showGenerateModel:Boolean = false;
  responseEnquiryId:any;
  EnquiryVerfication_Data:any;
  unamePattern = "^[A-Z]{2}[ \-][0-9]{2}[ ,][A-Z0-9]{2,3}[ \-][0-9]{4}$"

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService,private dialog: MatDialog,public datepipe: DatePipe,private sharedService: SharedService) { }

    /** Create Enquiry Form */
    createEnquiryForms = new FormGroup({
      customerName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      vehicleNumber: new FormControl('',Validators.required),
      email: new FormControl('', [
    Validators.required,
    Validators.email,
  ]),
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
      this.sharedService.setLoaderShownProperty(false); 

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
      this.sharedService.setLoaderShownProperty(false); 
      console.log(data)
      this.getEnrollData();
      this.dialogRef.close(data);
    })
  }

  Filterdate(){
    this.fromdate;
    this.todate;
    let fromdate1 =this.datepipe.transform(this.fromdate, 'yyyy-MM-dd');
    let todate1 =this.datepipe.transform(this.todate, 'yyyy-MM-dd');
    console.log(fromdate1);
    console.log(todate1);
    let params = {
      fromdate:fromdate1,
      todate:todate1,
      tenantIdentifier: "default",
    }
        this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnquiryByDate`,
      { params }
    ).pipe(untilDestroyed(this)).subscribe( data => {
      console.log(data)
      this.EnquiryVerfication_Data = data;
      this.dataSource = new MatTableDataSource(this.EnquiryVerfication_Data)
      this.sharedService.setLoaderShownProperty(false); 
    })
  }
  clear(){
    this.getEnrollData();
  }


}
