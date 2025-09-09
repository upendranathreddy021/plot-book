import { Component, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';
import { IdleTimeoutService } from './_services/idle-timeout.service';
import { CommonServiceService } from './_services/common-service.service';
import { APIS } from './constants/constants';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;
    Role = Role
     notifications:any = [];
     showHeader: boolean = true;

    constructor(private authenticationService: AuthenticationService,
        private idleService: IdleTimeoutService, private _commonService: CommonServiceService,
        private router: Router) {
        this.authenticationService.user.subscribe(x => {
            this.user = x
             this.getNotifications()
        });
        
        this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
          // Hide header on the login page
          if (event.urlAfterRedirects.includes('/login')) {
            this.showHeader = false;
          } else {
            this.showHeader = true;
          }
        });
    }
    getNotifications() {
        if(!this.user) return;
        this.notifications = [];
        this._commonService.getDataByUrl(APIS.tihclMasterList.getNotifications+this.user?.userRole).subscribe({
            next: (data: any) => {
                this.notifications = data || {};
            },
            error: (error: any) => {
                console.error('Error fetching notifications:', error);
            }
        });
    }
    
    get isAdmin() {
        return this.user?.userRole === Role.Admin;
    }
    

    logout() {
        this.authenticationService.logout();
    }
    readNotification(notification: any) {
        if (notification && notification.id) {
            this._commonService.updatedataPatch(APIS.tihclMasterList.readNotification,[{"id": notification.id}] ).subscribe({
                next: () => {
                    this.getNotifications();
                },
                error: (error: any) => {
                    console.error('Error reading notification:', error);
                }
            });
        }
    }   

}

@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective {
    private roles: Role[] = [];

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.user.subscribe(user => {
            this.updateView(user);
        });
    }

    @Input()
    set appHasRole(roles: Role[]) {
        this.roles = roles;
        this.updateView(this.authenticationService.userValue);
    }

    private updateView(user: User | null) {
        if (user && this.roles.includes(user.userRole)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
   
}