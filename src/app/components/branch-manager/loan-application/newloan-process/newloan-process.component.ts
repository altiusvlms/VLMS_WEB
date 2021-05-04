import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute ,Params} from '@angular/router';


// Custom Forms
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-newloan-process',
  templateUrl: './newloan-process.component.html',
  styleUrls: ['./newloan-process.component.scss']
})
export class NewloanProcessComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService,private toast: ToastrService, private route: ActivatedRoute) { }

  mobile_num = localStorage.getItem("mobile_number");
  submitted: Boolean = false;
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

  vehicleDetailsForm = new FormGroup({
    vehicleNumber: new FormControl('', Validators.required),
    maker: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    mfgyear: new FormControl('', Validators.required),
    engineNumber: new FormControl('', Validators.required),
    chassis_number: new FormControl('', Validators.required),
    insuranceCompany: new FormControl('', Validators.required),
    insurancePolicy: new FormControl('', Validators.required),
    insuranceExpiry: new FormControl('', Validators.required),
    kmReading: new FormControl('', Validators.required),
    noofOwner: new FormControl('', Validators.required)
    })

    loanTransferForm = new FormGroup({
      loanAmount: new FormControl('', Validators.required),
      loanTerm: new FormControl('', Validators.required),
      loanInterest: new FormControl('', Validators.required),
      emi: new FormControl('', Validators.required),
      interestINR: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      docCharge: new FormControl('', Validators.required),
      processingCharge: new FormControl('', Validators.required),
      pendingDoc: new FormControl('', Validators.required),
      holdAmount: new FormControl('', Validators.required),
      otherCharge: new FormControl('', Validators.required),
      closingAC: new FormControl('', Validators.required),
      closingDiscount: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      rePaymentMode: new FormControl('', Validators.required)
     })

     bankDetailsForm = new FormGroup({
      accountNumber: new FormControl('', Validators.required),
      accountHolderName: new FormControl('', Validators.required),
      IFSC: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
      branchName: new FormControl('', Validators.required),
      loanEligibleAmount: new FormControl('', Validators.required)
     })


  ngOnInit(): void {
    // this.getUserId();
    // this.saveNewLoan();
  }

  getUserId(){
    this.crudService.get(`${appModels.USERS}/${this.mobile_num}`, {
      params: {
        tenantIdentifier: 'default'  
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
    })
  }
 
  uploadEngineImages(evt1 : any){
    if(evt1.target.files[0].type == "image/png" || evt1.target.files[0].type == "image/jpeg" || evt1.target.files[0].type == "image/gif"){
    this.enginefileform = evt1.target.files[0];
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

  uploadChassisImages(evt2 : any){
    if(evt2.target.files[0].type == "image/png" || evt2.target.files[0].type == "image/jpeg" || evt2.target.files[0].type == "image/gif"){
    this.chassisfileform = evt2.target.files[0];
      if (evt2.target.files && evt2.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt2.target.files[0]);
      reader.onload = (event) => {
        this.chassisimgURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }

  uploadPolicyImages(evt3 : any){
    this.policyfileform = evt3.target.files[0];
      if (evt3.target.files && evt3.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt3.target.files[0]);
      reader.onload = (event) => {
        this.policyimgURL = event.target['result'];
      }
    }
  }

  uploadLiveKMImages(evt4 : any){
    this.liveKMfileform = evt4.target.files[0];
      if (evt4.target.files && evt4.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt4.target.files[0]);
      reader.onload = (event) => {
        this.liveKMimgURL = event.target['result'];
      }
    }
  }

  uploadRcBookImages(evt5 : any){
    this.rcBookfileform = evt5.target.files[0];
      if (evt5.target.files && evt5.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt5.target.files[0]);
      reader.onload = (event) => {
        this.rcBookimgURL = event.target['result'];
      }
    }
  }
  uploadFrontImages(evt6 : any){
    this.frontfileform = evt6.target.files[0];
      if (evt6.target.files && evt6.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt6.target.files[0]);
      reader.onload = (event) => {
        this.frontimgURL = event.target['result'];
      }
    }
  }
  uploadBackImages(evt7 : any){
    this.backfileform = evt7.target.files[0];
      if (evt7.target.files && evt7.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt7.target.files[0]);
      reader.onload = (event) => {
        this.backimgURL = event.target['result'];
      }
    }
  }
  uploadSide1Images(evt8 : any){
    this.side1fileform = evt8.target.files[0];
      if (evt8.target.files && evt8.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt8.target.files[0]);
      reader.onload = (event) => {
        this.side1imgURL = event.target['result'];
      }
    }
  }
  uploadSide2Images(evt9 : any){
    this.side2fileform = evt9.target.files[0];
      if (evt9.target.files && evt9.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt9.target.files[0]);
      reader.onload = (event) => {
        this.side2imgURL = event.target['result'];
      }
    }
  }


  saveNewLoan(){
    this.submitted = true;
    const obj =  this.vehicleDetailsForm.value;
    const obj1 =  this.loanTransferForm.value;
    const obj2 =  this.bankDetailsForm.value;
    const copy = Object.assign({}, obj,obj1,obj2);
    console.log(copy);

      this.submitted = true;
     
// const formData = new FormData();      
// formData.append("file",this.fileform);
//     this.crudService.upload_Image(`${appModels.COMMON}/images/engine/2`, formData,
//     { params:{
//           tenantIdentifier: "default"   
//         }}
//     ).pipe(untilDestroyed(this))
//       .subscribe(data => {
//         console.log(data)
//       })
    
  }

}
