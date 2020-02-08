import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'ukm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly afAuth: AngularFireAuth;

  constructor(afAuth: AngularFireAuth) {
    this.afAuth = afAuth;
  }

  async login(): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

}
