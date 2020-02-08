import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
<<<<<<< HEAD:src/app/modules/auth/login.component.ts
  selector: 'ukm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly afAuth: AngularFireAuth;
=======
  selector: 'button-login',
  templateUrl: './button-login.component.html',
  styleUrls: ['./button-login.component.scss']
})
export class ButtonLoginComponent {
>>>>>>> (feat) add page module and login page:src/app/modules/auth/button-login.component.ts

  constructor(afAuth: AngularFireAuth) {
    this.afAuth = afAuth;
  }

  async login(): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

}
