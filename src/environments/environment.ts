import { FirebaseOptions } from '@angular/fire';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: { production: boolean; firebase: FirebaseOptions } = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
/* tslint:disable-next-line */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
