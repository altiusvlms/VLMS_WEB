/** Angular Imports */
import { Component, OnInit } from '@angular/core';

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
  userListData:any ;
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.getUserList();
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
  getUserList(){
    this.crudService.get(`${appModels.USERS}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.userListData = data;
    })
  }

}