import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';



// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { SharedService } from '../../../../services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import {DomSanitizer} from "@angular/platform-browser";
import { Options, LabelType } from 'ng5-slider';



import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-newloan-process',
  templateUrl: './newloan-process.component.html',
  styleUrls: ['./newloan-process.component.scss']
})
export class NewloanProcessComponent implements OnInit {
  vehicletransectionhistory: any;
  vehiclechallanhistory: any;

  // EMI
  pemi = {
    value: "25"
  }
  remi = {
    value: "8.5"
  }
  temi = {
    value: "20"
  }
  memi = {
    value: "240"
  }

  query = {
    amount: "",
    interest: "",
    tenureYr: "",
    tenureMo: ""
  }

  result = {
    emi: "",
    interest: "",
    total: ""
  }

  yrToggel: boolean;
  poptions: Options = {
    floor: 1,
    ceil: 200,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>L</b>';
        case LabelType.High:
          return value + '<b>L</b>';
        default:
          return value + '<b>L</b>';
      }
    }
  };
  roptions: Options = {
    floor: 5,
    ceil: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>%</b>';
        case LabelType.High:
          return value + '<b>%</b>';
        default:
          return value + '<b>%</b>';
      }
    }
  };
  toptions: Options = {
    floor: 1,
    ceil: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Yr</b>';
        case LabelType.High:
          return value + '<b>Yr</b>';
        default:
          return value + '<b>Yr</b>';
      }
    }
  };
  moptions: Options = {
    floor: 1,
    ceil: 360,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Mo</b>';
        case LabelType.High:
          return value + '<b>Mo</b>';
        default:
          return value + '<b>Mo</b>';
      }
    }

    
  };



  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService,private sanitizer:DomSanitizer, private route: ActivatedRoute,public datepipe: DatePipe,private sharedService: SharedService) {
    this.getUserId();    
   }

  //  EMI
   ngAfterViewInit() {
    this.update();
  }

  tbupdate(id : any) {
    if (id == 0) {
      this.pemi.value = (Number(this.query.amount) / 100000 ).toString();
    }
    else if (id == 1) {
      this.remi.value = this.query.interest;
    }
    else if (id == 2) {
      this.temi.value = this.query.tenureYr;
    }
    else if (id == 3) {
      this.memi.value = this.query.tenureMo;
    }
    this.update();
  }

  mobile_num = localStorage.getItem("mobile_number");
  id:any;
  submitted: Boolean = false;
  userId : any;
  selectedIndex: any = 0;
  vehicle_Id: any;
  resource_Id: any;  
  customer_Id: any;
  guarantor_Id: any;
  bankDetails_Id: any;
  createnewLoan_id: any = [];
  fileInputLabel:any;

  applicantfileform : any;
  applicantImgURL: any;
  applicantAadharfileform : any;
  applicantAadharImgURL: any;
  applicantPanfileform : any;
  applicantPanImgURL: any;
  applicantDrivingfileform : any;
  applicantDrivingImgURL: any;
  applicantVoterfileform : any;
  applicantVoterImgURL: any;


  co_applicantfileform : any;
  co_applicantImgURL: any;
  co_applicantAadharfileform : any;
  co_applicantAadharImgURL: any;
  co_applicantPanfileform : any;
  co_applicantPanImgURL: any;
  co_applicantDrivingfileform : any;
  co_applicantDrivingImgURL: any;
  co_applicantVoterfileform : any;
  co_applicantVoterImgURL: any;

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
 
  passBookfileform: any;
  passBookimgURL: any;

  customerList :  any = [];
  resourceID:any;

  newLoanForm = new FormGroup({
    //applicant
    userId: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    applicantType: new FormControl(''),
    mobileNo: new FormControl('', Validators.required),
    altNumber: new FormControl(''),
    spouseName: new FormControl(''),
    gender: new FormControl(''),
    dob:new FormControl('', Validators.required),
    dateFormat:new FormControl('dd MMMM yyyy'),
    locale:new FormControl('en'),
    fatherName: new FormControl(''),
    refBy: new FormControl(''),
    companyName:new FormControl(''),
    monthlyIncome:new FormControl(''),
    salaryDate:new FormControl(''),
    salaryPeriod:new FormControl(''),
    maritalStatus:new FormControl(''),

//co-applicant
    guarantor_mobile_number: new FormControl('', Validators.required),
    guarantor_name: new FormControl('', Validators.required),
    guarantor_fatherName: new FormControl(''),
    guarantor_applicantType: new FormControl(''),
    guarantor_companyName: new FormControl(''),
    guarantor_netIncome: new FormControl(''),
    guarantor_salaryType: new FormControl(''),
    guarantor_salaryDate:new FormControl(''),
    guarantor_dob:new FormControl(''),
    guarantor_gender:new FormControl(''),
    guarantor_maritalStatus:new FormControl(''),
    guarantor_spouseName:new FormControl(''),
   
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
    loanAmount: new FormControl(''),
    loanTerm: new FormControl(''),
    loanInterest: new FormControl(''),
    emi: new FormControl(''),
    interestINR: new FormControl(''),
    dueDate: new FormControl(''),

    principal: new FormControl('5000'),
    loanTermFrequency: new FormControl('15'),
    numberOfRepayments: new FormControl('5'),
    interestRatePerPeriod: new FormControl('3'),
    expectedDisbursementDate: new FormControl('30 May 2021'),
    productId: new FormControl('1'),
    disbursementData: new FormControl('[]'),
    repaymentEvery: new FormControl('1'),
    repaymentFrequencyType: new FormControl('2'),
    allowPartialPeriodInterestCalcualtion: new FormControl('false'),
    transactionProcessingStrategyId: new FormControl('1'),
    loanTermFrequencyType: new FormControl('2'),
    amortizationType: new FormControl('1'),
    isEqualAmortization: new FormControl('false'),
    interestType: new FormControl('0'),
    interestCalculationPeriodType: new FormControl('1'),
    rates: new FormControl('[]'),
    loanType: new FormControl('individual'),
    submittedOnDate: new FormControl('30 May 2021'),

  //bank 
    accountNumber: new FormControl(''),
    accountHolderName: new FormControl(''),
    loanEligibleAmount: new FormControl(''),
    IFSC: new FormControl(''),
    bankName: new FormControl(''),
    branchName: new FormControl(''),
    disbursalType: new FormControl(''),
    accountType: new FormControl(''),

  //addresss
  
  customer_officeAddress : new FormGroup({
    addressLine1:new FormControl(''),
    addressLine2:new FormControl(''),
    area:new FormControl(''),
    city:new FormControl(''),
    landmark:new FormControl(''),
    pincode:new FormControl(''),
    state:new FormControl(''),
    }),
    customer_permanentAddress : new FormGroup({
      addressLine1:new FormControl(''),
      addressLine2:new FormControl(''),
      area:new FormControl(''),
      city:new FormControl(''),
      landmark:new FormControl(''),
      pincode:new FormControl(''),
      state:new FormControl(''),
    }),
    customer_communicationAddress : new FormGroup({
        addressLine1:new FormControl(''),
        addressLine2:new FormControl(''),
        area:new FormControl(''),
        city:new FormControl(''),
        landmark:new FormControl(''),
        pincode:new FormControl(''),
        state:new FormControl(''),
    }),
    guarantor_officeAddress : new FormGroup({
          addressLine1:new FormControl(''),
          addressLine2:new FormControl(''),
          area:new FormControl(''),
          city:new FormControl(''),
          landmark:new FormControl(''),
          pincode:new FormControl(''),
          state:new FormControl(''),
    }),
    guarantor_permanentAddress : new FormGroup({
            addressLine1:new FormControl(''),
            addressLine2:new FormControl(''),
            area:new FormControl(''),
            city:new FormControl(''),
            landmark:new FormControl(''),
            pincode:new FormControl(''),
            state:new FormControl(''),
    }),
    guarantor_communicationAddress : new FormGroup({
              addressLine1:new FormControl(''),
              addressLine2:new FormControl(''),
              area:new FormControl(''),
              city:new FormControl(''),
              landmark:new FormControl(''),
              pincode:new FormControl(''),
              state:new FormControl(''),
    })

  })


  approverForm = new FormGroup({
    approvedOnDate: new FormControl('30 May 2021'),
    approvedLoanAmount: new FormControl('6000'),
    expectedDisbursementDate: new FormControl('30 May 2021'),
    disbursementData: new FormControl('[]'),
    dateFormat:new FormControl('dd MMMM yyyy'),
    locale:new FormControl('en'),
  })

  
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.getEnrollData(); 
    
  }
  async getEnrollData() {
    console.log(this.id)
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnroll/${this.id}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {
      this.sharedService.setLoaderShownProperty(false);  

      console.log(response.id)
      this.customerList.push(response);
      this.newLoanForm.patchValue({
          customerName: response.customerName,
          mobileNo:response.mobileNumber,
          altNumber: response.alternateMobileNumber,
          applicantType:response.applicantType,
          gender: response.gender,
          dob:this.datepipe.transform(response.dob, 'yyyy-MM-dd'),
          fatherName: response.fatherName,         
        
      })
    
    this.resourceID = this.customerList[0].id;
    console.log(this.resourceID)
    
       this.crudService.get_Image(`${appModels.IMAGES}/enroll_customerimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
           this.applicantImgURL = this.sanitizer.bypassSecurityTrustUrl(data);
           console.log(this.applicantImgURL)
         })
         this.crudService.get_Image(`${appModels.IMAGES}/enroll_adharphoto/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.applicantAadharImgURL = this.sanitizer.bypassSecurityTrustUrl(data);
          console.log(this.applicantAadharImgURL)
        })
        this.crudService.get_Image(`${appModels.IMAGES}/enroll_pancard/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.applicantPanImgURL = this.sanitizer.bypassSecurityTrustUrl(data);
          console.log(this.applicantPanImgURL)
        })
        
        })
  }


  // ngOnInit(): void {
  // }
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
      this.sharedService.setLoaderShownProperty(false);  

    })
  }

  Uploadvehicletransectionhistory(evt : any){
    this.vehicletransectionhistory = evt.target.files[0];
  }
  Uploadvehiclechallanhistory(evt : any){
    this.vehiclechallanhistory = evt.target.files[0];
  }
  
  uploadApplicantImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.applicantfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.applicantImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadApplicantAadharImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.applicantAadharfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.applicantAadharImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadApplicantPanImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.applicantPanfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.applicantPanImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadApplicantDrivingImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.applicantDrivingfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.applicantDrivingImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadApplicantVoterImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.applicantVoterfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.applicantVoterImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }


  uploadCo_ApplicantImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.co_applicantfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.co_applicantImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadCo_ApplicantAadharImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.co_applicantAadharfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.co_applicantAadharImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadCo_ApplicantPanImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.co_applicantPanfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.co_applicantPanImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadCo_ApplicantDrivingImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.co_applicantDrivingfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.co_applicantDrivingImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadCo_ApplicantVoterImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.co_applicantVoterfileform = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.co_applicantVoterImgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
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
 
  uploadPassBookImages(evt : any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.passBookfileform = evt.target.files[0];
      if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.passBookimgURL = event.target['result'];
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
    // if(this.newLoanForm.valid){
    console.log(this.userId)
    console.log(this.newLoanForm.value)
    this.newLoanForm.value.salaryDate = this.datepipe.transform(this.newLoanForm.value.salaryDate, 'dd MMMM yyyy');
    this.newLoanForm.value.dob = this.datepipe.transform(this.newLoanForm.value.dob, 'dd MMMM yyyy');
    this.newLoanForm.value.guarantor_salaryDate = this.datepipe.transform(this.newLoanForm.value.guarantor_salaryDate, 'dd MMMM yyyy');
    this.newLoanForm.value.guarantor_dob = this.datepipe.transform(this.newLoanForm.value.guarantor_dob, 'dd MMMM yyyy');
    this.newLoanForm.value.dueDate = this.datepipe.transform(this.newLoanForm.value.dueDate, 'dd MMMM yyyy');
    this.newLoanForm.value.insuranceExpiry = this.datepipe.transform(this.newLoanForm.value.insuranceExpiry, 'dd MMMM yyyy');
    this.newLoanForm.value.userId = this.userId;
    
    if(this.userId !== undefined || null){
          this.crudService.post(`${appModels.NEWLOAN}`, this.newLoanForm.value,
          { params:{
            tenantIdentifier: "default"   
          }}
        ).pipe(untilDestroyed(this)).subscribe( async data => {
          console.log(data)
          this.sharedService.setLoaderShownProperty(false);  

          this.vehicle_Id = data.vehicleId;
          this.resource_Id = data.resourceId;
          this.customer_Id = data.customerId;
          this.guarantor_Id = data.guarantorId;
          this.bankDetails_Id = data.bankDetailsId;

          this.crudService.post(`${appModels.APPROVEL}/${this.resource_Id}`, this.approverForm.value,
          { params:{
            command: "approve"   
          }}
        ).pipe(untilDestroyed(this)).subscribe( async data => {
          this.sharedService.setLoaderShownProperty(false);  
          console.log(data)
        })

    //Applicant   
      if (this.customer_Id !== undefined || null){

        if(this.applicantfileform !== undefined || null){
        const formData = new FormData();      
          formData.append("file",this.applicantfileform);
          await this.crudService.upload_Image(`${appModels.IMAGES}/customerimage/${this.customer_Id}`, formData,
          { params:{
            tenantIdentifier: "default"   
          }}
          ).pipe(untilDestroyed(this)).subscribe( async data => {
            this.createnewLoan_id.push(data);
          })
        }
        else if(this.applicantAadharfileform !== undefined || null){
          const formData = new FormData();      
          formData.append("file",this.applicantAadharfileform);       
          await this.crudService.upload_Image(`${appModels.IMAGES}/adharphoto/${this.customer_Id}`, formData,
          { params:{
          tenantIdentifier: "default"   
          }}
          ).pipe(untilDestroyed(this)).subscribe( async data => {
            this.createnewLoan_id.push(data);
          })
        }
        else if(this.applicantPanfileform !== undefined || null){
          const formData = new FormData();      
          formData.append("file",this.applicantPanfileform);       
          await this.crudService.upload_Image(`${appModels.IMAGES}/pancard/${this.customer_Id}`, formData,
          { params:{
            tenantIdentifier: "default"   
          }}
          ).pipe(untilDestroyed(this)).subscribe( async data => {
            this.createnewLoan_id.push(data);
          })          
        }
        else if(this.applicantDrivingfileform !== undefined || null){
          const formData = new FormData();      
          formData.append("file",this.applicantDrivingfileform);       
          await this.crudService.upload_Image(`${appModels.IMAGES}/vehicle_licence/${this.customer_Id}`, formData,
          { params:{
            tenantIdentifier: "default"   
          }}
          ).pipe(untilDestroyed(this)).subscribe(async data => {
              this.createnewLoan_id.push(data);
          }) 
        }
      }

    //Co-Applicant 
      else if(this.guarantor_Id !== undefined || null){

        if(this.co_applicantfileform !== undefined || null){
          const formData = new FormData();      
          formData.append("file",this.co_applicantfileform);
          await this.crudService.upload_Image(`${appModels.IMAGES}/guarantorImage/${this.guarantor_Id}`, formData,
          { params:{
            tenantIdentifier: "default"   
          }}
          ).pipe(untilDestroyed(this)).subscribe( async data => {
            this.createnewLoan_id.push(data);
          })
        }
       else if(this.co_applicantAadharfileform !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.co_applicantAadharfileform);
        await this.crudService.upload_Image(`${appModels.IMAGES}/g_adharphoto/${this.guarantor_Id}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => {
          this.createnewLoan_id.push(data);
        })   
       }
       else if(this.co_applicantPanfileform !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.co_applicantPanfileform);
        await this.crudService.upload_Image(`${appModels.IMAGES}/g_pancard/${this.guarantor_Id}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => { 
          this.createnewLoan_id.push(data);
        })   
       }
       else if(this.co_applicantDrivingfileform !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.co_applicantDrivingfileform);
        await this.crudService.upload_Image(`${appModels.IMAGES}/g_vehicle_licence/${this.guarantor_Id}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => { 
          this.createnewLoan_id.push(data);
        })   
       }

      }

    //Vehicle
      else if (this.vehicle_Id !== undefined || null){
        if(this.enginefileform !== undefined || null){
          const formData = new FormData();      
          formData.append("file",this.enginefileform);
          await this.crudService.upload_Image(`${appModels.IMAGES}/engine/${this.vehicle_Id}`, formData,
          { params:{
            tenantIdentifier: "default"   
          }}
          ).pipe(untilDestroyed(this)).subscribe( async data => {
            this.createnewLoan_id.push(data);
          })    
        }
       else if(this.chassisfileform !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.chassisfileform);
        await this.crudService.upload_Image(`${appModels.IMAGES}/chassis/${this.vehicle_Id}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe(async data => {
          this.createnewLoan_id.push(data);
        })   
       }
       else if(this.policyfileform !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.policyfileform);
        await this.crudService.upload_Image(`${appModels.IMAGES}/vehicleinsurance/${this.vehicle_Id}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe(data => {
          this.createnewLoan_id.push(data);
        }) 
       }
       else if(this.vehicletransectionhistory !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.vehicletransectionhistory);
        await this.crudService.upload_Image(`${appModels.IMAGES}/vehicle_transaction_history/${this.vehicle_Id}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe(data => {
          this.createnewLoan_id.push(data);
        }) 
       }
       else if(this.vehiclechallanhistory !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.vehiclechallanhistory);
        await this.crudService.upload_Image(`${appModels.IMAGES}/vehicle_chalan_report/${this.vehicle_Id}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe(data => {
          this.createnewLoan_id.push(data);
        }) 
       }


      }

    //Bank     
      else if(this.bankDetails_Id ! == undefined || null){

        if(this.passBookfileform !== undefined || null){
          const formData = new FormData();      
          formData.append("file",this.passBookfileform);
          await this.crudService.upload_Image(`${appModels.IMAGES}/bank/${this.bankDetails_Id}`, formData,
          { params:{
            tenantIdentifier: "default"   
          }}
          ).pipe(untilDestroyed(this)).subscribe( async data => {
            this.createnewLoan_id.push(data);
          })   
        }

      }

    //Resource Based Image 
      else if(this.resource_Id ! == undefined || null){
      //Applicant voter image
      if(this.applicantVoterfileform !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.applicantVoterfileform);
        await this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resource_Id}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => {
          this.createnewLoan_id.push(data);
        })    
      }

      //Co-Applicant voter image
     else if(this.co_applicantVoterfileform !== undefined || null){
      const formData = new FormData();      
      formData.append("file",this.co_applicantVoterfileform);
      await this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resource_Id}`, formData,
      { params:{
        tenantIdentifier: "default"   
      }}
      ).pipe(untilDestroyed(this)).subscribe( async data => {
        this.createnewLoan_id.push(data);
      })   
     }

      //Vehicle Live KM image
    else if(this.liveKMfileform !== undefined || null){
      const formData = new FormData();      
      formData.append("file",this.liveKMfileform);
      await this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resource_Id}`, formData,
      { params:{
        tenantIdentifier: "default"   
      }}
      ).pipe(untilDestroyed(this)).subscribe( async data => {
        this.createnewLoan_id.push(data);
      })    
    }

      //Vehicle RC Book image
    else if(this.rcBookfileform !== undefined || null){
      const formData = new FormData();      
      formData.append("file",this.rcBookfileform);
      await this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resource_Id}`, formData,
      { params:{
        tenantIdentifier: "default"   
      }}
      ).pipe(untilDestroyed(this)).subscribe( async data => {
        this.createnewLoan_id.push(data);
      })    
    }
  
      //Vehicle Front image
    else if(this.frontfileform !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.frontfileform);
        await this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resource_Id}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => {
          this.createnewLoan_id.push(data);
        })   
    }  
       
      //Vehicle Back image
    else if(this.backfileform !== undefined || null){
      const formData = new FormData();      
      formData.append("file",this.backfileform);
      await this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resource_Id}`, formData,
      { params:{
        tenantIdentifier: "default"   
      }}
      ).pipe(untilDestroyed(this)).subscribe( async data => {
        this.createnewLoan_id.push(data);
      })
    }

      //Vehicle Side1 image
      else if(this.side1fileform !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.side1fileform);
        await this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resource_Id}`, formData,
            { params:{
              tenantIdentifier: "default"   
            }}
            ).pipe(untilDestroyed(this)).subscribe( async data => {
              this.createnewLoan_id.push(data);
            })  
      }  

      //Vehicle Side2 image
      else if(this.side2fileform !== undefined || null){
        const formData = new FormData();      
        formData.append("file",this.side2fileform);
          await this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resource_Id}`, formData,
            { params:{
              tenantIdentifier: "default"   
            }}
            ).pipe(untilDestroyed(this)).subscribe( async data => {
              this.createnewLoan_id.push(data);
            })
      }
      
      }
    })
    this.toast.success("Images Upload Successfully");
    }
    console.log(this.createnewLoan_id)
    this.toast.success("Loan Submitted Successfully");
    this.router.navigate(['branch-manager/loan-verification'])

  // }
  // else{
  //   alert("Please Enter Required Fields")
  // }
}

// EMI
TotalInterest:any;
TotalPayable:any;
MonthlyCorrectDue:any
update() {
  // debugger
  var loanAmount = Number(this.query.amount);
  var rateOfInterest = Number(this.query.interest);
  var numberOfMonths = (this.yrToggel) ? (Number(this.query.tenureYr) * 12) : Number(this.query.tenureMo);
  // var monthlyInterestRatio = (rateOfInterest / 100) / 12;
   this.TotalInterest = (loanAmount * rateOfInterest) / 100;

   this.TotalPayable = loanAmount + this.TotalInterest;

   var MonthlyDue = this.TotalPayable / numberOfMonths;
   this.MonthlyCorrectDue = Number (Math.round(MonthlyDue))
}
}
