/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';


/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators ,FormArray} from '@angular/forms';

import { CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { AuthenticationService} from '../../../../services/authentication/authentication.service';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/app'; 
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import { SharedService } from '../../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer} from "@angular/platform-browser";

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
  EnrollDetails:any;

  fromdate:any;
  todate:any;

  displayedColumns = ['index', 'createdDate', 'Customer Image', 'customerName', 'mobileNumber', 'alternateMobileNumber', 'dob', 'fatherName', 'applicantType', 'gender', 'Action'];
  dataSource = new MatTableDataSource();
  customerList :  any = [];
  customerImage: any;
  allCustomerImage: any = [];

  constructor(private formBuilder: FormBuilder,private crudService: CrudService,private toast: ToastrService
    ,public datepipe: DatePipe, private sharedService: SharedService,private dialog: MatDialog,private router: Router,private sanitizer:DomSanitizer,) { }

    
  ngOnInit(): void {
    this.getEnrollData();
  }

  ngOnDestroy() { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEnrollData() {
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnroll`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(async respose => {
      console.log(respose);
      this.EnrollDetails = respose;
      this.dataSource = new MatTableDataSource(this.EnrollDetails)
      this.sharedService.setLoaderShownProperty(false); 

      await this.EnrollDetails.map((res: any) => {
      this.crudService.get_Image(`${appModels.IMAGES}/enroll_customerimage/${res.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
        this.customerImage = this.sanitizer.bypassSecurityTrustUrl(data);
        this.allCustomerImage.push({image:this.customerImage})
        console.log(this.allCustomerImage)
        this.sharedService.setLoaderShownProperty(false);

      },error => {
        console.error(error);
        this.customerImage = 'assets/images/empty_image.png';
        this.allCustomerImage.push({image:this.customerImage} )
        this.sharedService.setLoaderShownProperty(false);
     });
      })
    })
    this.allCustomerImage = [];

  }

  createLoan(id : any){
    this.router.navigate(['branch-manager/newloan-process/' + id]);
  }

  createViewEnrol(element : any) {
    const dialogRef = this.dialog.open(CreateEnroll, {
      width: '100vw',
      height: '90vh',
      data: element ? element : null
    });
    dialogRef.afterClosed().subscribe((data : any) => {
      this.sharedService.setLoaderShownProperty(false);
      if (data) {
        this.getEnrollData();
        this.sharedService.setLoaderShownProperty(false);
      }
    });
  }
  Filterdate(){
    this.fromdate;
    this.todate;
    let fromdate1 = this.datepipe.transform(this.fromdate, 'yyyy-MM-dd');
    let todate1 = this.datepipe.transform(this.todate, 'yyyy-MM-dd');
    let params = {
      fromdate:fromdate1,
      todate:todate1,
      tenantIdentifier: "default",
    }
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnrollByDate`,{ params }
    ).pipe(untilDestroyed(this)).subscribe( response => {
      this.EnrollDetails = response;
      this.dataSource = new MatTableDataSource(this.EnrollDetails);
      this.sharedService.setLoaderShownProperty(false);
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

    editDataEnrol : any;
    editIcon : Boolean = false;
    assignToName: any;
    submitted: Boolean = false;
    checked:Boolean = false;
    windowRef: any;
    verificationCode: string;
    user:any;
    customerList: any = [] ;
    resourceID: any;
    customerImage: any;
    enrollid:any;
    enrolIdentifier: any;
    ShowEnrolID: Boolean = false;    
    EnrollVerficationDetails:any;
    Imagefileform:any;
    ApplicantImage:any;
    ApplicantImageURL:any;
    documentDetails: any;
    Imagefileform0: any;
    Imagefileform1: any;
    Imagefileform2:any;
    imageURL0: any;
    imageURL1: any;
    imageURL2: any;

  constructor(public dialogRef: MatDialogRef<CreateEnroll>, @Inject(MAT_DIALOG_DATA) public data:any,
  private crudService: CrudService,private toast: ToastrService,
  private sharedService: SharedService,public datepipe: DatePipe,public authentication: AuthenticationService,private sanitizer:DomSanitizer,private fb: FormBuilder) {

    if (data) {
      console.log(data)
      this.editDataEnrol = { ...data };
      this.customerList.push(data);
      this.createCustomerEnrolForms
    .patchValue({
      customerName:data.customerName,
      mobileNumber:data.mobileNumber,
      alternateMobileNumber:data.alternateMobileNumber,
      fatherName:data.fatherName,
      dob:this.datepipe.transform(data.dob, 'yyyy-MM-dd'),
      gender:data.gender,
      spouseName:data.spouseName,
      applicantType:data.applicantType
    });
    this.resourceID = this.customerList[0].id;
    console.log(this.resourceID);
    for(let document of  this.documentImageForm.value.image){

      this.crudService.get_Image(`${appModels.IMAGES}/enroll_customerimage/${this.resourceID}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async (data) => {
        this.ApplicantImageURL = this.sanitizer.bypassSecurityTrustUrl(data);
        console.log(this.ApplicantImageURL)
        this.sharedService.setLoaderShownProperty(false);

      })
      this.crudService.get_Image(`${appModels.IMAGES}/enroll_adharphoto/${this.resourceID}?documentNumber:${document.documentNo}&tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async (data) => {
        this.imageURL0 = this.sanitizer.bypassSecurityTrustUrl(data);
        this.sharedService.setLoaderShownProperty(false);

      })
      this.crudService.get_Image(`${appModels.IMAGES}/enroll_pancard/${this.resourceID}?documentNumber:${document.documentNo}&tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async (data) => {
        this.imageURL1 = this.sanitizer.bypassSecurityTrustUrl(data);
        this.sharedService.setLoaderShownProperty(false);

      })
    }
    this.createCustomerEnrolForms.disable();
    }

   }
 


    /** Create Customer Enrolment Form */
    createCustomerEnrolForms = new FormGroup({
      customerName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      alternateMobileNumber: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      dateFormat: new FormControl("dd MMMM yyyy"),
      locale: new FormControl("en"),
      fatherName: new FormControl('', Validators.required),
      spouseName: new FormControl(''),
      gender: new FormControl('', Validators.required),
      applicantType: new FormControl('', Validators.required),
    })



  ngOnInit(): void {
    this.getDocumentDetails();
    this.windowRef = this.authentication.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
  }
  
  ngOnDestroy() { }

  get f() { return this.createCustomerEnrolForms.controls; }

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

  uploadApplicantImages(evt: any){
    if(evt.target.files[0].type == "image/png" || evt.target.files[0].type == "image/jpeg" || evt.target.files[0].type == "image/gif"){
    this.ApplicantImage = evt.target.files[0];
    if (evt.target.files && evt.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event) => {
        this.ApplicantImageURL = event.target['result'];
        }
      }
    }
    else {
      alert("Only GIF, PNG and JPEG Data URL's are allowed.")
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

  


   /** Save Customer Enrolment */
   saveCustomerEnrolment(){
     console.log(this.documentImageForm.value);
     console.log(this.createCustomerEnrolForms.value)
    if (this.editDataEnrol) {
      this.submitted = true;
      if (this.createCustomerEnrolForms.invalid) {
        return;
      }
      this.createCustomerEnrolForms.value.dob=this.datepipe.transform(this.createCustomerEnrolForms.value.dob, 'dd MMMM yyyy');
      this.crudService.update(`${appModels.FIELDEXECUTIVE}/updateEnroll`,this.createCustomerEnrolForms.value,
        this.editDataEnrol['id'],
      ).pipe(untilDestroyed(this)).subscribe(updated => {
        this.enrollid = updated;
        console.log(this.enrollid)
        this.sharedService.setLoaderShownProperty(false);  
        for(let document of  this.documentImageForm.value.image){
          const formData = new FormData();      
          formData.append("file",this.ApplicantImage);
              this.crudService.upload_Image(`${appModels.IMAGES}/enroll_customerimage/${this.enrollid}`, formData,
              { params:{
                    tenantIdentifier: "default"   
                  }}
              ).pipe(untilDestroyed(this))
                .subscribe(data => {
                  console.log(data)
                  const formData = new FormData();      
                  formData.append("file",this.Imagefileform0);
                      this.crudService.upload_Image(`${appModels.IMAGES}/enroll_adharphoto/${this.enrollid}`, formData,
                      { params:{
                            documentNumber: document.documentNo,
                            tenantIdentifier: "default"   
                          }}
                      ).pipe(untilDestroyed(this))
                        .subscribe(data => {
                          console.log(data)
  
                          const formData = new FormData();      
                          formData.append("file",this.Imagefileform1);
                              this.crudService.upload_Image(`${appModels.IMAGES}/enroll_pancard/${this.enrollid}`, formData,
                              { params:{
                                    documentNumber: document.documentNo,
                                    tenantIdentifier: "default"   
                                  }}
                              ).pipe(untilDestroyed(this))
                                .subscribe(data => {
                                  console.log(data)
                              })
                      })
              })
            }
      })
      // this.getEnrollData();
        }
    else {
      this.submitted = true;
      if (this.createCustomerEnrolForms.invalid) {
        return;
      }
    this.createCustomerEnrolForms.value.dob =this.datepipe.transform(this.createCustomerEnrolForms.value.dob, 'dd MMMM yyyy');

    this.crudService.post(`${appModels.ENROLL}`, this.createCustomerEnrolForms.value,
      { params:{
        tenantIdentifier: "default"   
      }}
    ).pipe(untilDestroyed(this)).subscribe( response => {
      console.log(response)
      this.enrollid = response.resourceId;
      this.enrolIdentifier = response.resourceIdentifier;
      this.ShowEnrolID = true;
      this.sharedService.setLoaderShownProperty(false); 
      for(let document of  this.documentImageForm.value.image){
        const formData = new FormData();      
        formData.append("file",this.ApplicantImage);
            this.crudService.upload_Image(`${appModels.IMAGES}/enroll_customerimage/${this.enrollid}`, formData,
            { params:{
                  tenantIdentifier: "default"   
                }}
            ).pipe(untilDestroyed(this))
              .subscribe(data => {
                console.log(data)
                const formData = new FormData();      
                formData.append("file",this.Imagefileform0);
                    this.crudService.upload_Image(`${appModels.IMAGES}/enroll_adharphoto/${this.enrollid}`, formData,
                    { params:{
                          documentNumber: document.documentNo,
                          tenantIdentifier: "default"   
                        }}
                    ).pipe(untilDestroyed(this))
                      .subscribe(data => {
                        console.log(data)

                        const formData = new FormData();      
                        formData.append("file",this.Imagefileform1);
                            this.crudService.upload_Image(`${appModels.IMAGES}/enroll_pancard/${this.enrollid}`, formData,
                            { params:{
                                  documentNumber: document.documentNo,
                                  tenantIdentifier: "default"   
                                }}
                            ).pipe(untilDestroyed(this))
                              .subscribe(data => {
                                console.log(data)
                            })
                    })
            })
          }
        })
  }
  }

  EditEnrol(){
    this.editIcon = true;
    this.createCustomerEnrolForms.enable();
  }
  
  // getEnrollData() {
  //   this.crudService.get(`${appModels.FIELDEXECUTIVE}/getEnroll`, {
  //     params: {
  //       tenantIdentifier: 'default'
  //     }
  //   }).subscribe(response => {
  //     this.EnrollVerficationDetails = response;
  //     this.sharedService.setLoaderShownProperty(false);

  //   })
  // }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier
    const num = "+91"+ this.createCustomerEnrolForms.value.mobileNumber;
    firebase.auth().signInWithPhoneNumber(num, appVerifier).then((result: any) => {
          this.windowRef.confirmationResult = result;
          }).catch( (error: any) => console.log(error) );
  }

  verifyLoginCode()  {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then( (result: { user: any; }) => {
          this.user = result.user;
          this.checked = true;
    }).catch( (error: any) => console.log(error, "Incorrect code entered?"));
  }

  deleteEnrol(){
    this.editIcon = false;
    if (confirm(`Are you sure, you want to delete?`)) {
    this.crudService.delete(`${appModels.FIELDEXECUTIVE}/enroll`, this.editDataEnrol['id'])
    .pipe(untilDestroyed(this)).subscribe(deleted => {
      this.dialogRef.close(deleted);
      this.sharedService.setLoaderShownProperty(false); 
      this.toast.success("Enrol Deleted Succesfully"); 
    })
    }
  }

  close() {
    this.dialogRef.close();
  }

  }


