import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
        let headers: HttpHeaders = new HttpHeaders({
            "Accept": "application/json" ,
            'Authorization': 'Basic ' + btoa('mifos:password')
        });
            request = request.clone({
                url: environment.BASE_URL + request.url,
                headers
            });
        
        return next.handle(request);
    }
}