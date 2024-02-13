import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { GithubService } from '../services/github.service';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;

  beforeEach(async () => {
    const githubServiceSpyObj = jasmine.createSpyObj('GithubService', ['getUser', 'getUserRepos']);

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: GithubService, useValue: githubServiceSpyObj }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    githubServiceSpy = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details', () => {
    const user = { name: 'John Doe', login: 'johndoe' };
    githubServiceSpy.getUser.and.returnValue(of(user));

    component.username = 'johndoe';
    component.getUserDetails();

    expect(component.user).toEqual(user);
  });

  // Add more test cases as needed
});