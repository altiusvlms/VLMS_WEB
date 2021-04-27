/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

/** Loan Process Component */ 
@Component({
  selector: 'vlms-loan-process',
  templateUrl: './loan-process.component.html',
  styleUrls: ['./loan-process.component.scss']
})
export class LoanProcessComponent implements OnInit {


  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService) { }
        
  createLoanForms = new FormGroup({
    customerName: new FormControl('', Validators.required),
    vehicleType: new FormControl('', Validators.required),
    dealer: new FormControl('', Validators.required),
    invoiceNumber: new FormControl('', Validators.required),
    
    })
  
  ngOnInit(): void {
  }

  saveEnquirys(){
    this.crudService.post(`${appModels.LOANPROCESS}`, this.createLoanForms.value, 
    { params:{
      tenantIdentifier: "default"   
    }}
    ).pipe().subscribe( data => {
      // this.showGenerateModel = true;
      console.log(data)
      this.toast.success("Created Successfully");
    })
  }

}
