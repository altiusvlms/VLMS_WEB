/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Custom Routing and Services */
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { SharedService } from '../../../../services/shared.service';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Manage Employee List Component */

@Component({
  selector: 'vlms-existing-employee',
  templateUrl: './existing-employee.component.html',
  styleUrls: ['./existing-employee.component.scss']
})
export class ExistingEmployeeComponent implements OnInit {

/** Manage Employee Variables  */
  employeeListData : any

  constructor(private router: Router,private crudService: CrudService,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

/** Create Employee Routing  */
  createEmployee(){
    this.router.navigate(['branch-manager/manage-employee/'])
  }

/** Get Particular Employee Details Routing  */
  getSingleEmployeeList(id : any) {
    this.router.navigate(['branch-manager/edit-manage-employee/'  + id])
  }

/** Get All Employee List  */
  getEmployeeList(){
    this.crudService.get(`${appModels.GETEMPLOYEE}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(response => {
      this.employeeListData = response;
      this.sharedService.setLoaderShownProperty(false); 
    })
  }

}
