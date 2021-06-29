import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vlms-assign-target',
  templateUrl: './assign-target.component.html',
  styleUrls: ['./assign-target.component.scss']
})
export class AssignTargetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ontabClick(event:any){
    console.log(event)
  }
  createAssignFE(){

  }
  createAssignBranch(){

  }
}
