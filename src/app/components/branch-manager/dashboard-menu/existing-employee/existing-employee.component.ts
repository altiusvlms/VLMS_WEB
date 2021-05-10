import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'vlms-existing-employee',
  templateUrl: './existing-employee.component.html',
  styleUrls: ['./existing-employee.component.scss']
})
export class ExistingEmployeeComponent implements OnInit {

  employeeListData : any

  constructor(private router: Router,private crudService: CrudService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  manageemployee(){
    this.router.navigate(['branch-manager/manage-employee/'])
  }

  getEmployeeList(){
    this.crudService.get(`${appModels.GETEMPLOYEE}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.employeeListData = data;
    })
  }

}
