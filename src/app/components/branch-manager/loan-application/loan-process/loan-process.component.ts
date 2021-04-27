/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';

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
       
  id:any;


  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute) { }


    vehicleDetailsForm = new FormGroup({
      vehicleNumber: new FormControl('', Validators.required)
      })
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.getCustomerDetails();
  }
  
  getCustomerDetails(){
    this.crudService.get(`${appModels.COMMON}/customers/loanByLoanId/${this.id}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe().subscribe(data => {
      console.log(data.vehicleDetails)
      this.vehicleDetailsForm
      .patchValue({
        vehicleNumber: data.vehicleDetails.vehicleNumber,
      });
    })
  }



}
