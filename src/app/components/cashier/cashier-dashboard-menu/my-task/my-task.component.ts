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

  ngOnInit(): void {
  }

  /** Open the Dialog Model */
  editMyTask() {
    const dialogRef = this.dialog.open(EditMyTask, {
      width: '100vw',
      height: '90vh',
      // data: task ? task : null
    });
  
    dialogRef.afterClosed().subscribe((data : any) => {
      if (data) {
        // this.getTaskList();
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
  editIcon : Boolean = false;
  assignToName: any;

  constructor(public dialogRef: MatDialogRef<EditMyTask>, private router: Router, @Inject(MAT_DIALOG_DATA) public data:any, private formBuilder: FormBuilder,
    private crudService: CrudService,
    private sharedService: SharedService,public datepipe: DatePipe) { 
  
  }
    
 

  ngOnInit() {
  }
  ngOnDestroy() {}

/** Close the Dialog Model */
  close() {
    this.dialogRef.close();
  }


}