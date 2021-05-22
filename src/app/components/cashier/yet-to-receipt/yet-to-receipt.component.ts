import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vlms-yet-to-receipt',
  templateUrl: './yet-to-receipt.component.html',
  styleUrls: ['./yet-to-receipt.component.scss']
})
export class YetToReceiptComponent implements OnInit {
  // groups: any;

  constructor() { }

  ngOnInit(): void {
  }
  groups=[
    {
      "name": "pencils",
      "items": "red pencil"
    },
    {
      "name": "rubbers",
      "items": "big rubber"
    },
 ];

  addItem(index : any) {
    var currentElement = this.groups[index];  
    this.groups.splice(index, 0, currentElement);
  }

//   addRow(row: {name: string; items: string;}): void {
//     this.groups.push(row);
//  }

}
