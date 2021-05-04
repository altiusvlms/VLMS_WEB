import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';

// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
import { CLASS_NAME } from '@angular/flex-layout';

@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
  
})


export class ManageEmployeeComponent implements OnInit {

  responseId:any;
  // forvalue : CLASS_NAME;

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute) { }

  // this.forvalue = form1.value;
  // this.formvalue.school_qualification = form2.value;
  // this.formvalue.college_qualification = form3.value;

  manageEmployeeForm = new FormGroup({
    name : new FormControl('', Validators.required),
    calledName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    altNumber: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    officialNumber: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    maritalStatus: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    spousename: new FormControl('', Validators.required),
    bloodGroup: new FormControl('', Validators.required),
    fatherName: new FormControl('', Validators.required),
    vehicleNumber: new FormControl('', Validators.required),
    doj: new FormControl('', Validators.required),
    dateFormat:new FormControl('', Validators.required),
    vehicleType:new FormControl('', Validators.required),

    // Add bank details
    accountNumber:new FormControl('', Validators.required),
    accountHolderName:new FormControl('', Validators.required),
    IFSC:new FormControl('', Validators.required),
    bankName:new FormControl('', Validators.required),
    branchName:new FormControl('', Validators.required),
    accountType:new FormControl('', Validators.required),
    })

    employeePermanentAddressForm = new FormGroup({
      addressLine1:new FormControl('', Validators.required),
      addressLine2:new FormControl('', Validators.required),
      landmark:new FormControl('', Validators.required),
      pincode:new FormControl('', Validators.required),
      area:new FormControl('', Validators.required),
      city:new FormControl('', Validators.required),
      country:new FormControl('', Validators.required),
    })

    generalInsuranceForm = new FormGroup({
      policyNumber:new FormControl('', Validators.required),
      companyCoverage:new FormControl('', Validators.required),
      policyCoverage:new FormControl('', Validators.required),
    })

    accidentalinsuranceForm = new FormGroup({
      policyNumber:new FormControl('', Validators.required),
      companyCoverage:new FormControl('', Validators.required),
      policyCoverage:new FormControl('', Validators.required),
    })

    schoolqualificationForm = new FormControl ({
      university:new FormControl('', Validators.required),
      qualification: new FormControl('', Validators.required),
      percentage : new FormControl('', Validators.required)
    })
    



    

  ngOnInit(): void {
    // this.manageEmployee()    
  }

  ngOnDestroy() { }


  submit(){
    this.manageEmployee()    
  }
/** Save Enquiry */
manageEmployee(){
  this.crudService.post(`${appModels.CREATEEMPLOYEE}`, this.manageEmployeeForm.value,
    { params:{
      tenantIdentifier: "default"   
    }}
  ).pipe(untilDestroyed(this)).subscribe( data => {
    this.responseId = data.resourceId;
    console.log("data")
    console.log(data)
    this.toast.success("posted successfully")
  })
}
  
}
