import { TestBed } from '@angular/core/testing';

import { IssignedguardService } from './issignedguard.service';

describe('IssignedguardService', () => {
  let service: IssignedguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssignedguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
