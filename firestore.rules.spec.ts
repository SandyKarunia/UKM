// tslint:disable
const firebase = require('@firebase/testing');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

/*
 * ============
 *    Setup
 * ============
 */
const projectId = 'uangkukemana-emulator-test';
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const rules = fs.readFileSync('firestore.rules', 'utf8');

// TODO change this to refer to an enum instead in src/
const collCategories = 'categories';
const collWallets = 'wallets';
const collTransactions = 'transactions';
const collUsers = 'users';

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param auth the object to use for authentication (typically {uid: some-uid})
 * @return the app.
 */
function authedApp(auth) {
  return firebase
    .initializeTestApp({ projectId, auth })
    .firestore();
}

/*
 * ============
 *  Test Cases
 * ============
 */
beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

describe('Firestore Rules', () => {
  let userA = { uid: null };
  let userB = { uid: null };
  let dbRefUserA = authedApp(null);
  let dbRefUserB = authedApp(null);

  beforeEach(() => {
    userA = { uid: uuidv4() };
    userB = { uid: uuidv4() };
    dbRefUserA = authedApp(userA);
    dbRefUserB = authedApp(userB);
  });

  describe('Categories', () => {
    it('requires authorized user to read / update a category', async () => {
      const ref = await dbRefUserA.collection(collUsers).doc(userA.uid).collection(collCategories).add({});
      await firebase.assertSucceeds(dbRefUserA.collection(collUsers).doc(userA.uid).collection(collCategories).doc(ref.id).get());
      await firebase.assertFails(dbRefUserB.collection(collUsers).doc(userA.uid).collection(collCategories).doc(ref.id).get());
    });
    it('requires authorized user to create a new category', async () => {
      await firebase.assertSucceeds(dbRefUserA.collection(collUsers).doc(userA.uid).collection(collCategories).add({}));
      await firebase.assertFails(dbRefUserB.collection(collUsers).doc(userA.uid).collection(collCategories).add({}));
    });
    it('should prevent any user from deleting a category', async () => {
      const ref = await dbRefUserA.collection(collUsers).doc(userA.uid).collection(collCategories).add({});
      await firebase.assertFails(ref.delete());
      await firebase.assertFails(dbRefUserA.collection(collUsers).doc(userA.uid).collection(collCategories).doc(ref.id).delete());
      await firebase.assertFails(dbRefUserB.collection(collUsers).doc(userA.uid).collection(collCategories).doc(ref.id).delete());
    });
  });

  describe('Wallets', () => {
    it('requires authorized user to read / update a wallet', async () => {
      const ref = await dbRefUserA.collection(collUsers).doc(userA.uid).collection(collWallets).add({});
      await firebase.assertSucceeds(dbRefUserA.collection(collUsers).doc(userA.uid).collection(collWallets).doc(ref.id).get());
      await firebase.assertFails(dbRefUserB.collection(collUsers).doc(userA.uid).collection(collWallets).doc(ref.id).get());
    });
    it('requires authorized user to create a new wallet', async () => {
      await firebase.assertSucceeds(dbRefUserA.collection(collUsers).doc(userA.uid).collection(collWallets).add({}));
      await firebase.assertFails(dbRefUserB.collection(collUsers).doc(userA.uid).collection(collWallets).add({}));
    });
    it('should prevent any user from deleting a wallet', async () => {
      const ref = await dbRefUserA.collection(collUsers).doc(userA.uid).collection(collWallets).add({});
      await firebase.assertFails(ref.delete());
      await firebase.assertFails(dbRefUserA.collection(collUsers).doc(userA.uid).collection(collWallets).doc(ref.id).delete());
      await firebase.assertFails(dbRefUserB.collection(collUsers).doc(userA.uid).collection(collWallets).doc(ref.id).delete());
    });
  });

  describe('Transactions', () => {
    it('requires authorized user to read / update a transaction', async () => {
      const ref = await dbRefUserA.collection(collUsers).doc(userA.uid).collection(collTransactions).add({});
      await firebase.assertSucceeds(dbRefUserA.collection(collUsers).doc(userA.uid).collection(collTransactions).doc(ref.id).get());
      await firebase.assertFails(dbRefUserB.collection(collUsers).doc(userA.uid).collection(collTransactions).doc(ref.id).get());
    });
    it('requires authorized user to create a new transaction', async () => {
      await firebase.assertSucceeds(dbRefUserA.collection(collUsers).doc(userA.uid).collection(collTransactions).add({}));
      await firebase.assertFails(dbRefUserB.collection(collUsers).doc(userA.uid).collection(collTransactions).add({}));
    });
    it('should prevent any user from deleting a transaction', async () => {
      const ref = await dbRefUserA.collection(collUsers).doc(userA.uid).collection(collTransactions).add({});
      await firebase.assertFails(ref.delete());
      await firebase.assertFails(dbRefUserA.collection(collUsers).doc(userA.uid).collection(collTransactions).doc(ref.id).delete());
      await firebase.assertFails(dbRefUserB.collection(collUsers).doc(userA.uid).collection(collTransactions).doc(ref.id).delete());
    });
  });
});
