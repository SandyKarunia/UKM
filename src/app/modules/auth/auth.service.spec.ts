import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', async () => {
    const service: AuthService = TestBed.inject(AuthService);
    await expect(service)
      .toBeTruthy();
  });
});
