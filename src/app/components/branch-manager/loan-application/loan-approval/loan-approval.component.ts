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
  selector: 'vlms-loan-approval',
  templateUrl: './loan-approval.component.html',
  styleUrls: ['./loan-approval.component.scss']
})
export class LoanApprovalComponent implements OnInit {


  
  displayedColumns = ['Sr no','Branch', 'Requested On', 'Requested Loan Amount','Approved Amount',
  'Status','Action'];
  dataSource = new MatTableDataSource();
  loanApprovalData: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  constructor(private crudService: CrudService,private sanitizer:DomSanitizer,private router: Router,private toast: ToastrService) { }

  requestForms = new FormGroup({
    Cash_Limit: new FormControl('', Validators.required),
    Notes: new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this.Loan_Approval_Limit();
  }
  ngOnDestroy() { } 
  
  saverequest(){
    this.toast.success("Created Successfully");
  };
 
  Loan_Approval_Limit(){
    this.crudService.get(`${appModels.Employee}/getLoanApproval`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.loanApprovalData = data;
      this.dataSource = new MatTableDataSource(this.loanApprovalData)

    })
  }

}
