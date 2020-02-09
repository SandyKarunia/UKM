import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ukm-button-logout',
  templateUrl: './button-logout.component.html',
  styleUrls: ['./button-logout.component.scss']
})
export class ButtonLogoutComponent {
  private readonly router: Router;
  private readonly afAuth: AngularFireAuth;

  constructor(afAuth: AngularFireAuth, router: Router) {
    this.afAuth = afAuth;
    this.router = router;
  }

  async logout(): Promise<boolean> {
    await this.afAuth.auth.signOut()
      .catch((): void => {
        console.log('error while logging out');
      });

    return this.router.navigateByUrl('/');
  }

}
