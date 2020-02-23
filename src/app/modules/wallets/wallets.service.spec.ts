import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { auth, firestore } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Wallet } from './wallet.model';
import { WalletsService } from './wallets.service';

describe('WalletsService', (): void => {
  let _underTest: WalletsService;
  let _db: AngularFirestore;
  let _afAuth: AngularFireAuth;
  let _uid: string;

  beforeEach(async (): Promise<void> => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ]
    });
    _underTest = TestBed.inject(WalletsService);
    _db = TestBed.inject(AngularFirestore);
    _afAuth = TestBed.inject(AngularFireAuth);

    // Setup authentication
    await _afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL);
    _uid = (await _afAuth.auth.signInAnonymously()).user?.uid || '';
  });

  /**
   * Helper function for getting category with specified {@param categoryId}.
   */
  const getWallet: (walletId: string) => Promise<Wallet> = async (walletId: string): Promise<Wallet> => {
    const docSnapshot: firestore.DocumentSnapshot = await _db.collection('users')
      .doc(_uid).collection('wallets').doc(walletId).get().toPromise();

    return Wallet.fromFirestoreData(docSnapshot);
  };

  describe('createNewWallet', (): void => {
    it('should create new wallet', async (): Promise<void> => {
      const createdWallet: Wallet =
        await _underTest.createNewWallet(new Wallet('abc', -1, 1, 'SGD'));

      const result: Wallet = await getWallet(createdWallet.id);
      await expect(result).toEqual(createdWallet);
      await expect(result.name).toBe('abc');
      await expect(result.currency).toBe('SGD');
      await expect(result.currentBalance).toBe(1);
      await expect(result.initialBalance).toBe(-1);
      await expect(result.isDeleted).toBeFalsy();
    });
  });

  describe('updateWallet', (): void => {
    it('should update the wallet', async (): Promise<void> => {
      const createdWallet: Wallet =
        await _underTest.createNewWallet(new Wallet('abc', -1, 1, 'SGD'));

      createdWallet.name = 'cba';
      createdWallet.initialBalance = 0;
      await _underTest.updateWallet(createdWallet);

      const result: Wallet = await getWallet(createdWallet.id);
      await expect(result.name).toBe('cba');
      await expect(result.initialBalance).toBe(0);
    });
  });

  describe('getAllWallets', (): void => {
    it('should get all wallets', async (): Promise<void> => {
      const wallet1: Wallet =
        await _underTest.createNewWallet(new Wallet('abc', -1, 1, 'SGD'));
      const wallet2: Wallet =
        await _underTest.createNewWallet(new Wallet('abc', -1, 1, 'SGD'));

      const result: Wallet[] = await _underTest.getAllWallets();

      let containWallet1: boolean = false;
      let containWallet2: boolean = false;
      result.forEach((w: Wallet): void => {
        if (w.id === wallet1.id) { containWallet1 = true; }
        if (w.id === wallet2.id) { containWallet2 = true; }
      });
      await expect(containWallet1).toBeTruthy();
      await expect(containWallet2).toBeTruthy();
    });
  });

  describe('softDeleteWallet', (): void => {
    it('should soft-delete the passed wallet', async (): Promise<void> => {
      const wallet: Wallet =
        await _underTest.createNewWallet(new Wallet('abc', -1, 1, 'SGD'));

      await _underTest.softDeleteWallet(wallet);

      const result: Wallet = await getWallet(wallet.id);
      await expect(result.id).toBe(wallet.id);
      await expect(result.isDeleted).toBeTruthy();
    });
  });
});
