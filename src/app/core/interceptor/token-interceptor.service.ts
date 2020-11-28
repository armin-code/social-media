import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.authService.getToken() &&
      req.url.indexOf('/auth/login/') === -1 &&
      req.url.indexOf('/auth/signup/') === -1
    ) {
      req = this.addTokenToRequest(req, this.authService.getToken());
    }

    return next.handle(req).pipe(
      catchError(() => {
        this.snackBar.open('ERROR', 'Something went wrong', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        return next.handle(req);
      })
    ) as any;
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): any {
    return request.clone({ setHeaders: { Authorization: `token ${token}` } });
  }
}
