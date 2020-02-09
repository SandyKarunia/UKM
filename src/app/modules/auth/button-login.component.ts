import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

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

    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .catch((): void => {
        // For now just do console.log
        console.log('fail to login');
      });

    if (this.afAuth.auth.currentUser !== null) {
      console.log(this.afAuth.auth.currentUser);
      await this.router.navigateByUrl('app/dashboard');
    }
  }

}
