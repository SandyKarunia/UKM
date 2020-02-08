import { FirebaseOptions } from '@angular/fire';

export const environment: { production: boolean; firebase: FirebaseOptions } = {
  production: true,
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
