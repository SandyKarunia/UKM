import { FirebaseOptions } from '@angular/fire';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: { production: boolean; firebase: FirebaseOptions } = {
  production: false,
  get firebase(): FirebaseOptions {
    return {
      apiKey: 'AIzaSyD_OSCYFzWgd3G8L6_ZAIiJynKCQwx5XQ8',
      authDomain: 'uangkukemana-dev.firebaseapp.com',
      databaseURL: 'https://uangkukemana-dev.firebaseio.com',
      projectId: 'uangkukemana-dev',
      storageBucket: 'uangkukemana-dev.appspot.com',
      messagingSenderId: '750716589942',
      appId: '1:750716589942:web:3820c546f48ce92ba1cc57',
      measurementId: 'G-CV5DQ6P1F8'
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
