import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {     
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'responseType': 'json',
        });   
        // return this.http.get<any>(`${environment.apiUrl}/login`, { headers: headers })
        //     .pipe(map(user => {                
        //         //store user details and jwt token in local storage to keep user logged in between page refreshes
        //         if(user.status === 400){
        //             return user;
        //         }
        //         //user.role = 'Admin'
        //         sessionStorage.setItem('user', JSON.stringify(user.data));
        //         this.userSubject.next(user.data);
        //         return user;
        //     }));
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, {"identifier": username,"password": password})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('user');
        sessionStorage.clear();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
    getDataBasedMobile(mobile: string) {
         return this.http.get<any>(`${environment.apiUrl}/registrations/mobile/no/${mobile}`)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              return user;
               
            }));
    }



}