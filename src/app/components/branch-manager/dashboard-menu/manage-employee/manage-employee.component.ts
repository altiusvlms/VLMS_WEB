/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Forms and Routing and Services */
import { Router, ActivatedRoute ,Params} from '@angular/router';
import { CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { DomSanitizer} from "@angular/platform-browser";
import { SharedService } from '../../../../services/shared.service';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Create Manage Employee */
@Component({
  selector: 'vlms-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
  
})


export class ManageEmployeeComponent implements OnInit {

/** Manage Employee Variables */
  id:any;
  EmployeeId:any;
  age:number;
  resourceID: any;
  showSpouse : Boolean = false;
  documentDetails : any;
  submitted: Boolean = false;
  Imagefileform0: any;
  Imagefileform1: any;
  Imagefileform2:any;
  imageURL0: any;
  imageURL1: any;
  imageURL2: any;

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute, public datepipe: DatePipe, private fb: FormBuilder,private sanitizer:DomSanitizer,private sharedService: SharedService) {
   }

/** Manage Employee Forms */

  manageEmployeeForm = new FormGroup({
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
    agtnumber: new FormControl('', Validators.required),
    doj: new FormControl('', Validators.required),
    dateFormat:new FormControl('dd MMMM yyyy', Validators.required),
    vehicleType:new FormControl('', Validators.required),
    

    loanEligibleAmount:new FormControl('', Validators.required),
    accountType:new FormControl('', Validators.required),
    accountNumber:new FormControl('', Validators.required),
    accountHolderName:new FormControl('', Validators.required),
    IFSC:new FormControl('', Validators.required),
    bankName:new FormControl('', Validators.required),
    branchName:new FormControl('', Validators.required),
    locale:new FormControl('en', Validators.required),

    employee_communicationAddress :  new FormGroup({
      addressLine1:new FormControl(''),
      addressLine2:new FormControl(''),
      landmark:new FormControl(''),
      pincode:new FormControl(''),
      area:new FormControl(''),
      city:new FormControl(''),
      state:new FormControl('')
    }),

    employee_permanentAddress  : new FormGroup({
      addressLine1:new FormControl(''),
      addressLine2:new FormControl(''),
      landmark:new FormControl(''),
      pincode:new FormControl(''),
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

  documentImageForm = new FormGroup({
    image: this.fb.array([]) 
  })
  
  image() : FormArray {
    return this.documentImageForm.get("image") as FormArray;
  }

  newImage(): FormGroup {
    return this.fb.group({
      documentName: '',
      documentNo: ''
    })
  }
   
  addImage() {
    this.image().push(this.newImage());
  }
   
  removeImage(i:number) {
    this.image().removeAt(i);
  }

  ngOnInit(): void {
      this.getDocumentDetails();
  }
  
  ngOnDestroy() { }

/** Show Spouse Name Fields Based on Marital Status */
  onMaritalStatusChange(value : any){
    if(value === 'married'){
      this.showSpouse = true;
    }
    else{
      this.showSpouse = false;
    }
  }

/** Manage Employee Get Document Details */
  getDocumentDetails(){
    this.crudService.get(`${appModels.GET_DOCUMENT_DETAILS}`,
    { params:{
      tenantIdentifier: "default"   
    }}
  ).pipe(untilDestroyed(this)).subscribe( response => {
    this.documentDetails = response;
    this.sharedService.setLoaderShownProperty(false); 

  });
  }

/** CalculateAge Based on DateOfBirth */
  CalculateAge(){
    if (this.manageEmployeeForm.value.dob) {
    var timeDiff = Math.abs(Date.now() - new Date(this.manageEmployeeForm.value.dob).getTime());
    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    this.manageEmployeeForm.value.age = this.age;
    }
  }


  uploadImages(event: any,index:any){
    if(event.target.files[0].type == "image/png" || event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/gif"){
    if(index == 0){
    if (event.target.files && event.target.files[0]) {
      this.Imagefileform0 = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imageURL0 = event.target['result'];     
        }
      }
    }
    else if(index == 1){
      if (event.target.files && event.target.files[0]) {
        this.Imagefileform1 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          this.imageURL1 = event.target['result'];
          }
        }
      }
    else if(index == 2){
      if (event.target.files && event.target.files[0]) {
        this.Imagefileform2 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
        this.imageURL2 = event.target['result'];
         } 
        }
      }    
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }

  }
  
  
  createEmployee(){
  this.submitted = true;
  this.manageEmployeeForm.value.dob=this.datepipe.transform(this.manageEmployeeForm.value.dob, 'dd MMMM yyyy');
  this.manageEmployeeForm.value.doj=this.datepipe.transform(this.manageEmployeeForm.value.doj, 'dd MMMM yyyy');

  this.crudService.post(`${appModels.CREATEEMPLOYEE}`, this.manageEmployeeForm.value ,
    { params:{
      tenantIdentifier: "default"   
    }}
  ).pipe(untilDestroyed(this)).subscribe(async response => {
    this.toast.success("Employee Created successfully")
    this.EmployeeId = response.resourceId;
    this.sharedService.setLoaderShownProperty(false); 
  for(let document of  this.documentImageForm.value.image){
  
      const formData = new FormData();      
      formData.append("file",this.Imagefileform0);
      await this.crudService.upload_Image(`${appModels.COMMON}/images/employee_adhar/${this.EmployeeId}`, formData,
          { params:{
                documentNumber: document.documentNo,
                tenantIdentifier: "default"   
              }}
          ).pipe(untilDestroyed(this))
            .subscribe( async data => {
              console.log(data)
              this.sharedService.setLoaderShownProperty(false); 

              const formData = new FormData();      
              formData.append("file",this.Imagefileform1);
              await  this.crudService.upload_Image(`${appModels.COMMON}/images/employee_vehicle_licence/${this.EmployeeId}`, formData,
                  { params:{
                        documentNumber: document.documentNo,
                        tenantIdentifier: "default"   
                      }}
                  ).pipe(untilDestroyed(this))
                    .subscribe(async data => {
                      console.log(data) 
                      this.sharedService.setLoaderShownProperty(false); 


      const formData = new FormData();      
      formData.append("file",this.Imagefileform2);
      await  this.crudService.upload_Image(`${appModels.COMMON}/images/employee_pancard/${this.EmployeeId}`, formData,
          { params:{
                documentNumber: document.documentNo,
                tenantIdentifier: "default"   
              }}
          ).pipe(untilDestroyed(this))
            .subscribe( data => {
              console.log(data)
              this.sharedService.setLoaderShownProperty(false); 

            })
            })
          })
        }
  })
  
  
}


employeeArray: any = [];
data : any;

// getSingleEmployeeList(){
//   console.log("id")
//   console.log(this.id)
//   this.crudService.get(`${appModels.GETEMPLOYEE}`, {
//     params: {
//       tenantIdentifier: 'default'
//     }
//   }).pipe(untilDestroyed(this)).subscribe(async response => {
//     console.log(response)
//     for (var singleData of response) {
//       if(singleData.id == this.id){
//         this.employeeArray.push(singleData)
//         await this.crudService.get_Image(`${appModels.IMAGES}/employee_adhar/${singleData.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
//           this.ImgURL1 = this.sanitizer.bypassSecurityTrustUrl(data);
//         })
//         await this.crudService.get_Image(`${appModels.IMAGES}/employee_pancard/${singleData.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
//           this.ImgURL2 = this.sanitizer.bypassSecurityTrustUrl(data);
//         })
//       }
//     }
//     console.log(this.employeeArray)



// })
// }




}


@UntilDestroy({ checkProperties: true })

/** Create Manage Employee */
@Component({
  selector: 'vlms-manage-employee',
  templateUrl: './edit-manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
  
})


export class EditManageEmployeeComponent implements OnInit {
   
  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute, public datepipe: DatePipe, private fb: FormBuilder,private sanitizer:DomSanitizer,private sharedService: SharedService) {
  }

  id:any;
  showSpouse : Boolean = false;
  documentDetails : any;
  age: number;
  submitted: Boolean = false;
  showUpdateBtn: Boolean = false;
  communicationAddID: any;
  permanentAddID: any;
 bankID: any;
 insuranceID: any;
accidentalID : any;
 schoolID: any;
 collegeID: any;
 graduateID: any;
 postGraduateID: any;

  manageEmployeeDetailsForm = new FormGroup({
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
    agtnumber: new FormControl('', Validators.required),
    doj: new FormControl('', Validators.required),
    dateFormat:new FormControl('dd MMMM yyyy', Validators.required),
    locale: new FormControl('en', Validators.required),
    vehicleType:new FormControl('', Validators.required)
  })
  manageEmployeeAddressForm = new FormGroup({
  communicationAdd :  new FormGroup({
    addressLine1:new FormControl(''),
    addressLine2:new FormControl(''),
    landmark:new FormControl(''),
    postalCode:new FormControl(''),
    area:new FormControl(''),
    city:new FormControl(''),
    state:new FormControl('')
        }),
        permanentAdd  : new FormGroup({
          addressLine1:new FormControl(''),
          addressLine2:new FormControl(''),
          landmark:new FormControl(''),
          postalCode:new FormControl(''),
          area:new FormControl(''),
          city:new FormControl(''),
          state:new FormControl('')
        }),
  })

  manageEmployeeBankDetailForm = new FormGroup({
    bankDetails:new FormGroup({
      loanEligibleAmount:new FormControl('', Validators.required),
      accountType:new FormControl('', Validators.required),
      accountNumber:new FormControl('', Validators.required),
      accountHolderName:new FormControl('', Validators.required),
      IFSC:new FormControl('', Validators.required),
      bankName:new FormControl('', Validators.required),
      branchName:new FormControl('', Validators.required),
      disbursalType:new FormControl('', Validators.required)
      }),
  })
  manageEmployeeInsuranceForm = new FormGroup({
    insuranceDetails :  new FormGroup({
      policyNumber:new FormControl('',),
      companyCoverage:new FormControl('',),
      policyCoverage:new FormControl('',),
    })
  })
  manageEmployeeaccidentInsuranceForm = new FormGroup({
      accidentalInsuranceDetails:  new FormGroup({
      policyNumber:new FormControl('',),
      companyCoverage:new FormControl('',),
      policyCoverage:new FormControl('',),
    })
  })
  manageEmployeeQualificationForm = new FormGroup({

    schoolQualification : new FormGroup({
      university:new FormControl(''),
      qualification: new FormControl(''),
      percentage : new FormControl(''),
      passingyear : new FormControl(''),
    }),
    
    collegeQualification : new FormGroup({
      university:new FormControl('',),
      qualification: new FormControl('',),
      percentage : new FormControl('',),
      passingyear: new FormControl('',),
    }),
  
    graduateQualification :  new FormGroup({
      university:new FormControl('',),
      qualification: new FormControl('',),
      percentage : new FormControl('',),
      passingyear : new FormControl('',),
    }),

    postgraduateQualification :  new FormGroup({
      university:new FormControl('',),
      qualification: new FormControl('',),
      percentage : new FormControl('',),
      passingyear: new FormControl('',),
    })
  })

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log( this.id)
      if(this.id !== undefined || null){
        this.getSingleEmployeeList();
        this.manageEmployeeDetailsForm.disable();
        this.manageEmployeeAddressForm.disable();
        this.manageEmployeeBankDetailForm.disable();
        this.manageEmployeeInsuranceForm.disable();
        this.manageEmployeeaccidentInsuranceForm.disable();
        this.manageEmployeeQualificationForm.disable();

      }
    })
    this.getDocumentDetails();
  }

  
  documentImageForm = new FormGroup({
    image: this.fb.array([]) 
  })
  
  image() : FormArray {
    return this.documentImageForm.get("image") as FormArray;
  }

  newImage(): FormGroup {
    return this.fb.group({
      documentName: '',
      documentNo: '',
    })
  }
   
  addImage() {
    this.image().push(this.newImage());

  }
   
  removeImage(i:number) {
    this.image().removeAt(i);
  }


  /** Show Spouse Name Fields Based on Marital Status */
  onMaritalStatusChange(value : any){
    if(value === 'married'){
      this.showSpouse = true;
    }
    else{
      this.showSpouse = false;
    }
  }

  /** Manage Employee Get Document Details */
  getDocumentDetails(){
    this.crudService.get(`${appModels.GET_DOCUMENT_DETAILS}`,
    { params:{
      tenantIdentifier: "default"   
    }}
  ).pipe(untilDestroyed(this)).subscribe( response => {
    this.documentDetails = response;
    this.sharedService.setLoaderShownProperty(false); 
  });
  }

  /** CalculateAge Based on DateOfBirth */
  CalculateAge(){
    if (this.manageEmployeeDetailsForm.value.dob) {
    var timeDiff = Math.abs(Date.now() - new Date(this.manageEmployeeDetailsForm.value.dob).getTime());
    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    this.manageEmployeeDetailsForm.value.age = this.age;
    }
  }

 
  getSingleEmployeeList(){
    console.log(this.id)
    this.crudService.get(`${appModels.GETEMPLOYEE}/${this.id}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {
      console.log(response)
      this.sharedService.setLoaderShownProperty(false); 

      this.communicationAddID = response.communicationAdd.id;
      this.permanentAddID = response.permanentAdd.id;
      this.bankID = response.bankDetails.id;
      this.insuranceID = response.insuranceDetails.Id;
      this.accidentalID = response.accidentalInsuranceDetails.Id;
      this.schoolID = response.schoolQualification.Id;
      this.collegeID = response.collegeQualification.Id;
      this.graduateID = response.graduateQualification.Id;
      this.postGraduateID = response.postgraduateQualification.Id;

      this.manageEmployeeDetailsForm.patchValue({
        name: response.name,
        calledName:response.calledName,
        surName:response.surName,
        mobileNumber: response.mobileNumber,
        altNumber: response.altNumber,
        officialNumber: response.officialNumber,
        dob:this.datepipe.transform(response.dob, 'yyyy-MM-dd'),
        gender: response.gender,
        age: response.age,
        maritalStatus:response.maritalStatus,
        designation:response.designation,
        spousename: response.spousename,
        bloodGroup:response.bloodGroup,
        fatherName: response.fatherName,
        agtnumber: response.agtnumber,
        vehicleNumber: response.vehicleNumber,
        doj: this.datepipe.transform(response.dob, 'yyyy-MM-dd'),
      })
      this.manageEmployeeAddressForm.patchValue({
        communicationAdd:{
        addressLine1:response.communicationAdd.addressLine1,
        addressLine2: response.communicationAdd.addressLine2,
        area : response.communicationAdd.area,
        city : response.communicationAdd.city,
        landmark : response.communicationAdd.landmark,
        postalCode : response.communicationAdd.postalCode,
        state : response.communicationAdd.state
        },
        permanentAdd:{
          addressLine1:response.permanentAdd.addressLine1,
          addressLine2: response.permanentAdd.addressLine2,
          area : response.permanentAdd.area,
          city : response.permanentAdd.city,
          landmark : response.permanentAdd.landmark,
          postalCode : response.permanentAdd.postalCode,
          state : response.permanentAdd.state,
      }
      })
      this.manageEmployeeBankDetailForm.patchValue({
        bankDetails:{
          loanEligibleAmount: response.bankDetails.loanEligibleAmount,
          accountType: response.bankDetails.accountType,
          accountNumber: response.bankDetails.accountNumber,
          accountHolderName: response.bankDetails.accountHolderName,
          IFSC: response.bankDetails.IFSC,
          bankName: response.bankDetails.bankName,
          branchName: response.bankDetails.branchName,
          disbursalType: response.bankDetails.disbursalType
          }
      })
      this.manageEmployeeInsuranceForm.patchValue({
        insuranceDetails:{
          policyNumber: JSON.parse(response.insuranceDetails.policyNumber),
          companyCoverage: JSON.parse(response.insuranceDetails.companyCoverage),
          policyCoverage : JSON.parse(response.insuranceDetails.policyCoverage),
          }
      })
      this.manageEmployeeaccidentInsuranceForm.patchValue({
        accidentalInsuranceDetails:{
          policyNumber:JSON.parse(response.accidentalInsuranceDetails.policyNumber),
          companyCoverage: JSON.parse(response.accidentalInsuranceDetails.companyCoverage),
          policyCoverage : JSON.parse(response.accidentalInsuranceDetails.policyCoverage),
          }
      })

      this.manageEmployeeQualificationForm.patchValue({
        schoolQualification:{
            university:JSON.parse(response.schoolQualification.university),
            qualification: JSON.parse(response.schoolQualification.qualification),
            percentage : JSON.parse(response.schoolQualification.percentage),
            passingyear : JSON.parse(response.schoolQualification.passingyear),
          },
        
        collegeQualification:{
          university:JSON.parse(response.collegeQualification.university),
          qualification: JSON.parse(response.collegeQualification.qualification),
          percentage : JSON.parse(response.collegeQualification.percentage),
          passingyear : JSON.parse(response.collegeQualification.passingyear),
          },
        
        graduateQualification:{
          university:JSON.parse(response.graduateQualification.university),
          qualification: JSON.parse(response.graduateQualification.qualification),
          percentage : JSON.parse(response.graduateQualification.percentage),
          passingyear : JSON.parse(response.graduateQualification.passingyear),
          },
        
        postgraduateQualification:{
          university:JSON.parse(response.postgraduateQualification.university),
          qualification: JSON.parse(response.postgraduateQualification.qualification),
          percentage : JSON.parse(response.postgraduateQualification.percentage),
          passingyear : JSON.parse(response.postgraduateQualification.passingyear),
          }

    })
    })
  }

  editEmployeeDetails(){
    this.manageEmployeeDetailsForm.enable();
    this.showUpdateBtn = true;
  }
  
  editEmployeeAddress(){
    this.showUpdateBtn = true;
    this.manageEmployeeAddressForm.enable();
  }
  editEmployeeBankDetails(){
    this.showUpdateBtn = true;
    this.manageEmployeeBankDetailForm.enable();
  }
  editEmployeeInsurance(){
    this.showUpdateBtn = true;
    this.manageEmployeeInsuranceForm.enable();
  }
  editEmployeeAccidentInsurance(){
    this.showUpdateBtn = true;
    this.manageEmployeeaccidentInsuranceForm.enable();
  }
  editEmployeeQualification(){
    this.showUpdateBtn = true;
    this.manageEmployeeQualificationForm.enable();
  }
  updateEmployeeDetails(){
    this.manageEmployeeDetailsForm.value.dob=this.datepipe.transform(this.manageEmployeeDetailsForm.value.dob, 'dd MMMM yyyy');
    this.manageEmployeeDetailsForm.value.doj=this.datepipe.transform(this.manageEmployeeDetailsForm.value.doj, 'dd MMMM yyyy');
    this.crudService.update(`${appModels.EMPLOYEE}/updateEmployee`,this.manageEmployeeDetailsForm.value,
    this.id,
    ).pipe(untilDestroyed(this)).subscribe(response => {
    this.toast.success("Updated Successfully");
    this.manageEmployeeDetailsForm.disable();
  })
  }

  updateEmployeeAddress(){
    this.crudService.update(`${appModels.CUSTOMERS}/address`,this.manageEmployeeAddressForm.value.communicationAdd,
    this.communicationAddID,
    ).pipe(untilDestroyed(this)).subscribe(async response => {
  
   await this.crudService.update(`${appModels.CUSTOMERS}/address`,this.manageEmployeeAddressForm.value.permanentAdd,
      this.permanentAddID,
      ).pipe(untilDestroyed(this)).subscribe(response => {
    this.toast.success("Updated Successfully");
    this.manageEmployeeAddressForm.disable();
      })
  })
  }

  updateEmployeeBankDetail(){
    this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyBankDetails`,this.manageEmployeeBankDetailForm.value.bankDetails,
    this.id,
    ).pipe(untilDestroyed(this)).subscribe(response => {
    this.toast.success("Updated Successfully");
    })
  }
  updateEmployeeInsurance(){
    console.log(this.insuranceID)
    this.crudService.update(`${appModels.EMPLOYEE}/updateInsurance`,this.manageEmployeeInsuranceForm.value.insuranceDetails,
    this.insuranceID,
    ).pipe(untilDestroyed(this)).subscribe(response => {
    this.toast.success("Updated Successfully");
    })
  }
  updateEmployeeAccidentInsurance(){
    this.crudService.update(`${appModels.EMPLOYEE}/updateInsurance`,this.manageEmployeeaccidentInsuranceForm.value.accidentalInsuranceDetails,
    this.accidentalID,
    ).pipe(untilDestroyed(this)).subscribe(response => {
    this.toast.success("Updated Successfully");
    })
  }
  updateEmployeeQualification(){
    this.crudService.update(`${appModels.EMPLOYEE}/updateQualification`,this.manageEmployeeQualificationForm.value.schoolQualification,
    this.schoolID,
    ).pipe(untilDestroyed(this)).subscribe(async response => {

   await this.crudService.update(`${appModels.EMPLOYEE}/updateQualification`,this.manageEmployeeQualificationForm.value.collegeQualification,
    this.collegeID,
    ).pipe(untilDestroyed(this)).subscribe(async response => {

    await this.crudService.update(`${appModels.EMPLOYEE}/updateQualification`,this.manageEmployeeQualificationForm.value.graduateQualification,
    this.graduateID,
    ).pipe(untilDestroyed(this)).subscribe(async response => {

    await this.crudService.update(`${appModels.EMPLOYEE}/updateQualification`,this.manageEmployeeQualificationForm.value.postgraduateQualification,
      this.postGraduateID,
      ).pipe(untilDestroyed(this)).subscribe(response => {
    })
    })
    })
    })
 
  }
}
