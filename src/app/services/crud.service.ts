
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CrudService {
    constructor(
        private http: HttpClient) {}

    get(model: string, params?: Object): Observable<any> {
        return this.http.get(model, params);
    }

    post(relativeUrlPath: string, body: any, params?: object): Observable<any> {
        return this.http.post(relativeUrlPath, body, params);
    }

    delete(model: string, id:any): Observable<any> {
        return this.http.delete(`${model}/${id}/?tenantIdentifier=default`);
    }

    update(model: string, body: any, id: any) {
        return this.http.put(`${model}/${id}/?tenantIdentifier=default`, body);
    }

    get_Image(model: string, params?: Object): Observable<any> {
        return this.http.get(model, { responseType: 'text'});
    }

    upload_Image(relativeUrlPath: any, form: FormData, params?: object) {
        return this.http.post(relativeUrlPath, form, params)
      }
}
