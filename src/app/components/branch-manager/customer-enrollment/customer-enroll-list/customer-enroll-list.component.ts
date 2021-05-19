/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import {AuthenticationService} from '../../../../services/authentication/authentication.service';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/app'; 
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { SharedService } from '../../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Customer Enroll List Component */
@Component({
  selector: 'vlms-customer-enroll-list',
  templateUrl: './customer-enroll-list.component.html',
  styleUrls: ['./customer-enroll-list.component.scss']
})
export class CustomerEnrollListComponent implements OnInit {
  
  taskListData: any = [];
  showAction : Boolean = false;
  EnrollVerfication_Data:any;

  displayedColumns = ['Customer ID','Customer Image', 'Applicant Name', 'Applicant Mobile No.1','Applicant Mobile No.2',
  'D.O.B','Father’s Name','Applicant Type','Gender','AadhaarImage','PAN Image','Action'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private formBuilder: FormBuilder,private crudService: CrudService,private toast: ToastrService
    ,public datepipe: DatePipe, private sharedService: SharedService,private dialog: MatDialog,private router: Router) { }

    
  ngOnInit(): void {
    this.getEnrollData();
  }

  ngOnDestroy() { }

  getEnrollData() {
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnroll`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).subscribe(data => {
      console.log(data);
      this.EnrollVerfication_Data = data;
      this.dataSource = new MatTableDataSource(this.EnrollVerfication_Data)
      this.sharedService.setLoaderShownProperty(false);  

    })
  }



  createViewTask(element : any) {
    const dialogRef = this.dialog.open(CreateEnroll, {
      width: '100vw',
      height: '90vh',
      data: element ? element : null
    });
    console.log(element)
    dialogRef.afterClosed().subscribe((data : any) => {
      if (data) {
        this.getEnrollData();
      }
    });
  }
}

  @Component({
    selector: 'vlms-customer-enroll-list',
    templateUrl: 'create-enroll.component.html',
    styleUrls: ['./customer-enroll-list.component.scss']
  })
  @UntilDestroy({ checkProperties: true })

  
export class CreateEnroll {

  editDataTask : any;
  editIcon : Boolean = false;
  assignToName: any;

  Genders: any = ['Male', 'Female', 'Others',];
  Applicants:any = ['salaried','Business','Own Business'];
  ID1s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard'];
  ID2s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard'];

  

  images: any;
  windowRef: any;
  phoneNumber: any;
  verificationCode: string;
  user:any;



  constructor(public dialogRef: MatDialogRef<CreateEnroll>, private router: Router, @Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder,
  private crudService: CrudService,
  private sharedService: SharedService,public datepipe: DatePipe,public authentication: AuthenticationService) {
    if (data) {
      console.log(data)
      this.editDataTask = { ...data };
      this.createCustomerEnrolForms
    .patchValue({
      customerName:data.customerName,
      mobileNumber:data.mobileNumber,
      alternateMobileNumber:data.alternateMobileNumber,
      fatherName:data.fatherName,
      dob:this.datepipe.transform(data.dob, 'yyyy-MM-dd'),
      gender:data.gender,
      applicantType:data.applicantType
    });
    this.createCustomerEnrolForms.disable();
    }

   }
 


    /** Create Customer Enrolment Form */
    createCustomerEnrolForms = new FormGroup({
      Customerphoto: new FormControl(''),
      customerName: new FormControl(''),
      mobileNumber: new FormControl(''),
      alternateMobileNumber: new FormControl(''),
      dob: new FormControl(''),
      dateFormat: new FormControl("dd MMMM yyyy"),
      locale: new FormControl("en"),
      fatherName: new FormControl(''),
      gender: new FormControl(''),
      applicantType: new FormControl(''),
      proof1: new FormControl(''),
      proof2: new FormControl(''),
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
  }
  
  ngOnDestroy() { }

  uploadApplicantImages(evt10: any){
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
    if (this.editDataTask) {
      this.createCustomerEnrolForms.value.dueDate=this.datepipe.transform(this.createCustomerEnrolForms.value.dueDate, 'dd MMMM yyyy');
      this.crudService.update(`${appModels.FIELDEXECUTIVE}/updateEnroll`,this.createCustomerEnrolForms.value,
        this.editDataTask['id'],
      ).pipe(untilDestroyed(this)).subscribe(updated => {
        this.dialogRef.close(updated);
        this.sharedService.setLoaderShownProperty(false);  
      })
        }
    else {
    this.createCustomerEnrolForms.value.dob =this.datepipe.transform(this.createCustomerEnrolForms.value.dob, 'dd MMMM yyyy');
    this.images = {
      images1:this.createCustomerEnrolForms.value.image1,
      images2:this.createCustomerEnrolForms.value.image2,
    }
    console.log(this.images);
    this.crudService.post(`${appModels.ENROLL}`, this.createCustomerEnrolForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( data => {
      console.log(data)
      this.enrollid = data.resourceId;
      this.dialogRef.close(data);
          this.sharedService.setLoaderShownProperty(false); 
      const formData = new FormData();      
    formData.append("file",this.Imagefileform);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_adharphoto/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
    formData.append("file",this.Imagefileform2);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_pancard/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
            formData.append("file",this.enrollImgUrl);
                this.crudService.upload_Image(`${appModels.IMAGES}/enroll_customerimage/${this.enrollid}`, formData,
                { params:{
                      tenantIdentifier: "default"   
                    }}
                ).pipe(untilDestroyed(this))
                  .subscribe(data => {
                    console.log(data);
                  })
          })
        })
        this.getEnrollData();
    })
  }
  }

  EditTask(){
    this.editIcon = true;
    this.createCustomerEnrolForms.enable();
  }
  
  createLoan(){
    this.router.navigate(['branch-manager/newloan-process']);

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
    const num = "+91"+ this.createCustomerEnrolForms.value.mobileNumber;
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
  close() {
    this.dialogRef.close();
  }

  }
function data(data: any) {
  throw new Error('Function not implemented.');
}

