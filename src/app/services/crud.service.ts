
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
        console.log(relativeUrlPath,body,params)
        return this.http.post(relativeUrlPath, body, params);
    }

    delete(model: string, id:any): Observable<any> {
        return this.http.delete(`${model}/${id}`);
    }

    update(model: string, body: any, id: any) {
        console.log(model,id)
        return this.http.put(`${model}/${id}`, body);
    }
}
