/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';

/** Shared Component*/
@Component({
  selector: 'vlms-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  constructor(private router: Router,private sharedService:SharedService) { }

  isLoading:boolean=false;

  ngOnInit(): void {
    this.sharedService.getLoaderShownProperty().subscribe(({ isLoading }) => {
      setTimeout(()=>{
        this.isLoading = isLoading;
      },0);
    });
  }

}
