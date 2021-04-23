/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Loan Process Component */
@Component({
  selector: 'vlms-loan-process',
  templateUrl: './loan-process.component.html',
  styleUrls: ['./loan-process.component.scss']
})
export class LoanProcessComponent implements OnInit {

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  constructor() { }
        
  
  ngOnInit(): void {
  }

}
