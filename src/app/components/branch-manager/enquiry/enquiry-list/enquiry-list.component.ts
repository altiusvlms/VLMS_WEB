/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

/** Custom Forms */
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';


// import { untilDestroyed } from '@ngneat/until-destroy';


/** Enquiry List Component */
@Component({
  selector: 'vlms-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {
  
  submitted: Boolean = false;
  showGenerateModel:Boolean = false;
  responseEnquiryId:any;

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService) { }

    /** Create Enquiry Form */
    createEnquiryForms = new FormGroup({
      customerName: new FormControl(''),
      mobileNumber: new FormControl('', Validators.required),
      vehicleNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      enquiryId: new FormControl(''),
    })

  ngOnInit(): void {
  }

  ngOnDestroy() { }

 /** Page Navigation for Loan Application */
  createLoan(){
    this.router.navigate(['branch-manager/loan-process']);

  }
 /** Save Enquiry */
  saveEnquiry(){
    this.submitted = true;
    this.crudService.post(`${appModels.FIELDEXECUTIVE}/enquiry`, this.createEnquiryForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe().subscribe( data => {
      this.showGenerateModel = true;
      this.responseEnquiryId = data.resourceId;
      console.log(data)
      this.toast.success("Created Successfully");
    })
  }




}
