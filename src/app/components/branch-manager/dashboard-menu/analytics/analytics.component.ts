/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Analytics Component */
@Component({
  selector: 'vlms-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  isfield:Boolean = true;
  isbranch:Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  field(){
    this.isfield = true;
  }

  branch(){
    this.isbranch = true;
  }
}