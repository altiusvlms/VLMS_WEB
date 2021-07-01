import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

/** Custom Forms */
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  CrudService } from '../../../services/crud.service';
import { appModels } from '../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../services/shared.service';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['index', 'createdDate', 'customerName', 'mobileNumber', 'vehicleNumber', 'email', 'Action'];
  dataSource = new MatTableDataSource();
  fromdate:any;
  todate:any;
  EnquiryVerfication:any;

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService,private dialog: MatDialog,public datepipe: DatePipe,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getEnquiry();
  }

  ngOnDestroy() { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
/** Open the Dialog Model (Create Enquiry) */
  createEnquiry() {
    const dialogRef = this.dialog.open(CreateEnquiry, {
      width: '100vw',
      height: '90vh'
    });  
    dialogRef.afterClosed().subscribe((response : any) => {
      this.sharedService.setLoaderShownProperty(false); 
        this.getEnquiry();
        this.sharedService.setLoaderShownProperty(false); 
    });
  }

 /** Page Navigation for Loan Application */
  createLoan(){
    this.router.navigate(['branch-manager/newloan-process']);
  }

  
  getEnquiry() {
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnquiry`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).subscribe(response => {
      this.EnquiryVerfication = response;
      this.dataSource = new MatTableDataSource(this.EnquiryVerfication)
      this.sharedService.setLoaderShownProperty(false); 
    })
  }


  Filterdate(){
    this.fromdate;
    this.todate;
    let fromdate1 =this.datepipe.transform(this.fromdate, 'yyyy-MM-dd');
    let todate1 =this.datepipe.transform(this.todate, 'yyyy-MM-dd');
    let params = {
      fromdate:fromdate1,
      todate:todate1,
      tenantIdentifier: "default",
    }
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnquiryByDate`,
      { params }
    ).pipe(untilDestroyed(this)).subscribe( response => {
      this.EnquiryVerfication = response;
      this.dataSource = new MatTableDataSource(this.EnquiryVerfication)
      this.sharedService.setLoaderShownProperty(false); 
    })
  }

  clear(){
    this.getEnquiry();
  }

}

/** Create Enquiry Component */

@Component({
  selector: 'vlms-enquiry-list',
  templateUrl: 'create-enquiry.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class CreateEnquiry {

  submitted: Boolean = false;
  ShowEnquiryID: Boolean = false;
  enquiryID: any;

  constructor(public dialogRef: MatDialogRef<CreateEnquiry>, private toast: ToastrService,private router: Router, @Inject(MAT_DIALOG_DATA) public response:any,
    private crudService: CrudService,
    private sharedService: SharedService,public datepipe: DatePipe) { 

  }

    /** Create Enquiry Form */
    createEnquiryForms = new FormGroup({
      customerName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      vehicleNumber: new FormControl('',Validators.required),
      email: new FormControl('', Validators.required),
      enquiryId: new FormControl(''),
    })


  ngOnInit() {
  }

  ngOnDestroy() {}

  get f() { return this.createEnquiryForms.controls; }

 /** Save Enquiry */
    saveEnquiry(){
      this.submitted = true;
      if (this.createEnquiryForms.invalid) {
        return;
      }
      this.crudService.post(`${appModels.FIELDEXECUTIVE}/enquiry`, this.createEnquiryForms.value,
        { params:{
          tenantIdentifier: "default"   
        }}
      ).pipe(untilDestroyed(this)).subscribe( response => {
        this.ShowEnquiryID = true;
        this.enquiryID = response.resourceIdentifier;
        this.sharedService.setLoaderShownProperty(false); 
      })
    }

/** Close the Dialog Model */
    close() {
      this.dialogRef.close();
    }


}

