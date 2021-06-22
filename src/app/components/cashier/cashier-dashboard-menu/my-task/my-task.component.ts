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

/** My Task Component */
@Component({
  selector: 'vlms-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {

  constructor(private crudService: CrudService,private toast: ToastrService, private sharedService: SharedService,private dialog: MatDialog) { }

  taskListData: any;

  ngOnInit(): void {
    this.getTaskList();
  }

  /** Task Management List */
  getTaskList(){
    this.crudService.get(`${appModels.MY_TASK}/getCashierTaskData`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
      this.taskListData= response;
      console.log( this.taskListData)
      this.sharedService.setLoaderShownProperty(false);  
    })
  }

  /** Open the Dialog Model */
  editMyTask(task: any) {
    const dialogRef = this.dialog.open(EditMyTask, {
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



/** Edit My Task Component */
@Component({
  selector: 'vlms-my-taskt',
  templateUrl: 'edit-my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class EditMyTask {

  editDataTask : any;
  array_myTask : any = [];

  constructor(public dialogRef: MatDialogRef<EditMyTask>, private router: Router, @Inject(MAT_DIALOG_DATA) public response:any, private formBuilder: FormBuilder,
    private crudService: CrudService,
    private sharedService: SharedService,public datepipe: DatePipe,private toast: ToastrService) { 
      if (response) {
        this.editDataTask = { ...response };
        this.array_myTask.push(this.editDataTask);
        if(response.status == ''){
          response.status = "open";
        }
       this.createMyTaskForms
      .patchValue({
        status:response.status
      });
      }
  
  }
  
    /** Create My Task Forms */
    createMyTaskForms = new FormGroup({
      status: new FormControl('')
    })

 
  ngOnInit() {
  }
  ngOnDestroy() {}

/** Close the Dialog Model */
  close() {
    this.dialogRef.close();
  }

/** Update the Task */
  updateTask(){
    this.editDataTask.dateFormat = 'dd MMMM yyyy';
    this.editDataTask.locale = 'en';
    this.editDataTask.status = this.createMyTaskForms.value.status;
    this.editDataTask.dueDate=this.datepipe.transform(this.editDataTask.dueDate, 'dd MMMM yyyy');
      this.crudService.update(`${appModels.CASHIER_TASK}/editTask`,this.editDataTask,
        this.editDataTask['id'],
      ).pipe(untilDestroyed(this)).subscribe(updated => {
        this.dialogRef.close(updated);
        this.sharedService.setLoaderShownProperty(false);  
        this.toast.success("Task Updated Succesfully"); 
      })
  }


}