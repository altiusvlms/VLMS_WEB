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

  EmployeeId:any;
  Imagefileform: any;
  Imagefileform2:any;
  engineImgURLS:any;
  engineImgURL:any;
  uploadImages_1:any;
  uploadImages_2:any;
  
  // forvalue : CLASS_NAME;

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute) { }

  submitted: Boolean = false;
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
    

    ImageEmployeeForm = new FormGroup({
      Pan_photo:new FormControl('', Validators.required),
      Aadhar_photo: new FormControl('', Validators.required),
    })



    

  ngOnInit(): void {
    // this.manageEmployee()    
  }

  ngOnDestroy() { }


  submit(){
  }
/** Save Enquiry */
manageEmployee(){

  this.submitted = true;
    const managuserformeObj =  this.manageEmployeeForm.value;
    const permanentAddressObj =  this.employeePermanentAddressForm.value;
    const generalInsuranceObj =  this.generalInsuranceForm.value;
    const accidentalinsuranceObj =  this.accidentalinsuranceForm.value;
    const schoolqualificationObj =  this.schoolqualificationForm.value;
    const allFormValues1 = Object.assign({}, managuserformeObj,permanentAddressObj,generalInsuranceObj,accidentalinsuranceObj,schoolqualificationObj);
    console.log(allFormValues1); 


  this.crudService.post(`${appModels.CREATEEMPLOYEE}`, allFormValues1 ,
    { params:{
      tenantIdentifier: "default"   
    }}
  ).pipe(untilDestroyed(this)).subscribe( data => {
    this.EmployeeId = data.resourceId;
    console.log(this.EmployeeId);
    this.toast.success("posted successfully");

    const formData = new FormData();      
    formData.append("file",this.Imagefileform);
        this.crudService.upload_Image(`${appModels.COMMON}/images/employee_pancard/1`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe( async data => {
            console.log(data)

            const formData = new FormData();      
    formData.append("file",this.Imagefileform2);
        this.crudService.upload_Image(`${appModels.COMMON}/images/employee_adhar/1`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe( async data => {
            console.log(data)
          })
          })

  })
}
// uploadImages1(evt1 : any){
//   {
//   this.Imagefileform = evt1.target.files[0];
//   console.log(this.Imagefileform);
//   }
// }
uploadImages1(evt1: any){
  if(evt1.target.files[0].type == "image/png" || evt1.target.files[0].type == "image/jpeg" || evt1.target.files[0].type == "image/gif"){
  this.Imagefileform = evt1.target.files[0];
  if (evt1.target.files && evt1.target.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(evt1.target.files[0]);
    reader.onload = (event) => {
      this.engineImgURL = event.target['result'];
      }
    }
  }
  else {
    alert("Only GIF, PNG and JPEG Data URL's are allowed.")
  }
}

uploadImages2(evt2: any){
  if(evt2.target.files[0].type == "image/png" || evt2.target.files[0].type == "image/jpeg" || evt2.target.files[0].type == "image/gif"){
  this.Imagefileform2 = evt2.target.files[0];
  if (evt2.target.files && evt2.target.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(evt2.target.files[0]);
    reader.onload = (event) => {
      this.engineImgURLS = event.target['result'];
      }
    }
  }
  else {
    alert("Only GIF, PNG and JPEG Data URL's are allowed.")
  }
}

// uploadImages2(evt2 : any){
//   {
//   this.Imagefileform2 = evt2.target.files[0];
//   console.log(this.Imagefileform2);
//   }
// }
}
