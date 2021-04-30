import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
      private Loginurl = "fineract-provider/api/v1/authentication?tenantIdentifier=default";

  constructor(private http: HttpClient) { }

   loginUser(user: {}) {
          return this.http.post<any>(this.Loginurl, user)
   }

   post(relativeUrlPath: string, body: any, params?: object): Observable<any> {
    console.log(relativeUrlPath,body,params)
    return this.http.post(relativeUrlPath, body, params);
}

get windowRef() {
  return window
}
  
}

