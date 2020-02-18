import { firestore } from 'firebase';

export class Wallet {
    private _id: string;
    private _name: string;
    private _initialBalance: number;
    private _currentBalance: number;
    private _currency: string;
    private _isDeleted: boolean;

    constructor(name: string, initialBalance: number, currentBalance: number, currency: string) {
        this._name = name;
        this._initialBalance = initialBalance;
        this._currentBalance = currentBalance;
        this._currency = currency;
    }

    /**
     * An identifier string of a wallet model.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * The display name of the wallet.
     */
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

    /**
     * The initial balance of the wallet.
     */
    public get initialBalance(): number {
        return this._initialBalance;
    }
    public set initialBalance(v: number) {
        this._initialBalance = v;
    }

    /**
     * The current balance of the wallet. This field is used as a "cache",
     * since the real balance can be calculated from all the transactions.
     */
    public get currentBalance(): number {
        return this._currentBalance;
    }
    public set currentBalance(v: number) {
        this._currentBalance = v;
    }

    /**
     * The currency of the wallet. This should be the 3-letters (ISO) currency code.
     */
    public get currency(): string {
        return this._currency;
    }
    public set currency(v: string) {
        this._currency = v;
    }

    /**
     * A flag which determines whether the wallet is active or not.
     * When the user is deleting the wallet, it will flip this flag from {@code false} to {@code true} (soft-delete).
     */
    public get isDeleted(): boolean {
        return this._isDeleted;
    }
    public set isDeleted(v: boolean) {
        this._isDeleted = v;
    }

    /**
     * Creates a new instance of {@link Wallet} from {@link firestore.DocumentSnapshot}.
     */
    public static fromFirestoreData(snapshot: firestore.DocumentSnapshot): Wallet {
        const data: firestore.DocumentData | undefined = snapshot.data();
        if (typeof data === 'undefined') {
            throw new Error(`data for wallet document with id = '${snapshot.id}' is undefined`);
        }

        const res: Wallet = new Wallet(data.name, data.initialBalance, data.currentBalance, data.currency);
        res._id = snapshot.id;
        res._isDeleted = data.isDeleted;

        return res;
    }

    /**
     * Converts current instance of {@link Wallet} to {@link firestore.DocumentData}.
     */
    public toFirestoreData(): firestore.DocumentData {
        const data: firestore.DocumentData = {
            name: this.name,
            initialBalance: this.initialBalance,
            currentBalance: this.currentBalance,
            currency: this.currency,
            isDeleted: this.isDeleted,
        };

        if (this.id) {
            data.id = this.id;
        }

        return data;
    }
}
