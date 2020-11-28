import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TOKEN, USER } from './../../app.constants';
import { Authentication } from './../../models/authentication';
import { Credentials } from './../../models/credentials';
import { User } from './../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient, public router: Router) {}

  login(credentials: Credentials): Observable<Authentication> {
    return this.http
      .post(`${environment.api_url}auth/login/`, credentials)
      .pipe(
        map((response: Authentication) => {
          localStorage.removeItem(TOKEN);
          localStorage.removeItem(USER);
          return response;
        })
      );
  }

  setSession(authentication: Authentication): void {
    localStorage.setItem(TOKEN, authentication.token);
    localStorage.setItem(USER, JSON.stringify(authentication.user));
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  logout(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    this.router.navigate(['/sign-in'], { replaceUrl: true });
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(USER));
  }

  isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  isRegularUser(): boolean {
    return !this.getCurrentUser().isInfluencer;
  }

  isInfluencer(): boolean {
    return this.getCurrentUser().isInfluencer;
  }
}
