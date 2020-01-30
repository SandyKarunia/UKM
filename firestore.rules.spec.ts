// import * as firebase from '@firebase/testing';
// import * as fs from 'fs';
const firebase = require('@firebase/testing');
const fs = require('fs');

/*
 * ============
 *    Setup
 * ============
 */
const projectId = 'firestore-emulator-example';
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const rules = fs.readFileSync('firestore.rules', 'utf8');

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
  it('require users to log in before creating a profile', async () => {
    const db = authedApp(null);
    const profile = db.collection('users').doc('alice');
    await firebase.assertFails(profile.set({ birthday: 'January 1' }));
  });
});
