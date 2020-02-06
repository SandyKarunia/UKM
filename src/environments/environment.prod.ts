import { FirebaseOptions } from '@angular/fire';

export const environment = {
  production: true,
  getFirebaseConfig: (): FirebaseOptions => {
    // the following template variables should be replaced by script before build process
    return {
      apiKey: '{{UKM_FIREBASE_CONFIG_API_KEY}}',
      authDomain: '{{UKM_FIREBASE_CONFIG_AUTH_DOMAIN}}',
      databaseURL: '{{UKM_FIREBASE_CONFIG_DATABASE_URL}}',
      projectId: '{{UKM_FIREBASE_CONFIG_PROJECT_ID}}',
      storageBucket: '{{UKM_FIREBASE_CONFIG_STORAGE_BUCKET}}',
      messagingSenderId: '{{UKM_FIREBASE_CONFIG_MESSAGING_SENDER_ID}}',
      appId: '{{UKM_FIREBASE_CONFIG_APP_ID}}',
      measurementId: '{{UKM_FIREBASE_CONFIG_MEASUREMENT_ID}}',
    };
  },
};
