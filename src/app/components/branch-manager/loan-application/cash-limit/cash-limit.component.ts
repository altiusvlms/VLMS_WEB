import { Component, OnInit } from '@angular/core';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import {DomSanitizer} from "@angular/platform-browser";
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-cash-limit',
  templateUrl: './cash-limit.component.html',
  styleUrls: ['./cash-limit.component.scss']
})
export class CashLimitComponent implements OnInit {

  Executives: any = ['sathish', 'senthil', 'Arun',];

  displayedColumns = ['Sr no','fieldExecutive','cashInHand', 'Req_On','requiredAmount',
  'Approval','Action'];
  dataSource = new MatTableDataSource();
  cashLimitData: any;
  FieldExicutives:any
  resFieldExecutiveId:any;
  resFieldexeid:any;
  cashLimits:any;
  getIdSingleData: any = [];
  id:any;
  fetchbyModel:any;
  gettingData:any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private crudService: CrudService,private sanitizer:DomSanitizer,private router: Router,private toast: ToastrService) { }

  AddExecutiveForms = new FormGroup({
    feName: new FormControl('', Validators.required),
    cashInHand: new FormControl('', Validators.required),
    fieldExecutiveId: new FormControl('', Validators.required),
    cashLimit: new FormControl('100', Validators.required),
    requiredAmount: new FormControl('', Validators.required),
    status: new FormControl('pending', Validators.required),
    locale:new FormControl('en', Validators.required)
  })
  EditExecutiveForms = new FormGroup({
    Req_Amount: new FormControl('', Validators.required),
    Approve_Amount: new FormControl('', Validators.required),
    Notes: new FormControl('', Validators.required),

  }) 
  ngOnInit(): void {
    this.listFieldExecutive();
    this.getSingleRequestList();
    
  }
  ngOnDestroy() { } 
  

  Edit_request(){

  }
  Delete_request(){

  }

  saveRequest(){
    for(var singleDat of this.FieldExicutives){
      // console.log("singleDat")
      // console.log(singleDat.fieldExecutiveName)
      if(singleDat.fieldExecutiveName == this.AddExecutiveForms.value.feName){
        console.log(singleDat)
        this.AddExecutiveForms.value.fieldExecutiveId=singleDat.id
      }
    }
    console.log(this.AddExecutiveForms.value)
    // debugger
    // console.log(this.AddExecutiveForms.controls.feName.value)
    this.crudService.post(`${appModels.FIELDEXECUTIVE}/feCashInHand`, this.AddExecutiveForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      this.resFieldExecutiveId = data.resourceId
      console.log("data")
      console.log(this.resFieldExecutiveId)
      this.toast.success("Created Successfully");
      this.listFieldExecutive()    
    })
    
  };

  Requestapproveprocess(){

  }
  Edit_changes(){}
 
// Dropdown
  AddNew(){
    this.crudService.get(`${appModels.FIELDEXECUTIVE}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.FieldExicutives = data;
      console.log("FieldExicutivesID")
      console.log(this.FieldExicutives)
      console.log(this.FieldExicutives.id)
    })
  }
  
  // Get Data
  listFieldExecutive(){
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/feCashInHand`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.resFieldexeid = data.id
      this.cashLimitData = data;
      this.dataSource = new MatTableDataSource(this.cashLimitData)
      // this.saveRequest();
      // for(let fetchbyModel of this.cashLimitData){
      //   if(fetchbyModel){
      //   this.gettingData.push(fetchbyModel)
      //   console.log(this.gettingData) 
      // }
      // }
      
    })
  }

  getSingleRequestList(){
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/feCashInHand`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.resFieldexeid = data.id
      this.cashLimitData = data;
      // this.dataSource = new MatTableDataSource(this.cashLimitData)
      console.log("cashLimitData1")
      console.log(this.cashLimitData)
      
      for (var singleData of this.cashLimitData){
        this.getIdSingleData.push(singleData)
        if(this.getIdSingleData.id){
          console.log(this.getIdSingleData.id)
        }
      }
      

      this.AddExecutiveForms.patchValue({
        status: this.getIdSingleData[0].status,
        requiredAmount :this.getIdSingleData[0].requiredAmount,
      })
    
    })
  }

  updateFieldexeDetails(){
    console.log(this.AddExecutiveForms.value)
  
    this.crudService.update(`${appModels.FIELDEXECUTIVE}/feCashInHand`,this.AddExecutiveForms.value,
    this.getIdSingleData.id,
    
    ).pipe(untilDestroyed(this)).subscribe(response => {
    this.toast.success("Updated Successfully");
  })
  }

  
    



}
