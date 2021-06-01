import { Component, OnInit,Inject } from '@angular/core';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import {DomSanitizer} from "@angular/platform-browser";
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { SharedService } from '../../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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


  constructor(private crudService: CrudService,private sanitizer:DomSanitizer,private router: Router,private toast: ToastrService, private sharedService: SharedService, private dialog: MatDialog) { }

  AddExecutiveForms = new FormGroup({
    feName: new FormControl('', Validators.required),
    cashInHand: new FormControl('', Validators.required),
    fieldExecutiveId: new FormControl('', Validators.required),
    cashLimit: new FormControl('100', Validators.required),
    requiredAmount: new FormControl('', Validators.required),
    status: new FormControl('pending', Validators.required),
    locale:new FormControl('en', Validators.required),
    approveAmount:new FormControl('', Validators.required),
    requiredOn:new FormControl('', Validators.required)
  })
  EditExecutiveForms = new FormGroup({
    Req_Amount: new FormControl('', Validators.required),
    Approve_Amount: new FormControl('', Validators.required),
    Notes: new FormControl('', Validators.required),

  }) 
  ngOnInit(): void {
    this.listFieldExecutive();
    // this.getSingleRequestList();
    
  }
  ngOnDestroy() { } 
  

  // Edit_request(value :any){
  //   console.log(value)
  //   // for(var sing of value){
  //   //   console.log(sing)
  //   // }


  //   this.AddExecutiveForms.patchValue({
  //     feName: value.fieldExecutiveName,
  //     requiredOn : value.requiredOn,
  //     requiredAmount :value.requiredAmount,
  //     approveAmount :value.approveAmount,
  //     status: value.status,
      
    
  //   })

  // }
  Delete_request(value :any){
    console.log(value)
    // console.log(this.AddExecutiveForms.value)
    if (confirm(`Are you sure, you want to delete?`)) {
      this.crudService.delete(`${appModels.FIELDEXECUTIVE}/deleteCashInHand`, value.id)
      .pipe(untilDestroyed(this)).subscribe(deleted => {
        // this.dialogRef.close(deleted);
        this.sharedService.setLoaderShownProperty(false); 
        this.toast.success("Deleted Succesfully"); 
      })
      }





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
    }).pipe(untilDestroyed(this)).subscribe(response => {
      console.log(response);
      this.resFieldexeid = response.id
      this.cashLimitData = response;
      this.dataSource = new MatTableDataSource(this.cashLimitData)
      
    })
  }

  

  // updateFieldexeDetails(){
  //   console.log(this.AddExecutiveForms.value)
  
  //   this.crudService.update(`${appModels.FIELDEXECUTIVE}/feCashInHand`,this.AddExecutiveForms.value,
  //   this.getIdSingleData.id,
    
  //   ).pipe(untilDestroyed(this)).subscribe(response => {
  //   this.toast.success("Updated Successfully");
  // })
  // }

  Edit_request(element: any) {
    const dialogRef = this.dialog.open(EditCashLimit, {
      width: '50vw',
      height: '60vh',
      data: element ? element : null
    });
  
    dialogRef.afterClosed().subscribe((data : any) => {
      if (data) {
        // this.getTaskList();
      }
    });
  }  



}

// Edit Cash Limit
@Component({
  selector: 'vlms-cash-limit',
  templateUrl: 'edit-cash-limit.component.html',
  styleUrls: ['./cash-limit.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class EditCashLimit {

  editCashLimit:any;
  array_cashlimit : any = [];

  constructor(public dialogRef: MatDialogRef<EditCashLimit>, private router: Router, @Inject(MAT_DIALOG_DATA) public response:any, private formBuilder: FormBuilder,
  private crudService: CrudService,
  private sharedService: SharedService,public datepipe: DatePipe,private toast: ToastrService) { 
    if (response) {
      this.editCashLimit = { ...response };
      this.array_cashlimit.push(this.editCashLimit);
      console.log(this.array_cashlimit)
      // if(response.status == ''){
      //   response.status = "open";
      // }
     this.cashLimitForms
    .patchValue({
      status:response.status
    });
    }

  }

  cashLimitForms = new FormGroup({
    status: new FormControl(''),
    requiredAmount : new FormControl('')
  })
  



  // AddExecutiveForms = new FormGroup({
  //   feName: new FormControl('', Validators.required),
  //   cashInHand: new FormControl('', Validators.required),
  //   fieldExecutiveId: new FormControl('', Validators.required),
  //   cashLimit: new FormControl('100', Validators.required),
  //   requiredAmount: new FormControl('', Validators.required),
  //   status: new FormControl('pending', Validators.required),
  //   locale:new FormControl('en', Validators.required),
  //   approveAmount:new FormControl('', Validators.required),
  //   requiredOn:new FormControl('', Validators.required)
  // })


  ngOnInit(): void {
    
  }
  ngOnDestroy() { } 

  close() {
    this.dialogRef.close();
  }

  updateCashLimit(){
    console.log(this.cashLimitForms.value)
      this.crudService.update(`${appModels.FIELDEXECUTIVE}/feCashInHand`,this.cashLimitForms.value,
        this.editCashLimit['id'],
      ).pipe(untilDestroyed(this)).subscribe(updated => {
        this.dialogRef.close(updated);
        this.sharedService.setLoaderShownProperty(false);  
        this.toast.success("Updated Succesfully"); 
  
      })
  }
  


}
