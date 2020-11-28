import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from 'src/app/models/posts';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  resourceUrl = `${environment.api_url}posts/`;

  constructor(private http: HttpClient) {}

  getPosts(page: number, userId: string): Observable<HttpResponse<Posts>> {
    const url = userId ? `${this.resourceUrl}${userId}/` : this.resourceUrl
   return this.http.get<Posts>(`${url}?page=${page}`, {

      observe: 'response'
    });
  }

  addPost(data): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.resourceUrl}`, data, {
       observe: 'response'
     });
   }
}
