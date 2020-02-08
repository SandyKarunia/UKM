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
    return this.afAuth.auth.currentUser !== null;
  }
}
