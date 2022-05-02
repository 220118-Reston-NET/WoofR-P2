import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly apiUrl = environment.apiURL;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post<User>(this.apiUrl + 'Authentication/Login', model, {responseType: 'json'}).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    ) 
  }

  register(model: any) {
    return this.http.post<User>(this.apiUrl + 'Authentication/Register', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          alert('Created!');
        }
      })
    );
  }

  setCurrentUser(user: User) {
    const token = this.getDecodeToken(user.token);
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
    // this.currentUserSource.next(null);
  }

  getDecodeToken(token:any){
    return JSON.parse(atob(token.split('.')[1]));
  }
}