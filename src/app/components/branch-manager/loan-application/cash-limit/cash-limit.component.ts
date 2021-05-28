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
  FieldExicutives:any = [];
  resFieldExecutiveId:any;
  resFieldexeid:any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private crudService: CrudService,private sanitizer:DomSanitizer,private router: Router,private toast: ToastrService) { }

  AddExecutiveForms = new FormGroup({
    feName: new FormControl('', Validators.required),
    cashLimit: new FormControl('', Validators.required),
    locale: new FormControl('en',),
  })
  EditExecutiveForms = new FormGroup({
    Req_Amount: new FormControl('', Validators.required),
    Approve_Amount: new FormControl('', Validators.required),
    Notes: new FormControl('', Validators.required),

  }) 
  ngOnInit(): void {
    this.Cash_hand_Limit();
  }
  ngOnDestroy() { } 
  

  Edit_request(){

  }
  Delete_request(){

  }

  saverequest(){
    this.crudService.post(`${appModels.FIELDEXECUTIVE}/feCashInHand`, this.AddExecutiveForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      this.resFieldExecutiveId = data.resourceId;
      console.log(data)
    })
    this.toast.success("Created Successfully");
  };

  Requestapproveprocess(){

  }
  Edit_changes(){}
 
  AddNew(){
    this.crudService.get(`${appModels.FIELDEXECUTIVE}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.FieldExicutives = data;

    })
  }
  Cash_hand_Limit(){
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/feCashInHand`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.resFieldexeid = data.id
      this.cashLimitData = data;
      this.dataSource = new MatTableDataSource(this.cashLimitData)

    })
  }

}
