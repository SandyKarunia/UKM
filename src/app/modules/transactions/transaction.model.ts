import { firestore } from 'firebase/app';

export class Transaction {

    private _id: string;
    private _amount: number;
    private _walletId: string;
    private _categoryId: string;
    private _notes: string;
    private _createdAt: firestore.Timestamp;
    private _isDeleted: boolean;

    constructor(amount: number, walletId: string, categoryId: string, notes: string) {
        this._amount = amount;
        this._walletId = walletId;
        this._categoryId = categoryId;
        this._notes = notes;
        this._isDeleted = false;
        this._createdAt = firestore.Timestamp.now();
    }

    /**
     * An identifier string of a transaction model.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * The amount that was exchanged in the transaction.
     */
    public get amount(): number {
        return this._amount;
    }
    public set amount(v: number) {
        this._amount = v;
    }

    /**
     * The identifier of the wallet that the transaction happened in.
     */
    public get walletId(): string {
        return this._walletId;
    }
    public set walletId(v: string) {
        this._walletId = v;
    }

    /**
     * The identifier of the category about the transaction that happened.
     */
    public get categoryId(): string {
        return this._categoryId;
    }
    public set categoryId(v: string) {
        this._categoryId = v;
    }

    /**
     * The notes / description / explanation about the transaction.
     */
    public get notes(): string {
        return this._notes;
    }
    public set notes(v: string) {
        this._notes = v;
    }

    /**
     * The time the transaction was created, by default it is the current timestamp.
     */
    public get createdAt(): firestore.Timestamp {
        return this._createdAt;
    }
    public set createdAt(v: firestore.Timestamp) {
        this._createdAt = v;
    }

    /**
     * A flag which determines whether the transaction is active or not.
     * When the user is deleting the transaction, it will flip this flag from {@code false} to {@code true} (soft-delete).
     */
    public get isDeleted(): boolean {
        return this._isDeleted;
    }
    public set isDeleted(v: boolean) {
        this._isDeleted = v;
    }

    /**
     * Creates a new instance of {@link Transaction} from {@link firestore.DocumentSnapshot}.
     */
    public static fromFirestoreData(snapshot: firestore.DocumentSnapshot): Transaction {
        const data: firestore.DocumentData | undefined = snapshot.data();
        if (typeof data === 'undefined') {
            throw new Error(`data for transaction document with id = '${snapshot.id}' is undefined`);
        }

        const res: Transaction = new Transaction(data.amount, data.walletId, data.categoryId, data.notes);
        res._id = snapshot.id;
        res._isDeleted = data.isDeleted;
        res._createdAt = data.createdAt;

        return res;
    }

    /**
     * Converts current instance of {@link Transaction} to {@link firestore.DocumentData}.
     */
    public toFirestoreData(): firestore.DocumentData {
        const data: firestore.DocumentData = {
            amount: this.amount,
            walletId: this.walletId,
            categoryId: this.categoryId,
            notes: this.notes,
            isDeleted: this._isDeleted,
            createdAt: this._createdAt,
        };

        if (this.id) {
            data.id = this.id;
        }

        return data;
    }
}
