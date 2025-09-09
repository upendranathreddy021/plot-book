import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutService {
  private timeout: any;
  private idleTime = 15 * 60 * 1000; // 15 minutes
  private events = ['mousemove', 'keydown', 'click', 'scroll'];

  constructor(private router: Router, private ngZone: NgZone,
    private authenticationService: AuthenticationService
  ) {
    this.resetTimer();
    this.setupListeners();
  }

  private setupListeners() {
    this.events.forEach(event => {
      window.addEventListener(event, () => this.resetTimer());
    });
  }

  private resetTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.logoutUser(), this.idleTime);
  }

  private logoutUser() {
    this.clearSession();
    this.authenticationService.logout();
  }

  private clearSession() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  }
}
