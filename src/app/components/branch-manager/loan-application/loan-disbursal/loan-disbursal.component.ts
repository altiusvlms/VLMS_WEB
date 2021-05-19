import { Component, OnInit } from '@angular/core';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import {DomSanitizer} from "@angular/platform-browser";
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  testImage:any;
  CustomerDetail_Data:any;


  constructor(private crudService: CrudService,private sanitizer:DomSanitizer,private router: Router,private toast: ToastrService) { }
    
  requestForms = new FormGroup({
    Cash_Limit: new FormControl('', Validators.required),
    Notes: new FormControl('', Validators.required),
  })    
  ngOnInit(): void {
    this.Loan_Disbural_Limit();
  }
  ngOnDestroy() { } 

  saverequest(){
    this.toast.success("Created Successfully");
  };

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

}
