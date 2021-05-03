import { Routes, Route } from '@angular/router';
// import { AuthenticationGuard as AuthGuard } from 'services/core/authentication/authentication.guard';
// import { ShellComponent } from 'app/components/shell';
import { Injectable } from '@angular/core';
import { AuthGuard } from "../services/core/auth.guard";
import {SharedComponent} from "../components/shared/shared/shared.component";

@Injectable({
  providedIn: 'root'
})
/**
 * Provides helper methods to create routes.
 */
export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: SharedComponent,
      children: routes,
      canActivate: [AuthGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }
}



