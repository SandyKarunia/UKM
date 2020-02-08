import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { ButtonLoginComponent } from '../../modules/auth/button-login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService ) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
