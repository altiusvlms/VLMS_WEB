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

  submitted: Boolean = false;
  // this.forvalue = form1.value;
  // this.formvalue.school_qualification = form2.value;
  // this.formvalue.college_qualification = form3.value;

  manageEmployeeForm = new FormGroup({

    // User detail
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
    dateFormat:new FormControl('dd MMMM yyyy', Validators.required),
    vehicleType:new FormControl('', Validators.required),

    // Add bank details
    loanEligibleAmount:new FormControl('', Validators.required),
    accountType:new FormControl('', Validators.required),
    accountNumber:new FormControl('', Validators.required),
    accountHolderName:new FormControl('', Validators.required),
    IFSC:new FormControl('', Validators.required),
    bankName:new FormControl('', Validators.required),
    branchName:new FormControl('', Validators.required),
    locale:new FormControl('', Validators.required),
   

    employee_communicationAddress :  new FormGroup({
      addressLine1:new FormControl('',),
      addressLine2:new FormControl('',),
      landmark:new FormControl('',),
      pincode:new FormControl('',),
      area:new FormControl('',),
      city:new FormControl('',),
      country:new FormControl('',)
    }),

    employee_permanentAddress  : new FormGroup({
      addressLine1:new FormControl('',),
      addressLine2:new FormControl('',),
      landmark:new FormControl('',),
      pincode:new FormControl('',),
      area:new FormControl('',),
      city:new FormControl('',),
      country:new FormControl('',)
    }),

    general_insurance :  new FormGroup({
      policyNumber:new FormControl('',),
      companyCoverage:new FormControl('',),
      policyCoverage:new FormControl('',),
    }),

    accidental_insurance :  new FormGroup({
      policyNumber:new FormControl('',),
      companyCoverage:new FormControl('',),
      policyCoverage:new FormControl('',),
    }),

    school_qualification : new FormGroup({
      university:new FormControl('',),
      qualification: new FormControl('',),
      percentage : new FormControl('',),
      passingyear : new FormControl('',),
    }),
    
    college_qualification : new FormGroup({
      university:new FormControl('',),
      qualification: new FormControl('',),
      percentage : new FormControl('',),
      passingyear: new FormControl('',),
    }),
  
    graduate_qualification :  new FormGroup({
      university:new FormControl('',),
      qualification: new FormControl('',),
      percentage : new FormControl('',),
      passingyear : new FormControl('',),
    }),

    postgraduate_qualification :  new FormGroup({
      university:new FormControl('',),
      qualification: new FormControl('',),
      percentage : new FormControl('',),
      passingyear: new FormControl('',),
    })

  })

  

  // const ELEMENT_DATA: UsersData[] = [
  //   {id: 1560608769632, name: 'Artificial Intelligence'},
  //   {id: 1560608796014, name: 'Machine Learning'},
  //   {id: 1560608787815, name: 'Robotic Process Automation'},
  //   {id: 1560608805101, name: 'Blockchain'}

  ngOnInit(): void {
    // this.manageEmployee()    
  }

  ngOnDestroy() { }



/** Save Enquiry */
manageEmployee(){
  // console.log("data")
  // console.log(data)
  // this.submitted = true;
  //   const managuserformeObj =  this.manageEmployeeForm.value;
  //   const communicationAddressObj = this.employeeCommunicationAddressForm.value;
  //   const permanentAddressObj =  this.employeePermanentAddressForm.value;
  //   const generalInsuranceObj =  this.generalInsuranceForm.value;
  //   const accidentalinsuranceObj =  this.accidentalinsuranceForm.value;
  //   const schoolqualificationObj =  this.schoolqualificationForm.value;
  //   const collegequalificationObj = this.collegeQualificationForm.value;
  //   const graduatequalificationObj = this.graduateQualificationForm.value;
  //   const postqualificationObj = this.postgraduateQualificationForm.value;
  //   const allFormValues1 = Object.assign({}, managuserformeObj,communicationAddressObj,permanentAddressObj,generalInsuranceObj,accidentalinsuranceObj,schoolqualificationObj,collegequalificationObj,graduatequalificationObj,postqualificationObj);
  //   console.log(allFormValues1); 
  console.log("datass")
  console.log(this.manageEmployeeForm.value)

  this.crudService.post(`${appModels.CREATEEMPLOYEE}`, this.manageEmployeeForm.value ,
    { params:{
      tenantIdentifier: "default"   
    }}
  ).pipe(untilDestroyed(this)).subscribe( data => {
    this.responseId = data.resourceId;
    console.log("data")
    console.log(this.responseId)
    this.toast.success("posted successfully")
  })
}


  
}
