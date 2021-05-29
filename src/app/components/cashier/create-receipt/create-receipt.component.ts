import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vlms-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss']
})
export class CreateReceiptComponent implements OnInit {

  constructor(private router: Router) { }
 
  showPopup:Boolean = true;
  ngOnInit(): void {
  this.showPopup = true;

  }
  searchtab(){
    this.router.navigate(['/cashier/create-receipt']);
  }
}
