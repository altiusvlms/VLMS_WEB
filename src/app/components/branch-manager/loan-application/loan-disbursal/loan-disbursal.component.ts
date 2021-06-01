import { Component, OnInit } from '@angular/core';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import {DomSanitizer} from "@angular/platform-browser";
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-loan-disbursal',
  templateUrl: './loan-disbursal.component.html',
  styleUrls: ['./loan-disbursal.component.scss']
})
export class LoanDisbursalComponent implements OnInit {

  displayedColumns = ['Sr.no','Branch', 'Duration Days', 'Requested On','Requested Amount',
  'Approved Amount','Status'];
  dataSource = new MatTableDataSource();
  loanDisburalData: any;


  testImage:any;
  CustomerDetail_Data:any;
  resFieldExecutiveId:any;

  constructor(private crudService: CrudService,private sanitizer:DomSanitizer,private router: Router,private toast: ToastrService, public datepipe: DatePipe) { }
    

  AddLoanDisbursalForm = new FormGroup({
    branchName: new FormControl('', Validators.required),
    cashLimit: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    requestedOn:new FormControl('', Validators.required),
    dateFormat:new FormControl('dd MMMM yyyy', Validators.required),
    locale:new FormControl('en', Validators.required),
    requestedAmount:new FormControl('', Validators.required),
    approvedAmount:new FormControl('', Validators.required),
    status:new FormControl('pending', Validators.required)
  })


  // requestForms = new FormGroup({
  //   Cash_Limit: new FormControl('', Validators.required),
  //   Notes: new FormControl('', Validators.required),
  // })    
  ngOnInit(): void {
    this.Loan_Disbural_Limit();
  }
  ngOnDestroy() { } 

  // saverequest(){
  //   this.toast.success("Created Successfully");
  // };

  Loan_Disbural_Limit(){
    this.crudService.get(`${appModels.EMPLOYEE}/getLoanDisbursal`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.loanDisburalData = data;
      this.dataSource = new MatTableDataSource(this.loanDisburalData)

    })
  }

  // Post API
  saveRequest(){
    for(var singleDat of this.loanDisburalData){
      // console.log("singleDat")
      // console.log(singleDat.fieldExecutiveName)
      if(singleDat.fieldExecutiveName == this.AddLoanDisbursalForm.value.feName){
        console.log(singleDat)
        this.AddLoanDisbursalForm.value.fieldExecutiveId=singleDat.id
      }
    }
    console.log(this.AddLoanDisbursalForm.value)
    // debugger
    // console.log(this.AddExecutiveForms.controls.feName.value)
    this.AddLoanDisbursalForm.value.requestedOn=this.datepipe.transform(this.AddLoanDisbursalForm.value.requestedOn, 'dd MMMM yyyy');
    this.crudService.post(`${appModels.EMPLOYEE}/submitLoanDisbursal`, this.AddLoanDisbursalForm.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      this.resFieldExecutiveId = data.resourceId
      console.log("data")
      console.log(this.resFieldExecutiveId)
      this.toast.success("Created Successfully");
      this.Loan_Disbural_Limit();    
    })
    
  };

}
