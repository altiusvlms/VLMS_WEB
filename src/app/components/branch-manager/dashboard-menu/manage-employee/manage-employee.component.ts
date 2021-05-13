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

  ID1s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard']
  ID2s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard']

  EmployeeId:any;
  Imagefileform: any;
  Imagefileform2:any;
  engineImgURLS:any;
  engineImgURL:any;
  uploadImages_1:any;
  uploadImages_2:any;
  responseId:any;
  dob :string;
  age:number;
  // manageEmployeeForm:any  
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
    age: new FormControl(''),
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
    locale:new FormControl('en', Validators.required),
   

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
    ImageEmployeeForm = new FormGroup({
      Pan_photo:new FormControl('', Validators.required),
      Aadhar_photo: new FormControl('', Validators.required),
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
  this.submitted = true;
  // if (this.manageEmployeeForm.valid) {
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
    this.toast.success("Employee Created successfully")
    this.EmployeeId = data.resourceId;
    console.log(this.EmployeeId);
    // this.toast.success("posted successfully");

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
      // }
      // else {
      //   alert("Please Enter Required Fields")
      // }
  
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

CalculateAge(){
  
  console.log(this.manageEmployeeForm.value.dob)
  if (this.manageEmployeeForm.value.dob) {
    var timeDiff = Math.abs(Date.now() - new Date(this.manageEmployeeForm.value.dob).getTime());
    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    console.log("age")
    console.log(this.age);
    this.manageEmployeeForm.value.age = this.age;
  }

}


}
