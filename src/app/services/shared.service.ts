import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor() { }
    
    private subject = new Subject<any>();

    setLoaderShownProperty(isLoading: boolean): void {
        this.subject.next({ isLoading });
    }

    getLoaderShownProperty(): Observable<any> {
        return this.subject.asObservable();
    }  

}

