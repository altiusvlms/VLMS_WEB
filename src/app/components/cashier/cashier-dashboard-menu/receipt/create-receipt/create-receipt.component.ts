import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras, ActivatedRoute,Params } from '@angular/router';
import {  CrudService } from '../../../../../services/crud.service';
import { appModels } from '../../../../../services/utils/enum.util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DomSanitizer} from "@angular/platform-browser";

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService,private dialog: MatDialog,private route: ActivatedRoute, private sanitizer:DomSanitizer) { }
  id: any;
  getCustomerLoanDetails: any = [];
  customerImage: any;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
     if(this.id !== undefined || null){
      this.getReceipt();
     }
     else{
      this.viewPopUp();
     }
    })

  }
  
  viewPopUp(){
      const dialogRef = this.dialog.open(SearchReceipt, {
        width: '50vw',
        height: '50vh',
      });   
      dialogRef.afterClosed().subscribe((response : any) => {
      });     
    }
 
  getReceipt(){
    this.crudService.get(`${appModels.CUSTOMERS}/loanByLoanId/${this.id}`, {
      params: {
        tenantIdentifier: 'default'  
      }
      }).pipe(untilDestroyed(this)).subscribe(async response => {
        this.getCustomerLoanDetails.push(response)
        await this.crudService.get_Image(`${appModels.IMAGES}/customerimage/${response.id}?tenantIdentifier=default`).pipe(untilDestroyed(this)).subscribe(async data => {
          this.customerImage = this.sanitizer.bypassSecurityTrustUrl(data);
        })
      })
  }

}




@Component({
  selector: 'vlms-create-receipt',
  templateUrl: 'search-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class SearchReceipt {

  constructor(public dialogRef: MatDialogRef<SearchReceipt>,private router: Router,private crudService: CrudService, @Inject(MAT_DIALOG_DATA) public response:any) { }

   
  customername: any;
  customerMobileNo: any;
  customerList: any = [];
  showDropdown: Boolean = false;

  searchForms = new FormGroup({
    customerName: new FormControl(''),
    customerMobileNo: new FormControl('')
  })

  ngOnInit(): void {
    }



  /** Filter on CustomerName and Mobile Number */    
  applyFilter(value : any , string_val: any){
    this.showDropdown = true;
    if(string_val == 'name'){
    const filterValue = (event.target as HTMLInputElement).value;
    this.customername = filterValue.trim().toLowerCase();
  }
  if(this.customername != ''){
  this.crudService.get(`${appModels.CUSTOMERS}/allCustomerLoanDetails`, {
    params: {
      tenantIdentifier: 'default'
    }
  }).pipe(untilDestroyed(this)).subscribe(async response => {
    await response.map((res: any) => {
      if(res.customerDetails.name.toLowerCase().search(this.customername.toLowerCase()) != -1 ){
      this.customerList.push(res);
      }
    })
    })
  }
  else{
    this.customerList = [];
    this.showDropdown = false;
    this.searchForms.patchValue({
      customerMobileNo:'',
    })
  }
  }

/** Auto Fetch for Customer based on MobileNo and MobileNo based on CustomerName */    
  customer(val: any){
    this.showDropdown = false;
    this.customerList.map((res: any) => {
      if(res.customerDetails.name.toLowerCase().search(val.value.toLowerCase()) != -1 ){
      this.searchForms.patchValue({
        customerMobileNo:res.customerDetails.mobileNo,
        customerName:val.value
      })
      }
    })
  }
  /** Close the Dialog Model */
  close() {
    this.dialogRef.close();
  }
  role: any;
  createReceipt(){
    this.customerList.map((res: any) => {
    this.role = localStorage.getItem("roles");
      if(this.role === "Cashier"){
          if(res.customerDetails.name == this.searchForms.value.customerName){
              this.router.navigate(['/cashier/create-receipt/' +res.customerDetails.id]);
              this.dialogRef.close(res.customerDetails.name);
          }
      }
      else{
        if(res.customerDetails.name == this.searchForms.value.customerName){
          this.router.navigate(['/branch-manager/create-receipt/' +res.customerDetails.id]);
      }
      }
    })
  }

}