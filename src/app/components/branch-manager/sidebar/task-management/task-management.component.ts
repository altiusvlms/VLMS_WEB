/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Forms */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


/** Task Management Component */
@Component({
  selector: 'vlms-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {

  /** showAction(Edit & Delete)*/
  showAction = false;

  constructor(private formBuilder: FormBuilder) { }

  /** Create Task Form */
  createTaskForms = new FormGroup({
    taskType: new FormControl('', Validators.required),
    customerRegNo: new FormControl('', Validators.required),
    vehicleNo: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    assignTo: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  /** click button to create the task in open model. */
  createTask(){
    this.showAction = false;
  }
  /** Save the Created Task */
  saveTask(){
    console.log(this.createTaskForms.value)
  }
  /** Action(Edit & Delete) with create task model */
  viewModel(){
    this.showAction = true;
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
}

