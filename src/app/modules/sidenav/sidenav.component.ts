import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'ukm-app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  private readonly authService: AuthService;
  private readonly router: Router;
  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;

    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/')
        .catch(() => {
          // For now just console.log
          console.log('failed to navigate to login page');
        });
    }
  }

}
