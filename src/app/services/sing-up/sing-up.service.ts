import { Registration } from './../../models/registration';
import { Registered } from './../../models/registered';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SingUpService {
  resourceUrl = `${environment.api_url}auth/signup/
  `;

  constructor(private http: HttpClient) {}

  signUp(data: Registration): Observable<HttpResponse<Registered>> {
    return this.http.post<Registered>(`${this.resourceUrl}`, data, {
      observe: 'response'
    });
  }
}
