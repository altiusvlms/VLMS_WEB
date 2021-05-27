/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';
import {FileValidator} from './file-input.validator'


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
import {DomSanitizer} from "@angular/platform-browser";


import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
import { ValidateEqualModule } from 'ng-validate-equal';
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

  fromdate:any;
  todate:any;

  displayedColumns = ['index', 'Applicant Name', 'Applicant Mobile No.1','Applicant Mobile No.2',
  'D.O.B','Father’s Name','Applicant Type','Gender','Action'];
  dataSource = new MatTableDataSource();
  enrollid: any;
  customerList :  any = [];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private formBuilder: FormBuilder,private crudService: CrudService,private toast: ToastrService
    ,public datepipe: DatePipe, private sharedService: SharedService,private dialog: MatDialog,private router: Router,private sanitizer:DomSanitizer,) { }

    
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
      this.customerList.push(data);
      this.enrollid = this.customerList[0].id;

      // this.enrollid = data.id;
      console.log(this.enrollid)
      this.EnrollVerfication_Data = data;
      this.dataSource = new MatTableDataSource(this.EnrollVerfication_Data)
      this.sharedService.setLoaderShownProperty(false);  
      this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${this.enrollid}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
        this.EnrollVerfication_Data = this.sanitizer.bypassSecurityTrustUrl(data);
        console.log(this.EnrollVerfication_Data)
      })
    })
  }

  createLoan(id : any){
    this.router.navigate(['branch-manager/newloan-process']);
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
  Filterdate(){
    this.fromdate;
    this.todate;
    let fromdate1 =this.datepipe.transform(this.fromdate, 'yyyy-MM-dd');
    let todate1 =this.datepipe.transform(this.todate, 'yyyy-MM-dd');
    console.log(fromdate1);
    console.log(todate1);
    let params = {
      fromdate:fromdate1,
      todate:todate1,
      tenantIdentifier: "default",
    }
        this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnrollByDate`,
      { params }
    ).pipe(untilDestroyed(this)).subscribe( data => {
      console.log(data)
      this.EnrollVerfication_Data = data;
      this.dataSource = new MatTableDataSource(this.EnrollVerfication_Data)
    })
  }
  
  clear(){
    this.getEnrollData();
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
  submitted: Boolean = false;
  openform:Boolean = false;
  openform2:Boolean = false;
  checked:Boolean = false;



  Genders: any = ['Male', 'Female', 'Others',];
  Applicants:any = ['salaried','Business','Own Business'];
  ID1s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard'];
  ID2s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard'];
  ID3s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard'];
  ID4s:any = ['aadhar','pan','rationCard','drivingLicence','passport','jobCard'];

  

  images: any;
  windowRef: any;
  phoneNumber: any;
  verificationCode: string;
  user:any;
    customerList: any = [] ;
    resourceID: any;
    id: any;
    customerImage: any;



  constructor(public dialogRef: MatDialogRef<CreateEnroll>, private router: Router, @Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder,
  private crudService: CrudService,private toast: ToastrService,
  private sharedService: SharedService,public datepipe: DatePipe,public authentication: AuthenticationService,private sanitizer:DomSanitizer) {
    if (data) {
      console.log(data)
      this.editDataTask = { ...data };
      this.customerList.push(data);
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
    this.resourceID = this.customerList[0].id;
    console.log(this.resourceID);
      this.crudService.get_Image(`${appModels.IMAGES}/enroll_customerimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async (data) => {
        this.ApplicantImageURL = this.sanitizer.bypassSecurityTrustUrl(data);
        console.log(this.ApplicantImageURL)
      })
      this.crudService.get_Image(`${appModels.IMAGES}/enroll_adharphoto/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async (data) => {
        this.AadharimageForm = this.sanitizer.bypassSecurityTrustUrl(data);
        console.log(this.AadharimageForm)
      })
      this.crudService.get_Image(`${appModels.IMAGES}/enroll_pancard/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async (data) => {
        this.PanImageForm = this.sanitizer.bypassSecurityTrustUrl(data);
        console.log(this.PanImageForm)
      })
        
    this.createCustomerEnrolForms.disable();
    }

   }
 


    /** Create Customer Enrolment Form */
    createCustomerEnrolForms = new FormGroup({
      customerName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      alternateMobileNumber: new FormControl(''),
      dob: new FormControl(''),
      dateFormat: new FormControl("dd MMMM yyyy"),
      locale: new FormControl("en"),
      fatherName: new FormControl(''),
      SpouseName: new FormControl(''),
      gender: new FormControl(''),
      applicantType: new FormControl(''),
      proof1: new FormControl(''),
      proof2: new FormControl(''),
      // file: new FormControl("", [FileValidator.validate]),
      // file2: new FormControl("", [FileValidator.validate]),
    })

    
    enrollused:any;
    enrollImgUrl:any;
    EnrollVerfication_Data:any;
    Imagefileform:any;
    Imagefileform2:any;
    Imagefileform3:any;
    Imagefileform4:any;
    ApplicantImage:any;
    ApplicantImageURL:any;
    AadharImage:any;
    AadharimageForm:any
    PanImage:any
    PanImageForm:any;
    AadharAditional:any;
    AditionalImage:any;
    PanAditional:any;
    PanImageAditional:any;

  ngOnInit(): void {
    this.windowRef = this.authentication.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
  }
  
  ngOnDestroy() { }

  uploadApplicantImages(evt10: any){
    if(evt10.target.files[0].type == "image/png" || evt10.target.files[0].type == "image/jpeg" || evt10.target.files[0].type == "image/gif"){
    this.ApplicantImage = evt10.target.files[0];
    if (evt10.target.files && evt10.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt10.target.files[0]);
      reader.onload = (event) => {
        this.ApplicantImageURL = event.target['result'];
        // console.log(this.enrollImgUrl)
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
    }
  }
  uploadAadharImages(evt1 : any){
    if(evt1.target.files[0].type == "image/png" || evt1.target.files[0].type == "image/jpeg" || evt1.target.files[0].type == "image/gif"){
      this.AadharImage = evt1.target.files[0];
      if (evt1.target.files && evt1.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(evt1.target.files[0]);
        reader.onload = (event) => {
          this.AadharimageForm = event.target['result'];
          
          }
        }
      }
        else {
          alert("Only GIF, PNG and JPEG Data URL's are allowed.")
        }
    
  }
  uploadPanImages(evt2 : any){
    if(evt2.target.files[0].type == "image/png" || evt2.target.files[0].type == "image/jpeg" || evt2.target.files[0].type == "image/gif"){
      this.PanImage = evt2.target.files[0];
      if (evt2.target.files && evt2.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(evt2.target.files[0]);
        reader.onload = (event) => {
          this.PanImageForm = event.target['result'];
          }
        }
      }
        else {
          alert("Only GIF, PNG and JPEG Data URL's are allowed.")
        }
  }
  uploadAadharAditional(evt3 : any){
    if(evt3.target.files[0].type == "image/png" || evt3.target.files[0].type == "image/jpeg" || evt3.target.files[0].type == "image/gif"){
      this.AadharAditional = evt3.target.files[0];
      if (evt3.target.files && evt3.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(evt3.target.files[0]);
        reader.onload = (event) => {
          this.AditionalImage = event.target['result'];
          }
        }
      }
        else {
          alert("Only GIF, PNG and JPEG Data URL's are allowed.")
        }
  }
  uploadPanAditional(evt4 : any){
    if(evt4.target.files[0].type == "image/png" || evt4.target.files[0].type == "image/jpeg" || evt4.target.files[0].type == "image/gif"){
      this.PanAditional = evt4.target.files[0];
      if (evt4.target.files && evt4.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(evt4.target.files[0]);
        reader.onload = (event) => {
          this.PanImageAditional = event.target['result'];
          }
        }
      }
        else {
          alert("Only GIF, PNG and JPEG Data URL's are allowed.")
        }
  }

  
enrollid:any;
   
onClickOpenForm(){
  this.openform=true;  
  }
  onClickOpenForm2(){
    this.openform2=true;  
    }

   /** Save Customer Enrolment */
   saveCustomerEnrolment(){
    this.submitted = true;
    if (this.editDataTask) {
      this.createCustomerEnrolForms.value.dob=this.datepipe.transform(this.createCustomerEnrolForms.value.dob, 'dd MMMM yyyy');
      this.crudService.update(`${appModels.FIELDEXECUTIVE}/updateEnroll`,this.createCustomerEnrolForms.value,
        this.editDataTask['id'],
      ).pipe(untilDestroyed(this)).subscribe(updated => {
        this.enrollid = updated;
        console.log(this.enrollid)
        alert("Customer updated successfully")
        this.dialogRef.close(updated);
        this.sharedService.setLoaderShownProperty(false);  

        const formData = new FormData();      
    formData.append("file",this.ApplicantImage);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_customerimage/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
    formData.append("file",this.AadharImage);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_adharphoto/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
    formData.append("file",this.PanImage);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_pancard/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
    formData.append("file",this.AadharAditional);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_adharphoto1/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
            formData.append("file",this.PanAditional);
                this.crudService.upload_Image(`${appModels.IMAGES}/enroll_pancard1/${this.enrollid}`, formData,
                { params:{
                      tenantIdentifier: "default"   
                    }}
                ).pipe(untilDestroyed(this))
                  .subscribe(data => {
                    console.log(data);
      // this.dialogRef.close(data);
      // this.sharedService.setLoaderShownProperty(false); 
                  })
                })
              })
          })
        })
        this.getEnrollData();
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
      alert("Customer Created successfully")
      this.dialogRef.close(data);
      this.sharedService.setLoaderShownProperty(false); 
      const formData = new FormData();      
    formData.append("file",this.ApplicantImage);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_customerimage/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
    formData.append("file",this.AadharImage);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_adharphoto/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
    formData.append("file",this.PanImage);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_pancard/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
    formData.append("file",this.AadharAditional);
        this.crudService.upload_Image(`${appModels.IMAGES}/enroll_adharphoto1/${this.enrollid}`, formData,
        { params:{
              tenantIdentifier: "default"   
            }}
        ).pipe(untilDestroyed(this))
          .subscribe(data => {
            console.log(data);
            const formData = new FormData();      
            formData.append("file",this.PanAditional);
                this.crudService.upload_Image(`${appModels.IMAGES}/enroll_pancard1/${this.enrollid}`, formData,
                { params:{
                      tenantIdentifier: "default"   
                    }}
                ).pipe(untilDestroyed(this))
                  .subscribe(data => {
                    console.log(data);
      // this.dialogRef.close(data);
      // this.sharedService.setLoaderShownProperty(false); 
                  })
                })
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
                    this.checked = true;

    })
    .catch( (error: any) => console.log(error, "Incorrect code entered?"));
    // alert("Incorrect code entered");    
  }
  deleteTask(){
    this.editIcon = false;
    if (confirm(`Are you sure, you want to delete?`)) {
    this.crudService.delete(`${appModels.FIELDEXECUTIVE}/enroll`, this.editDataTask['id'])
    .pipe(untilDestroyed(this)).subscribe(deleted => {
      this.dialogRef.close(deleted);
      this.sharedService.setLoaderShownProperty(false); 
      this.toast.success("Task Deleted Succesfully"); 
    })
    }
  }

  close() {
    this.dialogRef.close();
  }

  }
function data(data: any) {
  throw new Error('Function not implemented.');
}

