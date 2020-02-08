import { FirebaseOptions } from '@angular/fire';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: { production: boolean; firebase: FirebaseOptions } = {
  production: false,
  get firebase(): FirebaseOptions {
    return {
      apiKey: 'AIzaSyCuA9X0o22Wq_C8fz9KZqSJ9EyuM7ggr8c',
      authDomain: 'uangkukemana.firebaseapp.com',
      databaseURL: 'https: //uangkukemana.firebaseio.com',
      projectId: 'uangkukemana',
      storageBucket: 'uangkukemana.appspot.com',
      messagingSenderId: '897714515879',
      appId: '1: 897714515879:web: 8bfdb9c2f68a9c47c51082',
      measurementId: 'G-K2BC6HBZWR'
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
