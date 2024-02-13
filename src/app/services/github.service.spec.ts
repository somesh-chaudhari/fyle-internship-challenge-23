import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GithubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user details', () => {
    const dummyUser = { name: 'John Doe', login: 'johndoe' };

    service.getUser('johndoe').subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpTestingController.expectOne('https://api.github.com/users/johndoe');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyUser);
  });
});
