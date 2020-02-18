import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { WalletsService } from './wallets.service';

describe('WalletsService', (): void => {
  let service: WalletsService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp({}),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ]
    });
    service = TestBed.inject(WalletsService);
  });

  it('should be created', async (): Promise<void> => {
    await expect(service)
      .toBeTruthy();
  });
});