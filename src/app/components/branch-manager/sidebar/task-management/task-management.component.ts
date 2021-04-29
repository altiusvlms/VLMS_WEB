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
  viewModel(task : any){
    this.showAction = true;
    task['dueDate']=this.datepipe.transform(task['dueDate'], 'dd MMMM yyyy');
    this.createTaskForms
    .patchValue({
      taskType: task.taskType,
      customerRegNo: task.customerRegNo,
      vehicleNumber: task.vehicleNumber,
      dueDate: task['dueDate'],
      assignTo: task.assignTo,
      description: task.description
    });
  }
  /** Edit the Task */
  EditTask(){
    this.showAction = true;
    alert("Are you sure, you want to Edit?");
  }
  /** Delete the Task */
  deleteTask(){
    alert("Are you sure, you want to delete?");
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

