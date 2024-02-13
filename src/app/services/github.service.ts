// github.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  // private headers = new HttpHeaders().set('Authorization', `token ${GITHUB_ACCESS_TOKEN}`);

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`);
  }

  getUserRepos(username: string, page: number = 1, perPage: number = 10): Observable<any[]> {
    const params = new HttpParams().set('page', page.toString()).set('per_page', perPage.toString());
    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos`, { params });
  }

  getRepoDetails(owner: string, repoName: string, page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/repos/${owner}/${repoName}`);
  }

  getRepoLanguages(owner: string, repoName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/repos/${owner}/${repoName}/languages`);
  }
}
