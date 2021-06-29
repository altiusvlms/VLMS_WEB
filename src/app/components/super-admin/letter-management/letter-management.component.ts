/** Angular Imports */
import { Component, OnInit,Inject } from '@angular/core';

/** Custom Forms and Routing and Services */
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { appModels } from '../../../services/utils/enum.util';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-letter-management',
  templateUrl: './letter-management.component.html',
  styleUrls: ['./letter-management.component.scss']
})
export class LetterManagementComponent implements OnInit {

  constructor(private crudService: CrudService,public datepipe: DatePipe, private sharedService: SharedService,private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /** Open the Dialog Model (Create and View) */
  createViewLetter(letter : any) {
    const dialogRef = this.dialog.open(CreateLetter, {
      width: '100vw',
      height: '90vh',
      data: letter ? letter : null
    });  
    dialogRef.afterClosed().subscribe((response : any) => {
      this.sharedService.setLoaderShownProperty(false); 
      if (response) {
        this.sharedService.setLoaderShownProperty(false);  
      }
    });
  }
}


/** Create Letter Management Component */

@Component({
  selector: 'vlms-letter-management',
  templateUrl: 'create-letter-management.component.html',
  styleUrls: ['./letter-management.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class CreateLetter {

  constructor(public dialogRef: MatDialogRef<CreateLetter>, private toast: ToastrService,private router: Router, @Inject(MAT_DIALOG_DATA) public response:any,
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