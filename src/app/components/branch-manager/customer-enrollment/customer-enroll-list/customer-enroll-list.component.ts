/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/app'; 
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';



import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Customer Enroll List Component */
@Component({
  selector: 'vlms-customer-enroll-list',
  templateUrl: './customer-enroll-list.component.html',
  styleUrls: ['./customer-enroll-list.component.scss']
})
export class CustomerEnrollListComponent implements OnInit {
  Genders: any = ['Male', 'Female', 'Others',]
  Applicants:any = ['salaried','Business','Own Business']
  ID1s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard']
  ID2s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard']

  images: any;
  windowRef: any;
  phoneNumber: any;
  verificationCode: string;
  user:any;

  constructor(private formBuilder: FormBuilder,private crudService: CrudService,public datepipe: DatePipe,
    private toast: ToastrService, private authentication: AuthenticationService,) { }
    /** Create Customer Enrolment Form */
    createCustomerEnrolForms = new FormGroup({
      Customerphoto: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      alternateMobileNumber: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      dateFormat: new FormControl("dd MMMM yyyy", Validators.required),
      locale: new FormControl("en", Validators.required),
      fatherName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      applicantType: new FormControl('', Validators.required),
      proof1: new FormControl('', Validators.required),
      proof2: new FormControl('', Validators.required),
    })

    
    enrollused:any;
    enrollImgUrl:any;
    EnrollVerfication_Data:any;
    Imagefileform:any;
    Imagefileform2:any;


  ngOnInit(): void {
    this.windowRef = this.authentication.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
    this.getEnrollData();
  }
  
  ngOnDestroy() { }

  uploadCoAppIdProofImages(evt10: any){
    if(evt10.target.files[0].type == "image/png" || evt10.target.files[0].type == "image/jpeg" || evt10.target.files[0].type == "image/gif"){
    this.enrollused = evt10.target.files[0];
    if (evt10.target.files && evt10.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt10.target.files[0]);
      reader.onload = (event) => {
        this.enrollImgUrl = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  

  
enrollid:any;


   /** Save Customer Enrolment */
   saveCustomerEnrolment(){

    this.createCustomerEnrolForms.value.dob =this.datepipe.transform(this.createCustomerEnrolForms.value.dob, 'dd MMMM yyyy');
    this.images = {
      images1:this.createCustomerEnrolForms.value.image1,
      images2:this.createCustomerEnrolForms.value.image2,
    }
    console.log(this.images);
    console.log(this.createCustomerEnrolForms.value.image1)
    this.crudService.post(`${appModels.ENROLL}`, this.createCustomerEnrolForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      console.log(data)
      this.enrollid = data.resourceId;
      const formData = new FormData();      
    formData.append("file",this.Imagefileform);
        this.crudService.upload_Image(`${appModels.IMAGES}/feenroll/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
    formData.append("file",this.Imagefileform2);
        this.crudService.upload_Image(`${appModels.IMAGES}/feenroll/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
          })
        })
    })
    
  }
  

  getEnrollData() {
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnroll`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).subscribe(data => {
      console.log(data);
      this.EnrollVerfication_Data = data;
    })
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier
    const num = "+91" + this.createCustomerEnrolForms.value.phoneNumber;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then((result: any) => {
                this.windowRef.confirmationResult = result;

            })
            .catch( (error: any) => console.log(error) );
}

  verifyLoginCode()  {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( (result: { user: any; }) => {

                    this.user = result.user;
                    console.log(result)

    })
    .catch( (error: any) => console.log(error, "Incorrect code entered?"));
    // alert("Incorrect code entered");    
  }
  uploadImages(evt1 : any){
    {
    this.Imagefileform = evt1.target.files[0];
    console.log(this.Imagefileform);
    }
  }
  uploadImages2(evt2 : any){
    {
    this.Imagefileform2 = evt2.target.files[0];
    console.log(this.Imagefileform2);
    }
  }
  
}
