import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';

const roles = 'roles';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    getRole: any;

    constructor(private router: Router,private authenticationService: AuthenticationService) { 
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.getRole = localStorage.getItem(roles);
                  if(this.getRole !== null){
                    return true;
                  }
                  else{
                    this.router.navigate(['/login'])
                    return false;   
                  }
    }
}