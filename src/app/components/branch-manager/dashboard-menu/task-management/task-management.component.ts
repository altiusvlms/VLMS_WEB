/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Task Management Component */
@Component({
  selector: 'vlms-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {

  /** showAction(Edit & Delete)*/
  showAction = false;
  taskListData: any;
  taskID: any;
  constructor(private formBuilder: FormBuilder,private crudService: CrudService,private toast: ToastrService,public datepipe: DatePipe) { }

  /** Create Task Form */
  createTaskForms = new FormGroup({
    taskType: new FormControl('', Validators.required),
    customerRegNo: new FormControl('', Validators.required),
    vehicleNumber: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    dateFormat: new FormControl('dd MMMM yyyy', Validators.required),
    locale: new FormControl('en', Validators.required),
    assignTo: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.getTaskList();
  }
  ngOnDestroy() { }

  /** click button to create the task in open model. */
  createTask(){
    this.showAction = false;
  }
  /** Save the Created Task */
  saveTask(){
    this.createTaskForms.value.dueDate=this.datepipe.transform(this.createTaskForms.value.dueDate, 'dd MMMM yyyy');
    this.crudService.post(`${appModels.FIELDEXECUTIVE}/task`, this.createTaskForms.value,
    { params:{
      tenantIdentifier: "default"   
    }}
  ).pipe(untilDestroyed(this)).subscribe( data => {
    this.toast.success("Created Successfully");
    this.getTaskList();
  })
  }
  /** Action(Edit & Delete) with create task model */
  viewModel(task : any,id : any){
    console.log(id);
    this.taskID = id;
    this.showAction = true;
    this.createTaskForms
    .patchValue({
      taskType: task.taskType,
      customerRegNo: task.customerRegNo,
      vehicleNumber: task.vehicleNumber,
      dueDate: this.datepipe.transform(task['dueDate'], 'dd MMMM yyyy'),
      assignTo: task.assignTo,
      description: task.description
    });
    this.createTaskForms.disable();
  }
  /** Edit the Task */
  EditTask(){
    console.log(this.createTaskForms.value)
    this.createTaskForms.enable();
    this.showAction = false;
    alert("Are you sure, you want to Edit?");
  
    
  }

  updateTask(){
    console.log(this.taskID)
    console.log(this.createTaskForms.value)
    this.crudService.update(`${appModels.FIELDEXECUTIVE}/editTask`, this.createTaskForms.value, this.taskID)
    .pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);  
      this.getTaskList();  
    })
    
  }
  /** Delete the Task */
  deleteTask(){
    alert("Are you sure, you want to delete?");
         this.crudService.delete(`${appModels.FIELDEXECUTIVE}/deleteTask`, this.taskID)
         .pipe(untilDestroyed(this)).subscribe(data => {
           console.log(data)
          this.getTaskList();  

      })
  }
  getTaskList(){
    this.crudService.get(`${appModels.FIELDEXECUTIVE}/getTask`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.taskListData= data;
    })
  }
}

