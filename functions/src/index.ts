import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firestore from '@google-cloud/firestore';

admin.initializeApp();

/**
 * A firebase function that will clean the UTs anonymous users and the
 * respective resources in firestore.
 * 
 * Specifically, this function will look at all anonymous users, select those
 * who have at least 12h since the creation time, get their uids, and delete
 * all resources in firestore that connects to the uids.
 */
const cleanAnonUsers = async () => {
    const records = await admin.auth().listUsers();
    const anonUsersUid: string[] = [];
    records.users.forEach((user) => {
        // don't take non-anonymous user
        if (user.providerData.length !== 0 || user.email || user.emailVerified) {
            return;
        }

        // don't take user which has last sign in time less than 12h ago
        const lastSignInTimeMs: number = Date.parse(user.metadata.lastSignInTime);
        const twelveHoursAgoMs: number = Date.now() - 12 * 60 * 60 * 1000;
        if (lastSignInTimeMs >= twelveHoursAgoMs) {
            return;
        }

        anonUsersUid.push(user.uid);
    });

    if (anonUsersUid.length > 0) {
        console.log('removing ' + anonUsersUid.length + ' anon users');

        for (const uid of anonUsersUid) {
            await removeUserRecursively(uid);
            await admin.auth().deleteUser(uid);
        }
    }
};

/**
 * Removes a user along with its resources (categories, wallets, transactions)
 */
const removeUserRecursively = async (uid: string) => {
    const subCollectionStr = ['categories', 'wallets', 'transactions'];

    for (const subColName of subCollectionStr) {
        const ids = await getIdsFromSnapshot(await admin.firestore().collection('users').doc(uid).collection(subColName).get());
        for (const id of ids) {
            await admin.firestore().collection('users').doc(uid).collection(subColName).doc(id).delete();
        }
    }
};

const getIdsFromSnapshot = async (snapshot: firestore.QuerySnapshot<firestore.DocumentData>): Promise<string[]> => {
    const result: string[] = [];

    snapshot.forEach(data => {
        result.push(data.id);
    });

    return result;
}

/**
 * To deploy all the functions listed below, run `firebase deploy --only
 * functions` in the base folder.
 */
module.exports = {
    cleanTestUsers: functions.auth.user().onCreate(cleanAnonUsers),
};
