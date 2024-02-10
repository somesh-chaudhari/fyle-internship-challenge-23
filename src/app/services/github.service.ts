// github.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
const GITHUB_ACCESS_TOKEN = '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';
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private headers = new HttpHeaders().set('Authorization', `token ${GITHUB_ACCESS_TOKEN}`);

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`, { headers: this.headers });
  }

  getUserRepos(username: string, page: number = 1, perPage: number = 10): Observable<any[]> {
    const params = new HttpParams().set('page', page.toString()).set('per_page', perPage.toString());
    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos`, { headers: this.headers, params });
  }

  getRepoDetails(owner: string, repoName: string, page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/repos/${owner}/${repoName}`, { headers: this.headers });
  }

  getRepoLanguages(owner: string, repoName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/repos/${owner}/${repoName}/languages`, { headers: this.headers });
  }
}
