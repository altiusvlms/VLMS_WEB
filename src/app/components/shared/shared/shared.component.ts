/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** Shared Component*/
@Component({
  selector: 'vlms-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
