import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }
    BasicAuth = {
        Username:"mifos",
        Password:"password"
      }
    
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("request")
        console.log(request)
        console.log( environment.BASE_URL)
console.log(this.BasicAuth)
            request = request.clone({
                url: environment.BASE_URL + request.url,
                setHeaders: { 
                    Authorization: `Basic ${this.BasicAuth}`
                }
            });
        
        return next.handle(request);
    }
}