import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  afAuth: AngularFireAuth;
  constructor(afAuth: AngularFireAuth) {
    this.afAuth = afAuth;
  }

  isLoggedIn(): boolean {
    console.log(this.afAuth.auth.currentUser);

    return this.afAuth.auth.currentUser !== null;
  }
}
