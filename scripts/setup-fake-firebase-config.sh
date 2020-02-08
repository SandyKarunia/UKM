#!/bin/bash

set -eo pipefail

text = "{
    apiKey: 'FAKE_KEY',
    authDomain: 'FAKE_AUTH_DOMAIN',
    databaseURL: 'FAKE_DB_URL',
    projectId: 'FAKE_PROJECT_ID',
    storageBucket: 'FAKE_STORAGE_BUCKET',
    messagingSenderId: 'FAKE_MESSAGING_SENDER_ID',
    appId: 'FAKE_APP_ID',
    measurementId: 'FAKE_MEASUREMENT_ID'
}";

echo "${text}" > ./src/environments/firebase-config.json