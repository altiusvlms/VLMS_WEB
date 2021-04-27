/** Angular Imports */
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';


import { ToastContainerDirective,ToastrService } from 'ngx-toastr';


/**
 * Main web app component.
 */
@Component({
  selector: 'vlms-web-app',
  templateUrl: './web-app.component.html',
  styleUrls: ['./web-app.component.scss']
})
export class WebAppComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  /**
   * @param {Router} router Router for navigation.
   * @param {ActivatedRoute} activatedRoute Activated Route.
   * @param {Title} titleService Title Service.
   * @param {TranslateService} translateService Translate Service.
   */
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private toast: ToastrService,
              private db: AngularFirestore,
          ) { 
            const things = db.collection('things').valueChanges();
      things.subscribe(console.log);
          }

  ngOnInit() {

  }

}
