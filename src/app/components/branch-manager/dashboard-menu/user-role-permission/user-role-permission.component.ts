/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

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
  constructor(private crudService: CrudService, private toast: ToastrService) { }

  /** Create Role Forms */
  createRoleForms = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  })

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

  saveRole(){
    this.crudService.post(`${appModels.ROLES}`, this.createRoleForms.value,
    {params:{
    tenantIdentifier: "default"   
    }}
    ).pipe(untilDestroyed(this)).subscribe(response => {
      this.toast.success("Roles Saved Succesfully");  
    })
  }

}
