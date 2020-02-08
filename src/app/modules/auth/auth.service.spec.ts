import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
    ],
  }));

  it('should be created', async () => {
    const service: AuthService = TestBed.inject(AuthService);
    await expect(service)
      .toBeTruthy();
  });
});
