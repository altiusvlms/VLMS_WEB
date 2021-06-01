/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';

// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {DomSanitizer} from "@angular/platform-browser";
import { DatePipe } from '@angular/common';


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Loan Process Component */ 
@Component({
  selector: 'vlms-loan-process',
  templateUrl: './loan-process.component.html',
  styleUrls: ['./loan-process.component.scss']
})
export class LoanProcessComponent implements OnInit {
  
  
  
  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute,private sanitizer:DomSanitizer,public datepipe: DatePipe) { }

 
  mobile_num = localStorage.getItem("mobile_number");
  id:any;
  selectedIndex: any = 0;
  customerList :  any = [];
  customerID : any;
  customerImage: any;
  customerAadharImage: any;
  customerPancardImage: any;
  customerLicencesImage: any;
  customerVoterImage: any;
  guarantorID: any;
  guarantorImage: any;
  guarantorAadharImage: any;
  guarantorPancardImage: any;
  guarantorLicencesImage: any;
  guarantorVoterImage: any;
  vehicleID: any;
  engineImage: any;
  chassisImage: any;
  kmReadingImage: any;
  rcBookImage: any;
  resourceID: any;
  loanID: any;
  bankID: any;
  vehicleInsurenceImage: any;
  vehicleSide1Image: any;
  vehicleSide2Image: any;
  vehicleFrontImage: any;
  vehicleBackImage: any;
  passbookImage: any;


  showCommunication:Boolean = true;
  showPermanent:Boolean = false;
  showOffice:Boolean = false;

  showUpdatebtn : Boolean = false;


    applicantForm = new FormGroup({
      customerDetails:new FormGroup({
        customerName: new FormControl('', Validators.required),
        applicantType: new FormControl(''),
        mobileNo: new FormControl('', Validators.required),
        altNumber: new FormControl(''),
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
        maritalStatus:new FormControl('', Validators.required)

      })
    })
    applicantAddressForm = new FormGroup({
        communicationAdd : new FormGroup({
        addressLine1:new FormControl(''),
        addressLine2:new FormControl(''),
        area:new FormControl(''),
        city:new FormControl(''),
        landmark:new FormControl(''),
        postalCode:new FormControl(''),
        state:new FormControl('')
        }),
        permanentAdd: new FormGroup({
        addressLine1:new FormControl(''),
        addressLine2:new FormControl(''),
        area:new FormControl(''),
        city:new FormControl(''),
        landmark:new FormControl(''),
        postalCode:new FormControl(''),
        state:new FormControl('')
        }),
        officeAdd: new FormGroup({
          addressLine1:new FormControl(''),
          addressLine2:new FormControl(''),
          area:new FormControl(''),
          city:new FormControl(''),
          landmark:new FormControl(''),
          postalCode:new FormControl(''),
          state:new FormControl('')
          })
    })



    co_applicantForm = new FormGroup({
      customerGuarantor:new FormGroup({
        guarantorName: new FormControl('', Validators.required),
        mobileNumber: new FormControl('', Validators.required),
        spouseName: new FormControl(''),
        gender: new FormControl(''),
        dob:new FormControl('', Validators.required),
        maritalStatus:new FormControl('', Validators.required)
      })
    })
    co_applicantAddressForm = new FormGroup({
      communicationAdd : new FormGroup({
      addressLine1:new FormControl(''),
      addressLine2:new FormControl(''),
      area:new FormControl(''),
      city:new FormControl(''),
      landmark:new FormControl(''),
      postalCode:new FormControl(''),
      state:new FormControl('')
      }),
      permanentAdd: new FormGroup({
      addressLine1:new FormControl(''),
      addressLine2:new FormControl(''),
      area:new FormControl(''),
      city:new FormControl(''),
      landmark:new FormControl(''),
      postalCode:new FormControl(''),
      state:new FormControl('')
      }),
      officeAdd: new FormGroup({
        addressLine1:new FormControl(''),
        addressLine2:new FormControl(''),
        area:new FormControl(''),
        city:new FormControl(''),
        landmark:new FormControl(''),
        postalCode:new FormControl(''),
        state:new FormControl('')
        })
  })

    vehicleForm = new FormGroup({
      vehicleDetails:new FormGroup({
        vehicleNumber: new FormControl('', Validators.required),
        maker: new FormControl(''),
        model: new FormControl('', Validators.required),
        color: new FormControl(''),
        mfgYear: new FormControl('', Validators.required),
        engineNumber: new FormControl(''),
        chassisNumber: new FormControl(''),
        insuranceCompany: new FormControl(''),
        insurancePolicy: new FormControl(''),
        kmReading: new FormControl('')
      })
    })

    loanForm = new FormGroup({
      loanDetailsData:new FormGroup({
        loanAmount: new FormControl(''),
        loanTerm: new FormControl(''),
        loanInterest: new FormControl(''),
        emi: new FormControl(''),
        interestInr: new FormControl(''),
        docCharge: new FormControl(''),
        processingCharge: new FormControl(''),
        closingAC: new FormControl(''),
        closingDiscount: new FormControl(''),
        payout: new FormControl(''),
        dueDate: new FormControl('')
      })
    })
    bankForm = new FormGroup({
    bankDetails:new FormGroup({
      accountNumber: new FormControl('', Validators.required),
      accountHolderName: new FormControl('', Validators.required),
      loanEligibleAmount: new FormControl('', Validators.required),
      IFSC: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
      branchName: new FormControl('', Validators.required),
      disbursalType: new FormControl('', Validators.required),
      accountType: new FormControl('', Validators.required)
    })
    })

  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log(this.id)
    });
    this.getCustomerDetails(); 
    
  }


  tabClick(tabChangeEvent : any){
    this.selectedIndex = tabChangeEvent.index;
  }
  nextStep(){
    this.selectedIndex += 1;
  }
  previousStep() {
    this.selectedIndex -= 1;
  }
  communicationAddress(){
    this.showCommunication = true;
    this.showPermanent = false;
    this.showOffice = false;
  }
  permanentAddress(){
    this.showPermanent = true;
    this.showCommunication = false;
    this.showOffice = false;
  }
  officeAddress(){
    this.showOffice = true;
    this.showPermanent = false;
    this.showCommunication = false;
  }

  ngOnDestroy() { }

  getCustomerDetails(){
    this.applicantForm.disable();
    this.co_applicantForm.disable();
    this.vehicleForm.disable();
    this.loanForm.disable();
    this.bankForm.disable();
    this.applicantForm.disable();
    this.co_applicantAddressForm.disable();

    this.crudService.get(`${appModels.CUSTOMERS}/loanByLoanId/${this.id}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(async response => {

      console.log(response)
      this.customerList.push(response);
      this.applicantForm.patchValue({
        customerDetails:{
          customerName: response.customerName,
          applicantType:response.customerDetails.applicantType,
          mobileNo:response.customerDetails.mobileNo,
          altNumber: response.customerDetails.altNumber,
          spouseName: response.customerDetails.spouseName,
          gender: response.customerDetails.gender,
          dob:this.datepipe.transform(response.customerDetails.dob, 'yyyy-MM-dd'),
          fatherName: response.customerDetails.fatherName,
          refBy: response.customerDetails.refBy,
          companyName:response.customerDetails.companyName,
          monthlyIncome:response.customerDetails.monthlyIncome,
          salaryDate:this.datepipe.transform(response.customerDetails.salaryDate, 'yyyy-MM-dd'),
          salaryPeriod:response.customerDetails.salaryPeriod,
          maritalStatus:response.customerDetails.maritalStatus,        
         
        }
      })

      
      this.applicantAddressForm.patchValue({
        communicationAdd:{
            addressLine1:response.customerDetails.communicationAdd.addressLine1,
            addressLine2:response.customerDetails.communicationAdd.addressLine2,
            area:response.customerDetails.communicationAdd.area,
            city:response.customerDetails.communicationAdd.city,
            landmark:response.customerDetails.communicationAdd.landmark,
            postalCode:response.customerDetails.communicationAdd.postalCode,
            state:response.customerDetails.communicationAdd.state
          },
          permanentAdd:{
            addressLine1:response.customerDetails.permanentAdd.addressLine1,
            addressLine2:response.customerDetails.permanentAdd.addressLine2,
            area:response.customerDetails.permanentAdd.area,
            city:response.customerDetails.permanentAdd.city,
            landmark:response.customerDetails.permanentAdd.landmark,
            postalCode:response.customerDetails.permanentAdd.postalCode,
            state:response.customerDetails.permanentAdd.state
          },
          officeAdd:{
            addressLine1:response.customerDetails.officeAdd.addressLine1,
            addressLine2:response.customerDetails.officeAdd.addressLine2,
            area:response.customerDetails.officeAdd.area,
            city:response.customerDetails.officeAdd.city,
            landmark:response.customerDetails.officeAdd.landmark,
            postalCode:response.customerDetails.officeAdd.postalCode,
            state:response.customerDetails.officeAdd.state
          }
      })

      this.co_applicantForm.patchValue({
        customerGuarantor:{
          guarantorName:response.customerGuarantor.guarantorName,
          mobileNumber: response.customerGuarantor.mobileNumber,
          spouseName: response.customerGuarantor.spouseName,
          gender: response.customerGuarantor.gender,
          dob:this.datepipe.transform(response.customerGuarantor.dob, 'yyyy-MM-dd'),
          maritalStatus:response.customerGuarantor.maritalStatus,
                  
        }
      })

      this.co_applicantAddressForm.patchValue({
          communicationAdd:{
            addressLine1:response.customerGuarantor.communicationAdd.addressLine1,
            addressLine2:response.customerGuarantor.communicationAdd.addressLine2,
            area:response.customerGuarantor.communicationAdd.area,
            city:response.customerGuarantor.communicationAdd.city,
            landmark:response.customerGuarantor.communicationAdd.landmark,
            postalCode:response.customerGuarantor.communicationAdd.postalCode,
            state:response.customerGuarantor.communicationAdd.state
          },
          permanentAdd:{
            addressLine1:response.customerGuarantor.permanentAdd.addressLine1,
            addressLine2:response.customerGuarantor.permanentAdd.addressLine2,
            area:response.customerGuarantor.permanentAdd.area,
            city:response.customerGuarantor.permanentAdd.city,
            landmark:response.customerGuarantor.permanentAdd.landmark,
            postalCode:response.customerGuarantor.permanentAdd.postalCode,
            state:response.customerGuarantor.permanentAdd.state
          },
          officeAdd:{
            addressLine1:response.customerGuarantor.officeAdd.addressLine1,
            addressLine2:response.customerGuarantor.officeAdd.addressLine2,
            area:response.customerGuarantor.officeAdd.area,
            city:response.customerGuarantor.officeAdd.city,
            landmark:response.customerGuarantor.officeAdd.landmark,
            postalCode:response.customerGuarantor.officeAdd.postalCode,
            state:response.customerGuarantor.officeAdd.state
          }
      })
      this.loanForm.patchValue({
        loanDetailsData:{
          loanAmount: response.loanDetailsData.loanAmount,
          loanTerm: response.loanDetailsData.loanTerm,
          loanInterest: response.loanDetailsData.loanInterest,
          emi: response.loanDetailsData.emi,
          interestInr: response.loanDetailsData.interestInr,
          docCharge: response.loanDetailsData.docCharge,
          processingCharge: response.loanDetailsData.processingCharge,
          closingAC: response.loanDetailsData.closingAC,
          closingDiscount: response.loanDetailsData.closingDiscount,
          payout: response.loanDetailsData.payout,
          dueDate:this.datepipe.transform(response.loanDetailsData.dueDate, 'yyyy-MM-dd')
        }
      })

      this.vehicleForm.patchValue({
        vehicleDetails:{
          vehicleNumber: response.vehicleDetails.vehicleNumber,
          maker:  response.vehicleDetails.maker,
          model:  response.vehicleDetails.model,
          color:  response.vehicleDetails.color,
          mfgYear: response.vehicleDetails.mfgYear,
          engineNumber:  response.vehicleDetails.engineNumber,
          chassisNumber:  response.vehicleDetails.chassisNumber,
          insuranceCompany:  response.vehicleDetails.insuranceCompany,
          insurancePolicy: response.vehicleDetails.insurancePolicy,
          kmReading:  response.vehicleDetails.kmReading,
        }
      })

      this.bankForm.patchValue({
      bankDetails:{
        accountNumber:  response.bankDetails.accountNumber,
        accountHolderName: response.bankDetails.accountHolderName,
        loanEligibleAmount: response.bankDetails.loanEligibleAmount,
        IFSC: response.bankDetails.IFSC,
        bankName: response.bankDetails.bankName,
        branchName: response.bankDetails.branchName,
        disbursalType: response.bankDetails.disbursalType,
        accountType: response.bankDetails.accountType,
      }
      })

      this.resourceID = this.customerList[0].id;
      this.customerID = this.customerList[0].customerDetails.id;
      this.guarantorID = this.customerList[0].customerGuarantor.id;
      this.vehicleID = this.customerList[0].vehicleDetails.id;
      this.loanID = this.customerList[0].loanDetailsData.id;
      this.bankID = this.customerList[0].bankDetails.id;

//applicant
if(this.customerID !== null || undefined){
     await this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${this.customerID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.customerImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
       await this.crudService.get_Image(`${appModels.IMAGES}/adharphoto/${this.customerID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.customerAadharImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
       await this.crudService.get_Image(`${appModels.IMAGES}/pancard/${this.customerID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.customerPancardImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
      await  this.crudService.get_Image(`${appModels.IMAGES}/vehicle_licence/${this.customerID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.customerLicencesImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
      }
//co-applicant 
  else if(this.guarantorID !== null ||undefined){
       await this.crudService.get_Image(`${appModels.IMAGES}/g_vehicle_licence/${this.guarantorID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.guarantorImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
       await this.crudService.get_Image(`${appModels.IMAGES}/g_adharphoto/${this.guarantorID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.guarantorAadharImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
       await this.crudService.get_Image(`${appModels.IMAGES}/g_pancard/${this.guarantorID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.guarantorPancardImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
      await  this.crudService.get_Image(`${appModels.IMAGES}/g_pancard/${this.guarantorID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.guarantorLicencesImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
      }
//vechicle
  else if(this.vehicleID !== null || undefined){
         await this.crudService.get_Image(`${appModels.IMAGES}/engine/${this.vehicleID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.engineImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
        await this.crudService.get_Image(`${appModels.IMAGES}/chassis/${this.vehicleID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.chassisImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
        await this.crudService.get_Image(`${appModels.IMAGES}/kmreading/${this.vehicleID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.kmReadingImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
        await this.crudService.get_Image(`${appModels.IMAGES}/rcbook/${this.vehicleID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.rcBookImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
    }
 //invoice Image 
        else if(this.resourceID !== null || undefined){
          await this.crudService.get_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
            this.customerVoterImage = this.sanitizer.bypassSecurityTrustUrl(data);
          })
          await this.crudService.get_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
            this.guarantorVoterImage = this.sanitizer.bypassSecurityTrustUrl(data);
          })
          await this.crudService.get_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
            this.vehicleInsurenceImage = this.sanitizer.bypassSecurityTrustUrl(data);
          })
          await this.crudService.get_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
            this.vehicleFrontImage = this.sanitizer.bypassSecurityTrustUrl(data);
          })
          await this.crudService.get_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
            this.vehicleBackImage = this.sanitizer.bypassSecurityTrustUrl(data);
          })
          await this.crudService.get_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
            this.vehicleSide1Image = this.sanitizer.bypassSecurityTrustUrl(data);
          })
          await this.crudService.get_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
            this.vehicleSide2Image = this.sanitizer.bypassSecurityTrustUrl(data);
          })
          await this.crudService.get_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
            this.passbookImage = this.sanitizer.bypassSecurityTrustUrl(data);
          })
        }   
        
    })

  }

// edit and update  
    editCustomerDetails(){
      this.applicantForm.enable();
      this.applicantForm.enable();
      this.showUpdatebtn = true;
    }

    editGuarantorDetails(){
      this.co_applicantForm.enable();
      this.co_applicantAddressForm.enable();
      this.showUpdatebtn = true;
    }

    editVehicleDetails(){
      this.vehicleForm.enable();
      this.showUpdatebtn = true;
    }

    editLoanDetails(){
      this.loanForm.enable();
      this.showUpdatebtn = true;
    }

    editBankDetails(){
      this.bankForm.enable();
      this.showUpdatebtn = true;
    }

    updateCustomerDetails(){
        this.applicantForm.value.customerDetails.salaryDate = this.datepipe.transform(this.applicantForm.value.customerDetails.salaryDate, 'dd MMMM yyyy');
        this.applicantForm.value.customerDetails.dob = this.datepipe.transform(this.applicantForm.value.customerDetails.dob, 'dd MMMM yyyy');
        this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyCustomerDetails`,this.applicantForm.value.customerDetails,
        this.customerID,
        ).pipe(untilDestroyed(this)).subscribe(response => {
        this.toast.success("Updated Successfully");
        this.showUpdatebtn = false;
        this.applicantForm.disable();
      })
    }
    
    updateGuarantorDetails(){
        this.co_applicantForm.value.customerGuarantor.dob = this.datepipe.transform(this.co_applicantForm.value.customerGuarantor.dob, 'dd MMMM yyyy');
        this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyGuarantorDetails`,this.co_applicantForm.value.customerGuarantor,
        this.guarantorID,
        ).pipe(untilDestroyed(this)).subscribe(response => {
        this.toast.success("Updated Successfully");
        this.showUpdatebtn = false;
        this.co_applicantForm.disable();
      })
    }

    updateVehicleDetails(){
        this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyVehicleDetails`,this.vehicleForm.value.vehicleDetails,
        this.vehicleID,
        ).pipe(untilDestroyed(this)).subscribe(response => {
        this.toast.success("Updated Successfully");
        this.showUpdatebtn = false;
        this.vehicleForm.disable();
        })
    }

    updateLoanDetails(){
      this.loanForm.value.loanDetailsData.dueDate = this.datepipe.transform(this.loanForm.value.loanDetailsData.dueDate, 'dd MMMM yyyy');
        this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyLoanDetails`,this.loanForm.value.loanDetailsData,
        this.loanID,
       ).pipe(untilDestroyed(this)).subscribe(response => {
        this.toast.success("Updated Successfully");
        this.showUpdatebtn = false;
        this.loanForm.disable();
      })
    }

    updateBankDetails(){
        this.crudService.update(`${appModels.FIELDEXECUTIVE}/modifyBankDetails`,this.bankForm.value.bankDetails,
        this.bankID,
        ).pipe(untilDestroyed(this)).subscribe(response => {
        this.toast.success("Updated Successfully");
        this.showUpdatebtn = false;
        this.bankForm.disable();
      })
    }
   
    applicantAadharImgURL: any;
    applicantAadharfileform : any;
    applicantPanfileform : any;
    applicantPanImgURL: any;
    applicantDrivingfileform : any;
    applicantDrivingImgURL: any;
    applicantVoterfileform : any;
    applicantVoterImgURL: any;
    co_applicantAadharfileform: any;
    co_applicantAadharImgURL: any;
    co_applicantPanfileform: any;
    co_applicantPanImgURL: any;
    co_applicantDrivingfileform: any;
    co_applicantDrivingImgURL: any;
    co_applicantVoterfileform: any;
    co_applicantVoterImgURL: any;

 
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
        const formData = new FormData();      
        formData.append("file",this.applicantAadharfileform);       
       this.crudService.upload_Image(`${appModels.IMAGES}/adharphoto/${this.customerID}`, formData,
        { params:{
        tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => {
        })
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
        const formData = new FormData();      
        formData.append("file",this.applicantPanfileform);       
        this.crudService.upload_Image(`${appModels.IMAGES}/pancard/${this.customerID}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => {
        })          
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
        const formData = new FormData();      
        formData.append("file",this.applicantDrivingfileform);       
        this.crudService.upload_Image(`${appModels.IMAGES}/vehicle_licence/${this.customerID}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe(async data => {
        }) 
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
        const formData = new FormData();      
        formData.append("file",this.applicantVoterfileform);
       this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => {
          this.toast.success("Image Updated Successfully");
        }) 
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
        const formData = new FormData();      
        formData.append("file",this.co_applicantAadharfileform);
         this.crudService.upload_Image(`${appModels.IMAGES}/g_adharphoto/${this.guarantorID}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => {
        this.toast.success("Image Updated Successfully");
        })
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
      const formData = new FormData();      
      formData.append("file",this.co_applicantPanfileform);
      this.crudService.upload_Image(`${appModels.IMAGES}/g_pancard/${this.guarantorID}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => { 
        this.toast.success("Image Updated Successfully");
        }) 
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
      const formData = new FormData();      
      formData.append("file",this.co_applicantDrivingfileform);
        this.crudService.upload_Image(`${appModels.IMAGES}/g_vehicle_licence/${this.guarantorID}`, formData,
        { params:{
          tenantIdentifier: "default"   
        }}
        ).pipe(untilDestroyed(this)).subscribe( async data => { 
        this.toast.success("Image Updated Successfully");
        })   
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
      const formData = new FormData();      
      formData.append("file",this.co_applicantVoterfileform);
     this.crudService.upload_Image(`${appModels.IMAGES}/invoiceimage/${this.resourceID}`, formData,
      { params:{
        tenantIdentifier: "default"   
      }}
      ).pipe(untilDestroyed(this)).subscribe( async data => {
        this.toast.success("Image Updated Successfully");
      })    
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
   
}
