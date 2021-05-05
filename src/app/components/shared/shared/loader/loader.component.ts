import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vlms-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input()isLoading=false;

  constructor() { }

  ngOnInit(): void {
  }

}
