/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
@UntilDestroy({ checkProperties: true })

/** Analytics Component */
@Component({
  selector: 'vlms-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  isfield:Boolean = true;
  isbranch:Boolean = false;
  analyticsData:[];
  // this.analyticsData = 

  constructor(private router: Router,private crudService: CrudService) { }

  ngOnInit(): void {
    this.getAnalytics()
  }

  // field(){
  //   this.isfield = true;
  // }

  // branch(){
  //   this.isbranch = true;
  // }

  getAnalytics(){
    this.crudService.get(`${appModels.ANALYTICS}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      console.log(data);
      this.analyticsData = data;
      console.log("analytics")
      console.log(this.analyticsData)
    })
  }  

}
