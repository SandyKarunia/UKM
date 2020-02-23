import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Transaction } from './transaction.model';

const USERS: string = 'users';
const TRANSACTIONS: string = 'transactions';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    private readonly _db: AngularFirestore;
    private readonly _afAuth: AngularFireAuth;

    constructor(db: AngularFirestore, afAuth: AngularFireAuth) {
        this._db = db;
        this._afAuth = afAuth;
    }

    /**
     * Creates a new document of transaction in firestore based on the specified
     * {@param transaction}.
     *
     * @param transaction instance of {@link Transaction} to be saved into firestore
     * @returns new instance of {@link Transaction} with its id filled
     */
    async createNewTransaction(transaction: Transaction): Promise<Transaction> {
        const docRef: firestore.DocumentReference = await this._db.collection(USERS)
            .doc(this._afAuth.auth.currentUser?.uid)
            .collection(TRANSACTIONS)
            .add(transaction.toFirestoreData());

        return Transaction.fromFirestoreData(await docRef.get());
    }

    /**
     * Updates an existing transaction in firestore based on the specified {@param transaction}.
     *
     * @param transaction instance of {@link Transaction} to be updated in firestore
     */
    async updateTransaction(transaction: Transaction): Promise<void> {
        await this._db.collection(USERS)
            .doc(this._afAuth.auth.currentUser?.uid)
            .collection(TRANSACTIONS)
            .doc(transaction.id)
            .update(transaction.toFirestoreData());
    }

    /**
     * Gets all transactions.
     */
    async getAllTransactions(): Promise<Transaction[]> {
        const querySnapshot: firestore.QuerySnapshot = await this._db.collection(USERS)
            .doc(this._afAuth.auth.currentUser?.uid)
            .collection(TRANSACTIONS)
            .get()
            .toPromise();

        const res: Transaction[] = [];
        querySnapshot.forEach((doc: firestore.QueryDocumentSnapshot): void => {
            if (!doc.exists) {
                console.error(`data for transaction document with id = '${doc.id}' doesn't exist, but queried`);

                return;
            }

            res.push(Transaction.fromFirestoreData(doc));
        });

        return res;
    }

    /**
     * Soft-deletes a transaction in firestore. The passed {@param transaction} will have
     * {@code isDeleted} property set to true.
     *
     * @param transaction the transaction that will be soft-deleted
     */
    async softDeleteTransaction(transaction: Transaction): Promise<void> {
        transaction.isDeleted = true;
        await this.updateTransaction(transaction);
    }
}
