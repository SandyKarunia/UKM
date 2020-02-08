import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'ukm-button-login',
  templateUrl: './button-login.component.html',
  styleUrls: ['./button-login.component.scss']
})
export class ButtonLoginComponent {
  private readonly afAuth: AngularFireAuth;

  constructor(afAuth: AngularFireAuth) {
    this.afAuth = afAuth;
  }

  async login(): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

}
