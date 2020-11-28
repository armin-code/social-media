import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowingsService {
  resourceUrl = `${environment.api_url}influencer/`;

  constructor(private http: HttpClient) {}
  getInfluencerList(page: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.resourceUrl}?page=${page}`, {
      observe: 'response'
    });
  }
}
