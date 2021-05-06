import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';



// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-newloan-process',
  templateUrl: './newloan-process.component.html',
  styleUrls: ['./newloan-process.component.scss']
})
export class NewloanProcessComponent implements OnInit {

  vehicle_Id:any;
  resource_Id:any;  
  customer_Id:any;
  guarantor_Id:any;
  bankDetails_Id:any;

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute,public datepipe: DatePipe) {
    this.getUserId();    
   }

  mobile_num = localStorage.getItem("mobile_number");
  submitted: Boolean = false;
  userId : any;
  selectedIndex: any = 0;
  engineImgURL: any;
  enginefileform : any;
  chassisimgURL: any;
  chassisfileform : any;
  policyimgURL: any;
  policyfileform : any;
  liveKMimgURL: any;
  liveKMfileform : any;
  rcBookimgURL: any;
  rcBookfileform : any;
  frontimgURL: any;
  frontfileform : any;
  backimgURL: any;
  backfileform : any;
  side1imgURL: any;
  side1fileform : any;
  side2imgURL: any;
  side2fileform : any;
  appidproofform : any;
  applicantProofImgURL : any
  coidproofform : any;
  coApplicantProofImgURL : any;

  newLoanForm = new FormGroup({
    //applicant
    userId: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    mobileNo: new FormControl('', Validators.required),
    spouseName: new FormControl(''),
    gender: new FormControl(''),
    dob:new FormControl('', Validators.required),
    dateFormat:new FormControl('dd MMMM yyyy', Validators.required),
    locale:new FormControl('en', Validators.required),
    fatherName: new FormControl(''),
    refBy: new FormControl(''),
    companyName:new FormControl('', Validators.required),
    monthlyIncome:new FormControl('', Validators.required),
    salaryDate:new FormControl('', Validators.required),
    salaryPeriod:new FormControl('', Validators.required),
    maritalStatus:new FormControl('', Validators.required),

//co-applicant
    guarantor_mobile_number: new FormControl('', Validators.required),
    guarantor_name: new FormControl('', Validators.required),
    guarantor_fatherName: new FormControl(''),
    guarantor_applicantType: new FormControl('', Validators.required),
    guarantor_companyName: new FormControl('', Validators.required),
    guarantor_netIncome: new FormControl('', Validators.required),
    guarantor_salaryType: new FormControl('', Validators.required),
    guarantor_salaryDate:new FormControl('', Validators.required),
    guarantor_dob:new FormControl("dd MMMM yyyy", Validators.required),
    guarantor_gender:new FormControl("dd MMMM yyyy", Validators.required),
    guarantor_maritalStatus:new FormControl('', Validators.required),
    guarantor_spouseName:new FormControl('', Validators.required),
   
//vechicle 
    vehicleNumber: new FormControl('', Validators.required),
    maker: new FormControl(''),
    model: new FormControl('', Validators.required),
    color: new FormControl(''),
    mfgyear: new FormControl('', Validators.required),
    engineNumber: new FormControl(''),
    chassis_number: new FormControl(''),
    insuranceCompany: new FormControl(''),
    insurancePolicy: new FormControl(''),
    insuranceExpiry: new FormControl(''),
    kmReading: new FormControl(''),
    noofOwner: new FormControl(''),
  //loan  
    loanAmount: new FormControl('', Validators.required),
    loanTerm: new FormControl('', Validators.required),
    loanInterest: new FormControl('', Validators.required),
    emi: new FormControl('', Validators.required),
    interestINR: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),

  //bank 
    accountNumber: new FormControl('', Validators.required),
    accountHolderName: new FormControl('', Validators.required),
    IFSC: new FormControl('', Validators.required),
    bankName: new FormControl('', Validators.required),
    branchName: new FormControl('', Validators.required),

  //addresss
  
  customer_officeAddress : new FormGroup({
    addressLine1:new FormControl(''),
    addressLine2:new FormControl(''),
    area:new FormControl(''),
    city:new FormControl(''),
    country:new FormControl(''),
    landmark:new FormControl(''),
    pincode:new FormControl(''),
    state:new FormControl(''),
    }),
    customer_permanentAddress : new FormGroup({
      addressLine1:new FormControl(''),
      addressLine2:new FormControl(''),
      area:new FormControl(''),
      city:new FormControl(''),
      country:new FormControl(''),
      landmark:new FormControl(''),
      pincode:new FormControl(''),
      state:new FormControl(''),
      }),
      customer_communicationAddress : new FormGroup({
        addressLine1:new FormControl(''),
        addressLine2:new FormControl(''),
        area:new FormControl(''),
        city:new FormControl(''),
        country:new FormControl(''),
        landmark:new FormControl(''),
        pincode:new FormControl(''),
        state:new FormControl(''),
        }),
        guarantor_officeAddress : new FormGroup({
          addressLine1:new FormControl(''),
          addressLine2:new FormControl(''),
          area:new FormControl(''),
          city:new FormControl(''),
          country:new FormControl(''),
          landmark:new FormControl(''),
          pincode:new FormControl(''),
          state:new FormControl(''),
          }),
          guarantor_permanentAddress : new FormGroup({
            addressLine1:new FormControl(''),
            addressLine2:new FormControl(''),
            area:new FormControl(''),
            city:new FormControl(''),
            country:new FormControl(''),
            landmark:new FormControl(''),
            pincode:new FormControl(''),
            state:new FormControl(''),
            }),
            guarantor_communicationAddress : new FormGroup({
              addressLine1:new FormControl(''),
              addressLine2:new FormControl(''),
              area:new FormControl(''),
              city:new FormControl(''),
              country:new FormControl(''),
              landmark:new FormControl(''),
              pincode:new FormControl(''),
              state:new FormControl(''),
              })

    })




  ngOnInit(): void {
  }
  ngOnDestroy() { }

  tabClick(tabChangeEvent : any){
    this.selectedIndex = tabChangeEvent.index;
  }
  nextStep(){
    this.selectedIndex += 1;
  }
  previousStep() {
    this.selectedIndex -= 1;
  }
  getUserId(){
    this.crudService.get(`${appModels.USERS}/${this.mobile_num}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.userId = data.id;
    })
  }


 
  uploadEngineImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.enginefileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.engineImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }

  uploadChassisImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.chassisfileform = evt.target.files[0];
      if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.chassisimgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }

  uploadPolicyImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.policyfileform = evt.target.files[0];
      if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.policyimgURL = event.target['result'];
      }
    }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }

  uploadLiveKMImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.liveKMfileform = evt.target.files[0];
      if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.liveKMimgURL = event.target['result'];
      }
    }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }

  uploadRcBookImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.rcBookfileform = evt.target.files[0];
      if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.rcBookimgURL = event.target['result'];
      }
    }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadFrontImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.frontfileform = evt.target.files[0];
      if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.frontimgURL = event.target['result'];
      }
    }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadBackImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.backfileform = evt.target.files[0];
      if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.backimgURL = event.target['result'];
      }
    }
  }
  else {
    alert("Only GIF, PNG and JPEG Data URL's are allowed.")
  }
  }
  uploadSide1Images(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.side1fileform = evt.target.files[0];
      if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.side1imgURL = event.target['result'];
      }
    }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadSide2Images(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.side2fileform = evt.target.files[0];
      if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.side2imgURL = event.target['result'];
      }
    }
  }
  else {
    alert("Only GIF, PNG and JPEG Data URL's are allowed.")
  }
  }

  uploadAppIdProofImages(evt: any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.appidproofform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.applicantProofImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }

  uploadCoAppIdProofImages(evt: any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.coidproofform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.coApplicantProofImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }

  saveNewLoan(){
    this.getUserId();    
    this.submitted = true;
    console.log(this.userId)
    console.log(this.newLoanForm.value)
    this.newLoanForm.value.salaryDate = this.datepipe.transform(this.newLoanForm.value.salaryDate, 'dd MMMM yyyy');
    this.newLoanForm.value.dob = this.datepipe.transform(this.newLoanForm.value.dob, 'dd MMMM yyyy');
    this.newLoanForm.value.guarantor_salaryDate = this.datepipe.transform(this.newLoanForm.value.guarantor_salaryDate, 'dd MMMM yyyy');
    this.newLoanForm.value.guarantor_dob = this.datepipe.transform(this.newLoanForm.value.guarantor_dob, 'dd MMMM yyyy');
    this.newLoanForm.value.dueDate = this.datepipe.transform(this.newLoanForm.value.dueDate, 'dd MMMM yyyy');
    this.newLoanForm.value.userId = this.userId;
if(this.userId !== undefined || null){
      this.crudService.post(`${appModels.NEWLOAN}`, this.newLoanForm.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( async data => {
      console.log(data)
      this.vehicle_Id = data.vehicleId;
      this.resource_Id = data.resourceId;
      this.customer_Id = data.customerId;
      this.guarantor_Id = data.guarantorId;
      this.bankDetails_Id = data.bankDetailsId;

    if (this.vehicle_Id !== undefined || null){
      const formData = new FormData();      
      formData.append("file",this.enginefileform);
         await this.crudService.upload_Image(`${appModels.COMMON}/images/engine/${this.vehicle_Id}`, formData,
          { params:{
                tenantIdentifier: "default"   
              }}
          ).pipe(untilDestroyed(this))
            .subscribe( async data => {
              console.log(data)

              const formData = new FormData();      
              formData.append("file",this.chassisfileform);
                 await this.crudService.upload_Image(`${appModels.COMMON}/images/chassis/${this.vehicle_Id}`, formData,
                  { params:{
                        tenantIdentifier: "default"   
                      }}
                  ).pipe(untilDestroyed(this))
                    .subscribe(data => {
                      console.log(data)
                    })
            })
          }
    })
    
  }
     
 
    
  }

}
