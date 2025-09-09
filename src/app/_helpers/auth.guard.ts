﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.userValue;
        console.log('AuthGuard: Checking user authentication and authorization', this.authenticationService.userValue);
        if (user) {
            // check if route is restricted by role
            console.log('AuthGuard: User is logged in', user,route);
            const { roles } = route.data;
            console.log(roles && !roles.includes(user.userRole), 'AuthGuard: Checking user role', roles,user.userRole);
            if (roles && !roles.includes(user.userRole)) {
                // role not authorized so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}