import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Data } from '@angular/router';
// import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Options, LabelType } from 'ng5-slider';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'vlms-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {
  id : any;
  filters: any;
  pemi = {
    value: "25"
  }
  remi = {
    value: "8.5"
  }
  temi = {
    value: "20"
  }
  memi = {
    value: "240"
  }

  query = {
    amount: "",
    interest: "",
    tenureYr: "",
    tenureMo: ""
  }

  result = {
    emi: "",
    interest: "",
    total: ""
  }
  yrToggel: boolean;
  poptions: Options = {
    floor: 1,
    ceil: 200,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>T</b>';
        case LabelType.High:
          return value + '<b>T</b>';
        default:
          return value + '<b>T</b>';
      }
    }
  };
  roptions: Options = {
    floor: 5,
    ceil: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>%</b>';
        case LabelType.High:
          return value + '<b>%</b>';
        default:
          return value + '<b>%</b>';
      }
    }
  };
  toptions: Options = {
    floor: 1,
    ceil: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Yr</b>';
        case LabelType.High:
          return value + '<b>Yr</b>';
        default:
          return value + '<b>Yr</b>';
      }
    }
  };
  moptions: Options = {
    floor: 1,
    ceil: 360,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Mo</b>';
        case LabelType.High:
          return value + '<b>Mo</b>';
        default:
          return value + '<b>Mo</b>';
      }
    }
  };

   TotalInterest : number;
   TotalPayable : number;
   MonthlyDue : number;

  constructor() { this.yrToggel = true; }

  ngAfterViewInit() {
    // debugger
    this.update();
  }

  tbupdate(id : any) {
    // debugger
    if (id == 0) {
      this.pemi.value = (Number(this.query.amount) / 100000 ).toString();
    }
    else if (id == 1) {
      this.remi.value = this.query.interest;
    }
    else if (id == 2) {
      this.temi.value = this.query.tenureYr;
    }
    else if (id == 3) {
      this.memi.value = this.query.tenureMo;
    }
    this.update();
  }

  fromdate: Date;
  todate: Date;
  MonthlyCorrectDue:any;

  update() {
    // debugger
    var loanAmount = Number(this.query.amount);
    var rateOfInterest = Number(this.query.interest);
    var numberOfMonths = (this.yrToggel) ? (Number(this.query.tenureYr) * 12) : Number(this.query.tenureMo);
    // var monthlyInterestRatio = (rateOfInterest / 100) / 12;
console.log(this.fromdate);
     this.TotalInterest = (loanAmount * rateOfInterest) / 100;

     this.TotalPayable = loanAmount + this.TotalInterest;

     var MonthlyDue = this.TotalPayable / numberOfMonths;
     this.MonthlyCorrectDue = Number (Math.round(MonthlyDue))



    // this.query.amount = loanAmount.toString();
    // this.query.interest = rateOfInterest.toString();
    // if (this.yrToggel) {
    //   this.query.tenureYr = this.temi.value.toString();
    // }
    // else {
    //   this.query.tenureMo = this.memi.value.toString();
    // }

    // var top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    // var bottom = top - 1;
    // var sp = top / bottom;
    // var emi = ((loanAmount * monthlyInterestRatio) * sp);
    // var full = numberOfMonths * emi;
    // var interest = full - loanAmount;
    // var int_pge = (interest / full) * 100;

    // this.result.emi = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // this.result.total = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // this.result.interest = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.DueCalc();
  }
  daydiff:any;
  delayDueAmount:any;
  totalAmt : any;
  DueCalc(){
    // debugger
     var totaltimediff =  this.todate.getTime() - this.fromdate.getTime();
      var daydiff = totaltimediff / ( 1000 * 3600 * 24);
     var interestPerYear = Number (this.query.interest) * 100 / 365;
     var dueInterest = Number (Math.round(interestPerYear))
     console.log("dueInterest")
     console.log(dueInterest)

      var delayDueAmount = dueInterest * daydiff;
      this.delayDueAmount = Number ((Math.ceil(delayDueAmount / 10) * 10))
      console.log("delayDueAmount")
      console.log(this.delayDueAmount)

     this.totalAmt = this.delayDueAmount + this.MonthlyCorrectDue



  }
  ngOnInit(): void {
  }

  generatePdf(pdfmake : any){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfmake.createPdf(documentDefinition).open();
   }
  

}
