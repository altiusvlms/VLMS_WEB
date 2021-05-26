import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Data } from '@angular/router';
// import { Options, LabelType } from '@angular-slider/ngx-slider';
import {  LabelType } from 'ng5-slider';
import * as Highcharts from 'highcharts'
import { Options } from "highcharts";


import {  CrudService } from '../../../../services/crud.service';
import { appModels } from '../../../../services/utils/enum.util';
import { untilDestroyed,UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })


// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'vlms-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  
  id : any;
  filters: any;
  

   TotalInterest : number;
   TotalPayable : number;
   MonthlyDue : number;
  analyticsOverallData: any;

  constructor(private crudService: CrudService) { 
    // this.yrToggel = true; 
  }


  fromdate: Date;
  todate: Date;
  MonthlyCorrectDue:any;

  

  // }
  ngOnInit(): void {
    
    // debugger
  this.getOverallData();

  

  }

  // generatePdf(pdfmake : any){
  //   const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //   pdfmake.createPdf(documentDefinition).open();
  //  }

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
    this.mapGraphData();
    Highcharts.chart("piechart", this.mapPiechartData() );
    
  })
}

  mapGraphData() {
    // chartOptions: Highcharts.Options = {
      Highcharts.chart('graph2', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Monthly Average Rainfall'
        },
        subtitle: {
          text: 'Source: WorldClimate.com'
        },
        xAxis: {
          categories: [
            'Mon',
            'Feb',
            'Mar',
            'Apr',
            // 'May',
            // 'Jun',
            // 'Jul',
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
            text: 'Rainfall (mm)'
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
          name: 'insuranceExpired',
          data: [this.analyticsOverallData[0].insuranceExpired]
      
        }, 
        // {
        //   type:undefined,
        //   name: 'New York',
        //   data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      
        // }, {
        //   type:undefined,
        //   name: 'London',
        //   data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
      
        // }, {
        //   type:undefined,
        //   name: 'Berlin',
        //   data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
      
        // }
      ]
      }) 
    // }
  }
    

  // })


  chartss :any
  
// Pie chart
mapPiechartData():any{
let values = this.analyticsOverallData[0].insuranceExpired  
// chartss: Highcharts.Options = {
// Highcharts.chart('container', {
  this.chartss = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Browser market shares in January, 2018'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'insuranceExpired',
      y: values,
      // sliced: true,
      // selected: true
      
    }, {
      name: 'Internet Explorer',
      y: values,
      

    },
     {
      name: 'Firefox',
      y: 10.85
    }, {
      name: 'Edge',
      y: 4.67
    }, {
      name: 'Safari',
      y: 4.18
    }, {
      name: 'Sogou Explorer',
      y: 1.64
    }, {
      name: 'Opera',
      y: 1.6
    }, {
      name: 'QQ',
      y: 1.2
    }, {
      name: 'Other',
      y: 2.61
    }]
  }]
// }),
}
return this.chartss;
}

}
