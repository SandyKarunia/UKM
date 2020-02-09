import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'ukm-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent implements OnInit {
  private readonly router: Router;
  private readonly auth: AuthService;

  constructor(router: Router, auth: AuthService) {
    this.router = router;
    this.auth = auth;
  }

  async ngOnInit(): Promise<void> {
    if (this.auth.isLoggedIn()) {
      console.log('navigating to dashboard');
      await this.router.navigateByUrl('/app/dashboard');
    }
  }
}
