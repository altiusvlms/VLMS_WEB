import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';


// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormArray, AbstractControl } from '@angular/forms';


import {DomSanitizer} from "@angular/platform-browser";
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
import { CLASS_NAME } from '@angular/flex-layout';
import { single } from 'rxjs/operators';
import { generalAccidentialIns } from './manage-employee.model';

@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
  
})


export class ManageEmployeeComponent implements OnInit {

  id:any;
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
  employeeList :  any = [];
  resourceID: any;
  employee :any;
  singleData:any;
  employeeEducationDetails:any;
  employeeInsuranceDetails:any;
  showSpouse : Boolean = false;
  documentDetails : any;
  generalAccidentialIns : generalAccidentialIns;

  // manageEmployeeForm:any  
  // forvalue : CLASS_NAME;
  // userForm: FormGroup;
  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute, public datepipe: DatePipe, private fb: FormBuilder,private sanitizer:DomSanitizer) { }

  submitted: Boolean = false;

  // this.forvalue = form1.value;
  // this.formvalue.school_qualification = form2.value;
  // this.formvalue.college_qualification = form3.value;

  addPhone(): void {
    (this.manageEmployeeForm.get('altNumber') as FormArray).push(
      this.fb.control(null)
    );
  }

  removePhone(index : any) {
    (this.manageEmployeeForm.get('altNumber') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray> this.manageEmployeeForm.get('altNumber')).controls
  }

  send(values : any) {
    console.log(values);
  }
  

  manageEmployeeForm = new FormGroup({

    // User detail
    name : new FormControl('', Validators.required),
    calledName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    altNumber: new FormControl('', Validators.required),
    // altNumber: this.fb.array([
    //   this.fb.control(null)
    // ]),
    dob: new FormControl('', Validators.required),
    officialNumber: new FormControl('', Validators.required),
    age: new FormControl(''),
    maritalStatus: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    spousename: new FormControl('', Validators.required),
    bloodGroup: new FormControl('', Validators.required),
    fatherName: new FormControl('', Validators.required),
    vehicleNumber: new FormControl('', Validators.required),
    agtnumber: new FormControl('', Validators.required),
    doj: new FormControl('', Validators.required),
    dateFormat:new FormControl('dd MMMM yyyy', Validators.required),
    vehicleType:new FormControl('', Validators.required),
    

    // Add bank details
    // bankDetails :  new FormGroup({
    loanEligibleAmount:new FormControl('', Validators.required),
    accountType:new FormControl('', Validators.required),
    accountNumber:new FormControl('', Validators.required),
    accountHolderName:new FormControl('', Validators.required),
    IFSC:new FormControl('', Validators.required),
    bankName:new FormControl('', Validators.required),
    branchName:new FormControl('', Validators.required),
    locale:new FormControl('en', Validators.required),
    // }),

    employee_communicationAddress :  new FormGroup({
      addressLine1:new FormControl(''),
      addressLine2:new FormControl(''),
      landmark:new FormControl(''),
      postalCode:new FormControl(''),
      area:new FormControl(''),
      city:new FormControl(''),
      state:new FormControl('')
    }),

    employee_permanentAddress  : new FormGroup({
      addressLine1:new FormControl(''),
      addressLine2:new FormControl(''),
      landmark:new FormControl(''),
      postalCode:new FormControl(''),
      area:new FormControl(''),
      city:new FormControl(''),
      state:new FormControl('')
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
      university:new FormControl(''),
      qualification: new FormControl(''),
      percentage : new FormControl(''),
      passingyear : new FormControl(''),
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
      // proof1: new FormControl('', Validators.required),
      // proof2: new FormControl('', Validators.required),
    }) 



  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      // this.employeeEducationDetails();
      // this.employeeInsuranceDetails();
    })
    if(this.id != undefined){
      this.getSingleEmployeeList();
      }
      this.getDocumentDetails();
  }
  

  ngOnDestroy() { }

  
  
  onMaritalStatusChange(value : any){
    if(value === 'married'){
      this.showSpouse = true;
    }
    else{
      this.showSpouse = false;
    }
  }

  getDocumentDetails(){
    this.crudService.get(`${appModels.GET_DOCUMENT_DETAILS}`,
    { params:{
      tenantIdentifier: "default"   
    }}
  ).pipe(untilDestroyed(this)).subscribe( response => {
    this.documentDetails = response;
  });
  }

/** Save Enquiry */
manageEmployee(){
// if(this.manageEmployeeForm.invalid) {
//   alert("Please Enter Required Fields")
//   return;
// }
  this.submitted = true;
  console.log(this.manageEmployeeForm.value)
  this.manageEmployeeForm.value.dob=this.datepipe.transform(this.manageEmployeeForm.value.dob, 'dd MMMM yyyy');
  this.manageEmployeeForm.value.doj=this.datepipe.transform(this.manageEmployeeForm.value.doj, 'dd MMMM yyyy');
  this.crudService.post(`${appModels.CREATEEMPLOYEE}`, this.manageEmployeeForm.value ,
    { params:{
      tenantIdentifier: "default"   
    }}
  ).pipe(untilDestroyed(this)).subscribe( data => {
    this.responseId = data;
    console.log("data")
    console.log(data.resourceId)
    console.log(this.responseId)
    this.toast.success("Employee Created successfully")
    this.EmployeeId = data.resourceId;
  
const formData = new FormData();      
formData.append("file",this.Imagefileform);
    this.crudService.upload_Image(`${appModels.COMMON}/images/employee_adhar/${this.EmployeeId}`, formData,
    { params:{
          documentNumber:"12345" ,
          tenantIdentifier: "default"   
        }}
    ).pipe(untilDestroyed(this))
      .subscribe( async data => {
        console.log(data)

        const formData = new FormData();      
formData.append("file",this.Imagefileform2);
    this.crudService.upload_Image(`${appModels.COMMON}/images/employee_pancard/${this.EmployeeId}`, formData,
    { params:{
          documentNumber:"12345" ,
          tenantIdentifier: "default"   
        }}
    ).pipe(untilDestroyed(this))
      .subscribe( async data => {
        console.log(data)
      })
      })
  
        })
  
  
}


employeeArray: any = [];
data : any;

getSingleEmployeeList(){
  console.log("id")
  console.log(this.id)
  this.crudService.get(`${appModels.GETEMPLOYEE}`, {
    params: {
      tenantIdentifier: 'default'
    }
  }).pipe(untilDestroyed(this)).subscribe(async response => {
    console.log(response)
    for (var singleData of response) {
      if(singleData.id == this.id){
        this.employeeArray.push(singleData)
        await this.crudService.get_Image(`${appModels.IMAGES}/employee_adhar/${singleData.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.engineImgURL = this.sanitizer.bypassSecurityTrustUrl(data);
        })
        await this.crudService.get_Image(`${appModels.IMAGES}/employee_pancard/${singleData.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.engineImgURLS = this.sanitizer.bypassSecurityTrustUrl(data);
        })
      }
    }
 
    console.log(this.employeeArray)

    
     
this.manageEmployeeForm.patchValue({
    name: this.employeeArray[0].name,
    calledName:this.employeeArray[0].calledName,
    surName:this.employeeArray[0].surName,
    mobileNumber: this.employeeArray[0].mobileNumber,
    altNumber: this.employeeArray[0].altNumber,
    officialNumber: this.employeeArray[0].officialNumber,
    dob:this.datepipe.transform(this.employeeArray[0].dob, 'yyyy-MM-dd'),
    gender: this.employeeArray[0].gender,
    age: this.employeeArray[0].age,
    maritalStatus: this.employeeArray[0].maritalStatus,
    designation: this.employeeArray[0].designation,
    spousename: this.employeeArray[0].spousename,
    bloodGroup: this.employeeArray[0].bloodGroup,
    fatherName: this.employeeArray[0].fatherName,
    agtnumber: this.employeeArray[0].agtnumber,
    vehicleNumber: this.employeeArray[0].vehicleNumber,
    doj: this.datepipe.transform(this.employeeArray[0].dob, 'yyyy-MM-dd'),
    dateFormat: "dd MMMM yyyy",
    locale: 'en',

    loanEligibleAmount: this.employeeArray[0].bankDetails.loanEligibleAmount,
    accountType: this.employeeArray[0].bankDetails.accountType,
    accountNumber: this.employeeArray[0].bankDetails.accountNumber,
    accountHolderName: this.employeeArray[0].bankDetails.accountHolderName,
    IFSC: this.employeeArray[0].bankDetails.IFSC,
    bankName: this.employeeArray[0].bankDetails.bankName,
    branchName: this.employeeArray[0].bankDetails.branchName,
    
// replace("\"\"", "")
  employee_communicationAddress:{
    addressLine1:this.employeeArray[0].communicationAdd.addressLine1,
    addressLine2: this.employeeArray[0].communicationAdd.addressLine2,
    area : this.employeeArray[0].communicationAdd.area,
    city : this.employeeArray[0].communicationAdd.city,
    landmark : this.employeeArray[0].communicationAdd.landmark,
    postalCode : this.employeeArray[0].communicationAdd.postalCode,
    state : this.employeeArray[0].communicationAdd.state
},

  employee_permanentAddress:{
    addressLine1:this.employeeArray[0].permanentAdd.addressLine1,
    addressLine2: this.employeeArray[0].permanentAdd.addressLine2,
    area : this.employeeArray[0].permanentAdd.area,
    city : this.employeeArray[0].permanentAdd.city,
    landmark : this.employeeArray[0].permanentAdd.landmark,
    postalCode : this.employeeArray[0].permanentAdd.postalCode,
    state : this.employeeArray[0].permanentAdd.state,
},

  school_qualification:{
    university:this.employeeArray[0].schoolQualification.university,
    qualification: this.employeeArray[0].schoolQualification.qualification,
    percentage : this.employeeArray[0].schoolQualification.percentage,
    passingyear : this.employeeArray[0].schoolQualification.passingyear,
  },

  college_qualification:{
  university:this.employeeArray[0].collegeQualification.university,
  qualification: this.employeeArray[0].collegeQualification.qualification,
  percentage : this.employeeArray[0].collegeQualification.percentage,
  passingyear : this.employeeArray[0].collegeQualification.passingyear,
  },

  graduate_qualification:{
  university:this.employeeArray[0].graduateQualification.university,
  qualification: this.employeeArray[0].graduateQualification.qualification,
  percentage : this.employeeArray[0].graduateQualification.percentage,
  passingyear : this.employeeArray[0].graduateQualification.passingyear,
  },

  postgraduate_qualification:{
  university:this.employeeArray[0].postgraduateQualification.university,
  qualification: this.employeeArray[0].postgraduateQualification.qualification,
  percentage : this.employeeArray[0].postgraduateQualification.percentage,
  passingyear : this.employeeArray[0].postgraduateQualification.passingyear,
  },
  
  
    
  general_insurance:{
  policyNumber:this.employeeArray[0].insuranceDetails.policyNumber,
  companyCoverage: this.employeeArray[0].insuranceDetails.companyCoverage,
  policyCoverage : this.employeeArray[0].insuranceDetails.policyCoverage,
  },
  accidental_insurance:{
    policyNumber:this.employeeArray[0].accidentalInsuranceDetails.policyNumber,
    companyCoverage: this.employeeArray[0].accidentalInsuranceDetails.companyCoverage,
    policyCoverage : this.employeeArray[0].accidentalInsuranceDetails.policyCoverage,
    }
    
})

})
}


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

updateEmployeeDetails(){
  console.log("this.manageEmployeeForm.value")
  // console.log(this.manageEmployeeForm.value)
  this.manageEmployeeForm.value.dob=this.datepipe.transform(this.manageEmployeeForm.value.dob, 'dd MMMM yyyy');
  this.manageEmployeeForm.value.doj=this.datepipe.transform(this.manageEmployeeForm.value.doj, 'dd MMMM yyyy');
  this.crudService.update(`${appModels.EMPLOYEE}/updateEmployee`,this.manageEmployeeForm.value,
  this.id,
  ).pipe(untilDestroyed(this)).subscribe(response => {
  this.toast.success("Updated Successfully");
})
}

updateEmployeeEducationDetails(){
  // console.log("this.manageEmployeeForm.value")
  console.log(this.manageEmployeeForm.value)
  this.crudService.update(`${appModels.EMPLOYEE}/updateQualification`,this.manageEmployeeForm.value.school_qualification,
  this.id,
  ).pipe(untilDestroyed(this)).subscribe(response => {
    this.employeeEducationDetails = response;
})
}
// this.generalAccidentialIns,
updateEmployeeInsuranceDetails(){
  this.generalAccidentialIns.general_insurance = this.manageEmployeeForm.value.general_insurance.value
  this.generalAccidentialIns.accidental_insurance = this.manageEmployeeForm.value.accidental_insurance.value
  console.log("this.manageEmployeeForm.value")
  // console.log(this.manageEmployeeForm.value)
  // this.manageEmployeeForm.value.dob=this.datepipe.transform(this.manageEmployeeForm.value.dob, 'dd MMMM yyyy');
  // this.manageEmployeeForm.value.doj=this.datepipe.transform(this.manageEmployeeForm.value.doj, 'dd MMMM yyyy');
  this.crudService.update(`${appModels.EMPLOYEE}/updateInsurance`,this.generalAccidentialIns,
  this.id,
  ).pipe(untilDestroyed(this)).subscribe(response => {
    this.employeeInsuranceDetails = response;
})
}

}
