import { FirebaseOptions } from '@angular/fire';

export const environment: { production: boolean; firebase: FirebaseOptions } = {
  production: true,
  get firebase(): FirebaseOptions {
    return {
      apiKey: '{{UKM_FIREBASE_API_KEY}}',
      authDomain: '{{UKM_FIREBASE_AUTH_DOMAIN}}',
      databaseURL: '{{UKM_FIREBASE_DATABASE_URL}}',
      projectId: '{{UKM_FIREBASE_PROJECT_ID}}',
      storageBucket: '{{UKM_FIREBASE_STORAGE_BUCKET}}',
      messagingSenderId: '{{UKM_FIREBASE_MESSAGING_SENDER_ID}}',
      appId: '{{UKM_FIREBASE_APP_ID}}',
      measurementId: '{{UKM_FIREBASE_MEASUREMENT_ID}}',
    };
  }
};
