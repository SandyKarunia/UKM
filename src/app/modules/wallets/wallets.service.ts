import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Wallet } from './wallet.model';

const USERS: string = 'users';
const WALLETS: string = 'wallets';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {
  private readonly _db: AngularFirestore;
  private readonly _afAuth: AngularFireAuth;

  constructor(db: AngularFirestore, afAuth: AngularFireAuth) {
    this._db = db;
    this._afAuth = afAuth;
  }

  /**
   * Creates a new document of wallet in firestore based on the specified
   * {@param wallet}.
   *
   * @param wallet instance of {@link Wallet} to be saved into firestore
   * @returns new instance of {@link Wallet} with its id filled
   */
  async createNewWallet(wallet: Wallet): Promise<Wallet> {
    const docRef: firestore.DocumentReference = await this._db.collection(USERS)
      .doc(this._afAuth.auth.currentUser?.uid)
      .collection(WALLETS)
      .add(wallet.toFirestoreData());

    return Wallet.fromFirestoreData(await docRef.get());
  }

  /**
   * Updates an existing wallet in firestore based on the specified {@param wallet}.
   *
   * @param wallet instance of {@link Wallet} to be updated in firestore
   */
  async updateWallet(wallet: Wallet): Promise<void> {
    await this._db.collection(USERS)
      .doc(this._afAuth.auth.currentUser?.uid)
      .collection(WALLETS)
      .doc(wallet.id)
      .update(wallet.toFirestoreData());
  }

  /**
   * Gets all wallets.
   */
  async getAllWallets(): Promise<Wallet[]> {
    const querySnapshot: firestore.QuerySnapshot = await this._db.collection(USERS)
      .doc(this._afAuth.auth.currentUser?.uid)
      .collection(WALLETS)
      .get()
      .toPromise();

    const res: Wallet[] = [];
    querySnapshot.forEach((doc: firestore.QueryDocumentSnapshot) => {
      if (!doc.exists) {
        console.error(`data for wallet document with id = '${doc.id}' doesn't exist, but queried`);

        return;
      }

      res.push(Wallet.fromFirestoreData(doc));
    });

    return res;
  }

  /**
   * Soft-deletes a wallet in firestore. The passed {@param wallet} will have
   * {@code isDeleted} property set to true.
   *
   * @param wallet the wallet that will be soft-deleted
   */
  async softDeleteWallet(wallet: Wallet): Promise<void> {
    wallet.isDeleted = true;
    await this.updateWallet(wallet);
  }
}
