// user-details.component.ts

import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user.component.html',
  // styleUrls: ['./user-details.component.css']
})
export class UserComponent implements OnInit {
  username: string;
  user: any;
  repos: any[];
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  availablePageSizes: number[] = [10, 20, 50, 100];
  totalNumPages: number = 1;

  constructor(private githubService: GithubService) {
    this.username= "";
    this.repos = [];
   }

  ngOnInit(): void {
  }

  getUserDetails(): void {
    this.loading = true;
    this.githubService.getUser(this.username).subscribe(user => {
      this.user = user;
      this.getUserRepos();
      this.loading = false;
    }, error => {
      console.error('Error fetching user details:', error);
      this.loading = false;
    });
  }

  getUserRepos(): void {
    this.loading = true; 
    this.githubService.getUserRepos(this.username, this.currentPage, this.pageSize).subscribe(repos => {
      this.repos = repos;
      this.currentPage = 1; // Reset to first page after fetching new repos
      this.totalNumPages = Math.ceil(repos.length / this.pageSize);
      // Fetch additional details for each repository
      repos.forEach(repo => {
        this.githubService.getRepoLanguages(this.username, repo.name).subscribe(languages => {
          repo.languages = Object.keys(languages);
        });
        this.loading = false; 
      });
    }, error => {
      console.error('Error fetching user repos:', error);
    });
  }

  get pagedRepos(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.repos.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.repos.length / this.pageSize);
  }

  onPageSizeChange(): void {
    this.currentPage = 1; // Reset current page to 1 when page size changes
    this.getUserRepos(); // Fetch repositories with updated page size
  }

  private updatePageSizeOptions(): void {
    // Calculate total pages based on total repositories and update page size options
    if (this.user?.public_repos) {
      const totalPages = Math.ceil(this.user.public_repos / this.pageSize);
      this.availablePageSizes = this.availablePageSizes.filter(size => size <= totalPages * this.pageSize);
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.getUserRepos();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUserRepos();
    }
  }
}
