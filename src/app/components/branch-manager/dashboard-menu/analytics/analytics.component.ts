/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
import * as Chart from 'chart.js';
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
//   public chartType: string = 'pie';

//   public chartDatasets: Array<any> = [
//     { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
//   ];

//   public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

//   public chartColors: Array<any> = [
//     {
//       backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
//       hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
//       borderWidth: 2,
//     }
//   ];

//   public chartOptions: any = {
//     responsive: true
//   };
//   public chartClicked(e: any): void { }
//   public chartHovered(e: any): void { }

//   pieChartOptions = {
//     responsive: true
// }

//   pieChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];


//   pieChartColor:any = [
//     {
//         backgroundColor: ['rgba(30, 169, 224, 0.8)',
//         'rgba(255,165,0,0.9)',
//         'rgba(139, 136, 136, 0.9)',
//         'rgba(255, 161, 181, 0.9)',
//         'rgba(255, 102, 0, 0.9)'
//         ]
//     }
// ]

//  ctxP = document.getElementById("pieChart").getContext('2d');
//      myPieChart = new Chart(this.ctxP, {
//       type: 'pie',
//       data: {
//         labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
//         datasets: [{
//           data: [300, 50, 100, 40, 120],
//           backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
//           hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
//         }]
//       },
//       options: {
//         responsive: true
//       }
//     });

}
