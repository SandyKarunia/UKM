import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'ukm-button-login',
  templateUrl: './button-login.component.html',
  styleUrls: ['./button-login.component.scss']
})
export class ButtonLoginComponent {
  private readonly afAuth: AngularFireAuth;
  private readonly router: Router;

  constructor(afAuth: AngularFireAuth, router: Router) {
    this.afAuth = afAuth;
    this.router = router;
  }

  async login(): Promise<void> {
    await this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL);

    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(async () => {
        await this.router.navigateByUrl('app/dashboard');
      })
      .catch((error) => {
        // for now just do console.log
        console.error(error);
        console.log('fail to login');
      });
  }

}
