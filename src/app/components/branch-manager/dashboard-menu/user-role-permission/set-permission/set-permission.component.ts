/** Angular Imports */
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute ,Params} from '@angular/router';

import {  CrudService } from '../../../../../services/crud.service';
import { appModels } from '../../../../../services/utils/enum.util';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-set-permission',
  templateUrl: './set-permission.component.html',
  styleUrls: ['./set-permission.component.scss']
})
export class SetPermissionComponent implements OnInit {

  constructor(private router: Router,private crudService: CrudService, private toast: ToastrService) { }

  roleListData: any;
  permissionListData: any;

  ngOnInit(): void {
    this.getPermissionList();
    this.getRoleList();
  }
  ngOnDestroy() { }

  getRoleList(){
    this.crudService.get(`${appModels.ROLES}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
      this.roleListData = response;
    })
  }
  pushdata: any = [];
  getPermissionList(){
    this.crudService.get(`${appModels.PERMISSION}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
      this.permissionListData = response;
    })
  }

}
