/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';

import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';
import { Options } from "highcharts";
// import { ChartsModule } from 'ng2-charts';
// import * as Chart from 'chart.js';
import * as Highcharts from 'highcharts'

@UntilDestroy({ checkProperties: true })

/** Analytics Component */
@Component({
  selector: 'vlms-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  // isfield:Boolean = true;
  // isbranch:Boolean = false;
  analyticsData:[];
  analyticsEnquiryData : any;
  analyticsCusOnboardData : any;
  analyticsOverallData: any;
  // this.analyticsData = 
  data:any;
  
  constructor(private router: Router,private crudService: CrudService) {   }

  ngOnInit(): void {
    // this.getAnalytics();
    // this.getAnalyticsEnquiry();
    // this.getAnalyticsCustomerOnboard();
    this.getOverallData()
    
  
  }

  

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

  getOverallData(){
    this.crudService.get(`${appModels.ANALYTICS_OVERALL_DATA}`, {
      params: {
        tenantIdentifier: 'default'
      }
    }).pipe(untilDestroyed(this)).subscribe(data => {
      // console.log(data);
      this.analyticsOverallData = data;
      console.log("analyticsOverallData")
      console.log(this.analyticsOverallData)
      this.collectionGraph();
      Highcharts.chart("DemandVsCollectionpie", this.DemandVsCollectionpie() );
      Highcharts.chart("loanCollectedbankVsCash", this.loanCollectedbankVsCash() );
      this.feAssignedVsFollowUp();
    })
  }
  ontabClick(event:any){
    // debugger
    if(event.index == 0) {
      Highcharts.chart("DemandVsCollectionpie", this.DemandVsCollectionpie() );
      this.collectionGraph();
      Highcharts.chart("loanCollectedbankVsCash", this.loanCollectedbankVsCash() );
      this.feAssignedVsFollowUp();
    } else if (event.index == 1) {
    this.onboardGraphData1();
      Highcharts.chart("onboardpiechart", this.onboardPiechartData() );
      Highcharts.chart("enquiryVsConversion", this.enquiryVsConversion() );
    }else if (event.index == 2) {
      this.insuranceExpired();
        Highcharts.chart("insuranceExpiredVsRenewal", this.insuranceExpVsRenewalPie() );  
        Highcharts.chart("insuranceHoldVsCom", this.insuranceHoldVsCompleted() );  
      }else if (event.index == 3) {
          Highcharts.chart("loandisbursalPie", this.loanDisbursalPercentage() );
          Highcharts.chart("bankVsCash", this.bankVsCash() );    
        }else if (event.index == 4) {
          this.repossessedGraph();
          Highcharts.chart("repossessedVsReleased", this.repossessedVsReleased() );    
        }else if (event.index == 5) {
          Highcharts.chart("allocatedVsExpenses", this.allocatedVsExpenses() );    
          Highcharts.chart("rtoExpensesVsCompleted", this.rtoExpensesVsCompleted() );
        }else if (event.index == 6) {
          Highcharts.chart("docPendingVsCompleted", this.docPendingVsCompleted() );    
          Highcharts.chart("agtAssignedVsNotAssigned", this.agtAssignedVsNotAssigned() );    
                    
        }
        


    }

      // Tab 1
  // Collection Graph
  collectionGraph() {
      // chartOptions: Highcharts.Options = {
        Highcharts.chart('collectionGraph', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Collection'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: [
              'Mon',
              'Tues',
              'wed',
              // 'Thur',
              // 'Fri',
              // 'Sat',
              // 'Sun',
              // 'Aug',
              // 'Sep',
              // 'Oct',
              // 'Nov',
              // 'Dec'
            ],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Amount Collected'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            type:undefined,
            name: 'Cash Collection',
            data: [this.analyticsOverallData[0].cashCollection]
        
          }, 
          {
            type:undefined,
            name: 'New Loan Count',
            data: [this.analyticsOverallData[0].loanAmountBankCollection]
        
          }, {
            type:undefined,
            name: 'Insurance Expired',
            data: [this.analyticsOverallData[0].insuranceExpired]
        
          }, {
            type:undefined,
            name: 'Repossessed',
            data: [this.analyticsOverallData[0].disbursalRepossessed]
        
          }
        ]
        }) 
      // }
    }
      
  
    // })
  
  
    chartss :any
    
  // Demand Vs Collection Pie chart
  DemandVsCollectionpie():any{
  let cashDemands = this.analyticsOverallData[0].cashDemand  
  let cashCollections = this.analyticsOverallData[0].cashCollection
  let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
  let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection

  
    this.chartss = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Demand vs Collection'
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y}'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}'
          // format: '<b>{point.name}</b>: {point.y:.1f}'
        }
      }
    },
    series: [{
      name: 'Amount',
      colorByPoint: true,
      data: [{
        name: 'Cash Demand',
        y: cashDemands,
        // sliced: true,
        // selected: true
        
      }, {
        name: 'Cash Collection',
        y: cashCollections,
      },
      //  {
      //   name: 'Loan Amount Cash Collection',
      //   y: loanAmountCashCollections,
      // }, 
      // {
      //   name: 'Loan Amount Bank Collection',
      //   y: loanAmountBankCollections,
      // }, 
  
    ]
    }]
  
  }
  return this.chartss;
  }

  // Loan Amount Collected (Bank vs Cash)
  loanCollectedbankVsCashAmount :any
  
  loanCollectedbankVsCash():any{
  // let cashDemands = this.analyticsOverallData[0].cashDemand  
  // let cashCollections = this.analyticsOverallData[0].cashCollection
  let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
  let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection

  
    this.loanCollectedbankVsCashAmount = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Loan Amount Collected (Bank vs Cash)'
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y}'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [
      //   {
      //   name: 'Cash Demand',
      //   y: cashDemands,
      //   // sliced: true,
      //   // selected: true
        
      // }, {
      //   name: 'Cash Collection',
      //   y: cashCollections,
      // },
       {
        name: 'Loan Amount Cash Collection',
        y: loanAmountCashCollections,
      }, 
      {
        name: 'Loan Amount Bank Collection',
        y: loanAmountBankCollections,
      }, 
  
    ]
    }]
  
  }
  return this.loanCollectedbankVsCashAmount;
  }

    // FE Assigned vs follow-up Graph
    feAssignedVsFollowUp() {
      // chartOptions: Highcharts.Options = {
        Highcharts.chart('feAssignedVsFollowUp', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'FE Assigned vs follow-up vs Completed'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: [
              'Mon',
              'Tues',
              'wed',
              // 'Thur',
              // 'Fri',
              // 'Sat',
              // 'Sun',
              // 'Aug',
              // 'Sep',
              // 'Oct',
              // 'Nov',
              // 'Dec'
            ],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Amount Collected'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            type:undefined,
            name: 'Field executive Assigned',
            data: [this.analyticsOverallData[0].feAssigned]
        
          }, 
          {
            type:undefined,
            name: 'Field Executive Followup',
            data: [this.analyticsOverallData[0].feFollowup]
        
          }, {
            type:undefined,
            name: 'Field Executive Completed',
            data: [this.analyticsOverallData[0].feCompleted]
        
          }, 
          // {
          //   type:undefined,
          //   name: 'Repossessed',
          //   data: [this.analyticsOverallData[0].disbursalRepossessed]
        
          // }
        ]
        }) 
      // }
    }

  

  // Tab 2
  // Onboard graph
  onboardGraphData1() {
    // chartOptions: Highcharts.Options = {
      // setTimeout(() => {
      Highcharts.chart('newloanCount', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'New Loan Count'
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: [
            'Mon',
            'Tues',
            'wed',
            // 'Thur',
            // 'Fri',
            // 'Sat',
            // 'Sun',
            // 'Aug',
            // 'Sep',
            // 'Oct',
            // 'Nov',
            // 'Dec'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Amount Collected'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          type:undefined,
          name: 'Collection',
          data: [this.analyticsOverallData[0].cashCollection]
      
        }, 
        {
          type:undefined,
          name: 'New Loan Count',
          data: [this.analyticsOverallData[0].loanAmountBankCollection]
      
        }, {
          type:undefined,
          name: 'Insurance Expired',
          data: [this.analyticsOverallData[0].insuranceExpired]
      
        }, {
          type:undefined,
          name: 'Repossessed',
          data: [this.analyticsOverallData[0].disbursalRepossessed]
      
        }
      ]
      }) 
    // }
  // },5000);
  }

  onboardchartss :any
    
  // Dealer Onboard Pie chart
  onboardPiechartData():any{
    // setTimeout(() => {
  let cashDemand = this.analyticsOverallData[0].cashDemand  
  let cashCollection = this.analyticsOverallData[0].cashCollection
  let loanAmountCashCollection = this.analyticsOverallData[0].loanAmountCashCollection
  let loanAmountBankCollection = this.analyticsOverallData[0].loanAmountBankCollection

  // chartss: Highcharts.Options = {
  // Highcharts.chart('container', {
    
    this.onboardchartss = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Dealer Onboard'
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y}'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Cash Demand',
        y: cashDemand,
        // sliced: true,
        // selected: true
        
      }, {
        name: 'Cash Collection',
        y: cashCollection,
      },
       {
        name: 'Loan Amount Cash Collection',
        y: loanAmountCashCollection,
      }, 
      {
        name: 'Loan Amount Bank Collection',
        y: loanAmountBankCollection,
      }, 
      // {
      //   name: 'Safari',
      //   y: 4.18
      // }, {
      //   name: 'Sogou Explorer',
      //   y: 1.64
      // }, {
      //   name: 'Opera',
      //   y: 1.6
      // }, {
      //   name: 'QQ',
      //   y: 1.2
      // }, {
      //   name: 'Other',
      //   y: 2.61
      // }
    ]
    }]
  // }),
  }
// },5000);
  return this.onboardchartss;
// },5000);
  }

  enquiryVsConversionAmount :any
    
  // Enquiry vs Conversion Pie chart
  enquiryVsConversion():any{
    // setTimeout(() => {
  let enquiryDirect = this.analyticsOverallData[0].enquiryDirect  
  let enquiryWalkIn = this.analyticsOverallData[0].enquiryWalkIn
  let loanAmountCashCollection = this.analyticsOverallData[0].loanAmountCashCollection
  let loanAmountBankCollection = this.analyticsOverallData[0].loanAmountBankCollection

  // chartss: Highcharts.Options = {
  // Highcharts.chart('container', {
    
    this.enquiryVsConversionAmount = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Enquiry vs Conversion'
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y}'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Cash Demand',
        y: enquiryDirect,
        // sliced: true,
        // selected: true
        
      }, {
        name: 'Cash Collection',
        y: enquiryWalkIn,
      },
      //  {
      //   name: 'Loan Amount Cash Collection',
      //   y: loanAmountCashCollection,
      // }, 
      // {
      //   name: 'Loan Amount Bank Collection',
      //   y: loanAmountBankCollection,
      // }, 
      // {
      //   name: 'Safari',
      //   y: 4.18
      // }, {
      //   name: 'Sogou Explorer',
      //   y: 1.64
      // }, {
      //   name: 'Opera',
      //   y: 1.6
      // }, {
      //   name: 'QQ',
      //   y: 1.2
      // }, {
      //   name: 'Other',
      //   y: 2.61
      // }
    ]
    }]
  // }),
  }
// },5000);
  return this.enquiryVsConversionAmount;
// },5000);
  }

// Tab 3
// Insurance Graph
insuranceExpired(){
  // chartOptions: Highcharts.Options = {
    // setTimeout(() => {
    Highcharts.chart('insuranceExpired', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Insurance Expired'
      },
      subtitle: {
        text: 'amount'
      },
      xAxis: {
        categories: [
          'Mon',
          'Tues',
          'wed',
          // 'Thur',
          // 'Fri',
          // 'Sat',
          // 'Sun',
          // 'Aug',
          // 'Sep',
          // 'Oct',
          // 'Nov',
          // 'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Collected'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        type:undefined,
        name: 'Insurance Expired',
        data: [this.analyticsOverallData[0].insuranceExpired]
    
      }, 
      // {
      //   type:undefined,
      //   name: 'New Loan Count',
      //   data: [this.analyticsOverallData[0].loanAmountBankCollection]
    
      // }, {
      //   type:undefined,
      //   name: 'Insurance Expired',
      //   data: [this.analyticsOverallData[0].insuranceExpired]
    
      // }, {
      //   type:undefined,
      //   name: 'Repossessed',
      //   data: [this.analyticsOverallData[0].disbursalRepossessed]
    
      // }
    ]
    }) 
 
}


insuranceExpVsRenewal :any
    
// Insurance Expired vs Renewal Pie chart
insuranceExpVsRenewalPie():any{
let insuranceExpired = this.analyticsOverallData[0].insuranceExpired  
let insuranceRenewal = this.analyticsOverallData[0].insuranceRenewal
let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection


  this.insuranceExpVsRenewal = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Insurance Expired vs Renewal'
  },
  tooltip: {
    pointFormat: '{series.name}: {point.y}'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'Insurance Expired',
      y: insuranceExpired,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'Insurance Renewal',
      y: insuranceRenewal,
    },
    //  {
    //   name: 'Loan Amount Cash Collection',
    //   y: loanAmountCashCollections,
    // }, 
    // {
    //   name: 'Loan Amount Bank Collection',
    //   y: loanAmountBankCollections,
    // }, 

  ]
  }]

}
return this.insuranceExpVsRenewal;
}

insuranceHoldVsCom :any
    
// Insurance Expired vs Renewal Pie chart
insuranceHoldVsCompleted():any{
let insuranceHold = this.analyticsOverallData[0].insuranceHold  
let insuranceCompleted = this.analyticsOverallData[0].insuranceCompleted
let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection


  this.insuranceHoldVsCom = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Insurance Hold vs Completed'
  },
  tooltip: {
    pointFormat: '{series.name}: {point.y}'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'Insurance Hold',
      y: insuranceHold,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'Insurance Completed',
      y: insuranceCompleted,
    },
    //  {
    //   name: 'Loan Amount Cash Collection',
    //   y: loanAmountCashCollections,
    // }, 
    // {
    //   name: 'Loan Amount Bank Collection',
    //   y: loanAmountBankCollections,
    // }, 

  ]
  }]

}
return this.insuranceHoldVsCom;
}

// Tab 4 
loanDisbursalPie :any
    
// Loan Disbursal Pie chart
loanDisbursalPercentage():any{
let cashDemands = this.analyticsOverallData[0].cashDemand  
let cashCollections = this.analyticsOverallData[0].cashCollection
let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection


  this.loanDisbursalPie = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Loan Disbursal(%)'
  },
  tooltip: {
    pointFormat: '{series.name}: {point.y}'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'Cash Demand',
      y: cashDemands,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'Cash Collection',
      y: cashCollections,
    },
     {
      name: 'Loan Amount Cash Collection',
      y: loanAmountCashCollections,
    }, 
    {
      name: 'Loan Amount Bank Collection',
      y: loanAmountBankCollections,
    }, 

  ]
  }]

}
return this.loanDisbursalPie;
}

bankVsCashamount :any
    
// Bank Vs Cash Pie chart
bankVsCash():any{
let disbursalBank = this.analyticsOverallData[0].disbursalBank  
let disbursalCash = this.analyticsOverallData[0].disbursalCash
let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection


  this.bankVsCashamount = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Disbursal Bank vs Cash'
  },
  tooltip: {
    pointFormat: '{series.name}: {point.y}'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'Disbursal Bank',
      y: disbursalBank,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'Disbursal Cash',
      y: disbursalCash,
    },
    //  {
    //   name: 'Loan Amount Cash Collection',
    //   y: loanAmountCashCollections,
    // }, 
    // {
    //   name: 'Loan Amount Bank Collection',
    //   y: loanAmountBankCollections,
    // }, 

  ]
  }]

}
return this.bankVsCashamount;
}

// Tab 5
// Repossessed Graph
repossessedGraph(){
    Highcharts.chart('repossessedGraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Repossessed'
      },
      subtitle: {
        text: 'amount'
      },
      xAxis: {
        categories: [
          'Mon',
          'Tues',
          'wed',
          // 'Thur',
          // 'Fri',
          // 'Sat',
          // 'Sun',
          // 'Aug',
          // 'Sep',
          // 'Oct',
          // 'Nov',
          // 'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Collected'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        type:undefined,
        name: 'Collection',
        data: [this.analyticsOverallData[0].cashCollection]
    
      }, 
      {
        type:undefined,
        name: 'New Loan Count',
        data: [this.analyticsOverallData[0].loanAmountBankCollection]
    
      }, {
        type:undefined,
        name: 'Insurance Expired',
        data: [this.analyticsOverallData[0].insuranceExpired]
    
      }, {
        type:undefined,
        name: 'Repossessed',
        data: [this.analyticsOverallData[0].disbursalRepossessed]
    
      }
    ]
    }) 
 
}

// Disbursal Repossessed vs Released
repossessedVsReleasedamount :any
    
// Bank Vs Cash Pie chart
repossessedVsReleased():any{
let disbursalRepossessed = this.analyticsOverallData[0].disbursalRepossessed  
let disbursalReleased = this.analyticsOverallData[0].disbursalReleased
let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection


  this.repossessedVsReleasedamount = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Disbursal Repossessed Vs Relesed'
  },
  tooltip: {
    pointFormat: '{series.name}: {point.y}'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'Disbursal Repossessed',
      y: disbursalRepossessed,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'Disbursal Released',
      y: disbursalReleased,
    },
    //  {
    //   name: 'Loan Amount Cash Collection',
    //   y: disbursalReleased,
    // }, 
    // {
    //   name: 'Loan Amount Bank Collection',
    //   y: loanAmountBankCollections,
    // }, 

  ]
  }]

}
return this.repossessedVsReleasedamount;
}

// Tab 6 
allocatedVsExpensesAmount :any
    
// Expenses Pie chart
allocatedVsExpenses():any{
let allocatedCash = this.analyticsOverallData[0].allocatedCash  
let expense = this.analyticsOverallData[0].expense
let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection


  this.allocatedVsExpensesAmount = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Allocated vs Expense made'
  },
  tooltip: {
    pointFormat: '{series.name}: {point.y}'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'Allocated Cash',
      y: allocatedCash,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'Expense',
      y: expense,
    },
    //  {
    //   name: 'Loan Amount Cash Collection',
    //   y: loanAmountCashCollections,
    // }, 
    // {
    //   name: 'Loan Amount Bank Collection',
    //   y: loanAmountBankCollections,
    // }, 

  ]
  }]

}
return this.loanDisbursalPie;
}

rtoExpensesVsCompletedAmount :any
    
// RTO expenses vs completed Pie chart
rtoExpensesVsCompleted():any{
let rtoExpenses = this.analyticsOverallData[0].rtoExpenses  
let rtoCompleted = this.analyticsOverallData[0].rtoCompleted
let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection


  this.rtoExpensesVsCompletedAmount = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'RTO Expenses vs Completed'
  },
  tooltip: {
    pointFormat: '{series.name}: {point.y}'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'RTO Expenses',
      y: rtoExpenses,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'RTO Completed',
      y: rtoCompleted,
    },
    //  {
    //   name: 'Loan Amount Cash Collection',
    //   y: loanAmountCashCollections,
    // }, 
    // {
    //   name: 'Loan Amount Bank Collection',
    //   y: loanAmountBankCollections,
    // }, 

  ]
  }]

}
return this.rtoExpensesVsCompletedAmount;
}

// Tab 7 
docPendingVsCompletedAmount :any
    
// DOC Pending vs Completed chart
docPendingVsCompleted():any{
let docPending = this.analyticsOverallData[0].docPending  
let docCompleted = this.analyticsOverallData[0].docCompleted
let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection


  this.docPendingVsCompletedAmount = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Doc Pending vs Completed'
  },
  tooltip: {
    pointFormat: '{series.name}: {point.y}'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'DOC Pending',
      y: docPending,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'DOC Completed',
      y: docCompleted,
    },
    //  {
    //   name: 'Loan Amount Cash Collection',
    //   y: loanAmountCashCollections,
    // }, 
    // {
    //   name: 'Loan Amount Bank Collection',
    //   y: loanAmountBankCollections,
    // }, 

  ]
  }]

}
return this.docPendingVsCompletedAmount;
}

agtAssignedVsNotAssignedAmount :any
    
// AGT assigned vs Not assigned Pie chart
agtAssignedVsNotAssigned():any{
let agtAssigned = this.analyticsOverallData[0].agtAssigned
let agtNotAssigned = this.analyticsOverallData[0].agtNotAssigned
let loanAmountCashCollections = this.analyticsOverallData[0].loanAmountCashCollection
let loanAmountBankCollections = this.analyticsOverallData[0].loanAmountBankCollection


  this.agtAssignedVsNotAssignedAmount = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'AGT Assigned vs Not Assigned (live)'
  },
  tooltip: {
    pointFormat: '{series.name}: {point.y}'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y}'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'AGT Assigned',
      y: agtAssigned,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'AGT Not Assigned',
      y: agtNotAssigned,
    },
    //  {
    //   name: 'Loan Amount Cash Collection',
    //   y: loanAmountCashCollections,
    // }, 
    // {
    //   name: 'Loan Amount Bank Collection',
    //   y: loanAmountBankCollections,
    // }, 

  ]
  }]

}
return this.agtAssignedVsNotAssignedAmount;
}
}