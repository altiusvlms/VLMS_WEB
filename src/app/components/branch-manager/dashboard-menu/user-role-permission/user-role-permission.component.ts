/** Angular Imports */
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute ,Params} from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** User Role & Permission Component */
@Component({
  selector: 'vlms-user-role-permission',
  templateUrl: './user-role-permission.component.html',
  styleUrls: ['./user-role-permission.component.scss']
})
export class UserRolePermissionComponent implements OnInit {
  showUserTable :Boolean = true;
  showPermissionTable :Boolean  = false;
  roleListData:any ;
  constructor(private router: Router,private crudService: CrudService, private toast: ToastrService,private dialog: MatDialog) { }



  ngOnInit(): void {
    this.getRoleList();
  }
  
  ngOnDestroy() { }


  user(){
    this.showPermissionTable = false;
    this.showUserTable = true;
  }

  permission(){
    this.showUserTable = false;
    this.showPermissionTable = true;
  }

  getRoleList(){
    this.crudService.get(`${appModels.ROLES}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
      console.log(response);
      this.roleListData = response;
    })
  }

  /** Open the Dialog Model (Create and Edit) */
  createEditRole(role : any) {
    const dialogRef = this.dialog.open(CreateRole, {
      width: '50vw',
      height: '50vh',
      data: role ? role : null
    });  
    dialogRef.afterClosed().subscribe((response : any) => {
      if (response) {
        this.getRoleList();
      }
    });
  }
  createPermission(){
    this.router.navigate(['branch-manager/set-permission'])
  }

}


/** Create Role Component */

@Component({
  selector: 'vlms-user-role-permission',
  templateUrl: 'create-role.component.html',
  styleUrls: ['./user-role-permission.component.scss']
})

@UntilDestroy({ checkProperties: true })

export class CreateRole {

/** Create Role Variables */
  editDataRole : any;


  constructor(public dialogRef: MatDialogRef<CreateRole>, private toast: ToastrService, @Inject(MAT_DIALOG_DATA) public response:any,
    private crudService: CrudService,) { 
    if (response) {
      this.editDataRole = { ...response };
     this.createRoleForms
    .patchValue({
      name:response.name,
      description:response.description
    });
    }
  }

  /** Create Role Forms */
  createRoleForms = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  })


  ngOnInit() {
  }
  ngOnDestroy() {}

  /** Create and Update Task Management */
  saveUpdateRole(){
    if (this.editDataRole) {
      this.crudService.update(`${appModels.ROLES}`,this.createRoleForms.value,
        this.editDataRole['id'],
      ).pipe(untilDestroyed(this)).subscribe(updated => {
        this.dialogRef.close(updated);
        this.toast.success("Roles Updated Succesfully"); 
      })
    } else {
      this.crudService.post(`${appModels.ROLES}/task`, this.createRoleForms.value,
        {params:{
        tenantIdentifier: "default"   
        }}
      ).pipe(untilDestroyed(this)).subscribe(saved => {
          this.dialogRef.close(saved);
          this.toast.success("Roles Saved Succesfully");  
        })
    }
  }

  /** Close the Dialog Model */
  close() {
    this.dialogRef.close();
  }

}