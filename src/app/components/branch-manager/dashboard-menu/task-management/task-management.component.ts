/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Task Management Component */
@Component({
  selector: 'vlms-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {

  taskListData: any = [];
  showAction : Boolean = false;

  constructor(private formBuilder: FormBuilder,private crudService: CrudService,private toast: ToastrService,public datepipe: DatePipe, private sharedService: SharedService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  ngOnDestroy() { }

  getTaskList(){
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getTask`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      this.taskListData= data;
      this.sharedService.setLoaderShownProperty(false);  
    })
  }


  createViewTask(task : any) {
    const dialogRef = this.dialog.open(CreateTask, {
      width: '100vw',
      height: '90vh',
      data: task ? task : null
    });
  
    dialogRef.afterClosed().subscribe((data : any) => {
      if (data) {
        this.getTaskList();
      }
    });
  }

}




@Component({
  selector: 'vlms-task-management',
  templateUrl: 'create-task.component.html',
  styleUrls: ['./task-management.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class CreateTask {

  editDataTask : any;
  editIcon : Boolean = false;
  
  constructor(public dialogRef: MatDialogRef<CreateTask>, private router: Router, @Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder,
    private crudService: CrudService,
    private sharedService: SharedService,public datepipe: DatePipe) {
    if (data) {
      this.editDataTask = { ...data };
     this.createTaskForms
    .patchValue({
      taskType:data.taskType,
      customerRegNo:data.customerRegNo,
      customerMobileNo:data.customerMobileNo,
      vehicleNumber:data.vehicleNumber,
      dueDate:this.datepipe.transform(data['dueDate'], 'dd MMMM yyyy'),
      assignTo:data.assignTo,
      description:data.description
    });
    this.createTaskForms.disable();
    }
  }
    createTaskForms = new FormGroup({
      taskType: new FormControl(''),
      customerRegNo: new FormControl(''),
      customermobileNo: new FormControl(''),
      vehicleNumber: new FormControl(''),
      dueDate: new FormControl(''),
      dateFormat: new FormControl('dd MMMM yyyy', Validators.required),
      locale: new FormControl('en', Validators.required),
      assignTo: new FormControl(''),
      description: new FormControl(''),
    })


 

  ngOnInit() {
  }
  ngOnDestroy() {}

  saveUpdateTask(){
    if (this.editDataTask) {
      this.crudService.update(`${appModels.FIELDEXECUTIVE}/editTask`,this.createTaskForms.value,
        this.editDataTask['id'],
      ).pipe(untilDestroyed(this)).subscribe(updated => {
        this.dialogRef.close(updated);
        this.sharedService.setLoaderShownProperty(false);  
      })
    } else {
      this.createTaskForms.value.dueDate=this.datepipe.transform(this.createTaskForms.value.dueDate, 'dd MMMM yyyy');
      this.crudService.post(`${appModels.FIELDEXECUTIVE}/task`, this.createTaskForms.value,
        {params:{
        tenantIdentifier: "default"   
        }}
      ).pipe(untilDestroyed(this)).subscribe(saved => {
          this.dialogRef.close(saved);
          this.sharedService.setLoaderShownProperty(false);  
        })
    }
  }

    EditTask(){
      this.editIcon = true;
      this.createTaskForms.enable();
    } 

    deleteTask(){
      this.editIcon = false;
      if (confirm(`Are you sure, you want to delete?`)) {
      this.crudService.delete(`${appModels.FIELDEXECUTIVE}/deleteTask`, this.editDataTask['id'])
      .pipe(untilDestroyed(this)).subscribe(deleted => {
        this.dialogRef.close(deleted);
        this.sharedService.setLoaderShownProperty(false);  
      })
      }
    }

    close() {
      this.dialogRef.close();
    }


}