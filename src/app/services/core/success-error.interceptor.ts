import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { SharedService } from '../shared.service';

@Injectable()
export class SuccessErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private sharedService: SharedService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map(response =>
                this.successHandler(response)
            ),
            catchError(err => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    // this.authenticationService.logout();
                    // location.reload(true);
                }
                const error = err.error.message || err.statusText;
                if (error) {
                }
                return throwError(err);
            }))

    }

    // Handle the success responses and its messages
    private successHandler(response: HttpEvent<any>): HttpEvent<any> {
        if (response instanceof HttpResponse) {
            let { body, headers } = response;
            this.sharedService.setLoaderShownProperty(true);
            return response
        }
        return response;
    }

}