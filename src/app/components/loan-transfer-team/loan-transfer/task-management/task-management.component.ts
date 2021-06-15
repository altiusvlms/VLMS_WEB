/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms and Routing and Services */
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Task Management List Component */
@Component({
  selector: 'vlms-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {

/** Task Management Variables */
  taskListData: any = [];
  showAction : Boolean = false;

  constructor(private crudService: CrudService,public datepipe: DatePipe, private sharedService: SharedService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  ngOnDestroy() { }

/** Task Management List */
getTaskList(){
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getTask`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
      this.taskListData= response;
      console.log( this.taskListData)
      this.sharedService.setLoaderShownProperty(false);  
    })
  }

/** Open the Dialog Model (Create and Edit) */
  createViewTask(task : any) {
    const dialogRef = this.dialog.open(CreateTask, {
      width: '100vw',
      height: '90vh',
      data: task ? task : null
    });  
    dialogRef.afterClosed().subscribe((response : any) => {
      this.sharedService.setLoaderShownProperty(false); 
      if (response) {
        this.getTaskList();
        this.sharedService.setLoaderShownProperty(false);  
      }
    });
  }

}



/** Create Task Management Component */

@Component({
  selector: 'vlms-task-management',
  templateUrl: 'create-task.component.html',
  styleUrls: ['./task-management.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class CreateTask {

/** Create Task Management Variables */
  editDataTask : any;
  editIcon : Boolean = false;
  assignToName: any;
  customername: any;
  customerMobileNo: any;
  customerList: any = [];
  showDropdown: Boolean = false;
  tasktype:any = ['Engine Number','Chassis Number','Insurance Details','Live KM Reading','RC Book','Vehicle Image'];

  constructor(public dialogRef: MatDialogRef<CreateTask>, private toast: ToastrService,private router: Router, @Inject(MAT_DIALOG_DATA) public response:any,
    private crudService: CrudService,
    private sharedService: SharedService,public datepipe: DatePipe) { 
      console.log(response)
    if (response) {
      this.editDataTask = { ...response };
      if(response.status == ''){
        response.status = "open";
      }
     this.createTaskForms
    .patchValue({
      taskType:response.taskType,
      customerRegNo:response.customerRegNo,
      customerMobileNo:response.customerMobileNo,
      vehicleNumber:response.vehicleNumber,
      dueDate:this.datepipe.transform(response.dueDate, 'yyyy-MM-dd'),
      assignTo:response.assignTo,
      description:response.description,
      status:response.status,
    });
    this.createTaskForms.disable();
    }
  }

/** Create Task Management Forms */
    createTaskForms = new FormGroup({
      taskType: new FormControl(''),
      customerRegNo: new FormControl(''),
      customerMobileNo: new FormControl(''),
      vehicleNumber: new FormControl(''),
      dueDate: new FormControl(''),
      dateFormat: new FormControl('dd MMMM yyyy'),
      locale: new FormControl('en'),
      assignTo: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(''),
      
    })

 

  ngOnInit() {
    this.assignToDetails();
  }
  ngOnDestroy() {}

/** Get the Field Executive Name(AssignTo --> DropDown Value) */
  assignToDetails(){
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/feCashInHand`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
     this.assignToName = response;     
    })
  }

/** Create and Update Task Management */
  saveUpdateTask(){
    if (this.editDataTask) {
      this.createTaskForms.value.dueDate=this.datepipe.transform(this.createTaskForms.value.dueDate, 'dd MMMM yyyy');
      this.crudService.update(`${appModels.FIELDEXECUTIVE}/editTask`,this.createTaskForms.value,
        this.editDataTask['id'],
      ).pipe(untilDestroyed(this)).subscribe(updated => {
        this.dialogRef.close(updated);
        this.sharedService.setLoaderShownProperty(false);  
        this.toast.success("Task Updated Succesfully"); 
      })
    } else {
      this.createTaskForms.value.dueDate=this.datepipe.transform(this.createTaskForms.value.dueDate, 'dd MMMM yyyy');
      this.crudService.post(`${appModels.FIELDEXECUTIVE}/task`, this.createTaskForms.value,
        {params:{
        tenantIdentifier: "default"   
        }}
      ).pipe(untilDestroyed(this)).subscribe(saved => {
        console.log(saved)
          this.dialogRef.close(saved);
          this.sharedService.setLoaderShownProperty(false); 
          this.toast.success("Task Saved Succesfully");  
        })
    }
  }

/** Edit Task Management */
    EditTask(){
      this.editIcon = true;
      this.createTaskForms.enable();
    } 

/** Delete Task Management */
    deleteTask(){
      this.editIcon = false;
      if (confirm(`Are you sure, you want to delete?`)) {
      this.crudService.delete(`${appModels.FIELDEXECUTIVE}/deleteTask`, this.editDataTask['id'])
      .pipe(untilDestroyed(this)).subscribe(deleted => {
        this.dialogRef.close(deleted);
        this.sharedService.setLoaderShownProperty(false); 
        this.toast.success("Task Deleted Succesfully"); 
      })
      }
    }

/** Close the Dialog Model */
    close() {
      this.dialogRef.close();
    }

    
}