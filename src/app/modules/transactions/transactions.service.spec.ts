import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { auth, firestore } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Transaction } from './transaction.model';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', (): void => {
    let _underTest: TransactionsService;
    let _db: AngularFirestore;
    let _afAuth: AngularFireAuth;
    let _uid: string;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebase),
                AngularFireAuthModule,
                AngularFirestoreModule,
            ]
        });
        _underTest = TestBed.inject(TransactionsService);
        _db = TestBed.inject(AngularFirestore);
        _afAuth = TestBed.inject(AngularFireAuth);

        // Setup authentication
        await _afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL);
        _uid = (await _afAuth.auth.signInAnonymously()).user?.uid || '';
    });

    /**
     * Helper function for getting category with specified {@param categoryId}.
     */
    const getTransaction: (walletId: string) => Promise<Transaction> = async (transactionId: string): Promise<Transaction> => {
        const docSnapshot: firestore.DocumentSnapshot = await _db.collection('users')
            .doc(_uid).collection('transactions').doc(transactionId).get().toPromise();

        return Transaction.fromFirestoreData(docSnapshot);
    };

    describe('createNewTransaction', async () => {
        it('should create new transaction', async () => {
            const createdTransaction: Transaction =
                await _underTest.createNewTransaction(new Transaction(-1, 'walletid', 'catid', 'the notes'));

            const result: Transaction = await getTransaction(createdTransaction.id);
            await expect(result).toEqual(createdTransaction);
            await expect(result.amount).toBe(-1);
            await expect(result.walletId).toBe('walletid');
            await expect(result.notes).toBe('the notes');
            await expect(result.categoryId).toBe('catid');
            await expect(result.isDeleted).toBeFalsy();
        });
    });

    describe('updateTransaction', async () => {
        it('should update the transaction', async () => {
            const createdTransaction: Transaction =
                await _underTest.createNewTransaction(new Transaction(-1, 'walletid', 'catid', 'the notes'));

            createdTransaction.walletId = 'new-wallet';
            createdTransaction.amount = 1;
            await _underTest.updateTransaction(createdTransaction);

            const result: Transaction = await getTransaction(createdTransaction.id);
            await expect(result.walletId).toBe('new-wallet');
            await expect(result.amount).toBe(1);
        });
    });

    describe('getAllTransactions', async () => {
        it('should get all transactions', async () => {
            const transaction1: Transaction =
                await _underTest.createNewTransaction(new Transaction(-1, 'walletid', 'catid', 'the notes'));
            const transaction2: Transaction =
                await _underTest.createNewTransaction(new Transaction(-1, 'walletid', 'catid', 'the notes'));

            const result: Transaction[] = await _underTest.getAllTransactions();

            let containTransaction1: boolean = false;
            let containTransaction2: boolean = false;
            result.forEach((t: Transaction) => {
                if (t.id === transaction1.id) { containTransaction1 = true; }
                if (t.id === transaction2.id) { containTransaction2 = true; }
            });
            await expect(containTransaction1).toBeTruthy();
            await expect(containTransaction2).toBeTruthy();
        });
    });

    describe('softDeleteTransaction', async () => {
        it('should soft-delete the passed transaction', async () => {
            const transaction: Transaction =
                await _underTest.createNewTransaction(new Transaction(-1, 'walletid', 'catid', 'the notes'));

            await _underTest.softDeleteTransaction(transaction);

            const result: Transaction = await getTransaction(transaction.id);
            await expect(result.id).toBe(transaction.id);
            await expect(result.isDeleted).toBeTruthy();
        });
    });
});
