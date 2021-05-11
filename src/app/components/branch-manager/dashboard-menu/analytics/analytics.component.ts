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
  analyticsEnquiryData : any;
  analyticsCusOnboardData : any;
  // this.analyticsData = 

  constructor(private router: Router,private crudService: CrudService) { }

  ngOnInit(): void {
    this.getAnalytics();
    this.getAnalyticsEnquiry();
    this.getAnalyticsCustomerOnboard()
  }

  // public pieChartLabels:string[] = ['Chrome', 'Safari', 'Firefox','Internet Explorer','Other'];
  // public pieChartData:number[] = [40, 20, 20 , 10,10];
  // public pieChartType:string = 'pie';
 
  // // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
 
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }

  // field(){
  //   this.isfield = true;
  // }

  // branch(){
  //   this.isbranch = true;
  // }

  getAnalytics(){
    this.crudService.get(`${appModels.ANALYTICS_TOTAL_COUNT}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      // console.log(data);
      this.analyticsData = data.data;
      console.log("analytics")
      console.log(this.analyticsData)
    })
  }  

  getAnalyticsEnquiry(){
    this.crudService.get(`${appModels.ANALYTICS_ENQUIRY}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      // console.log(data);
      this.analyticsEnquiryData = data.data;
      console.log("analyEnquirytics")
      console.log(this.analyticsEnquiryData)
    })
  }

  getAnalyticsCustomerOnboard(){
    this.crudService.get(`${appModels.ANALYTICS_CUS_ONBOARD}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      // console.log(data);
      this.analyticsCusOnboardData = data.data;
      console.log("analyticsCusOnboardData")
      console.log(this.analyticsCusOnboardData)
    })
  }


}
