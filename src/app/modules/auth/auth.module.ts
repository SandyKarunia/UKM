import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ButtonLoginComponent } from './button-login.component';
import { ButtonLogoutComponent } from './button-logout.component';

@NgModule({
  declarations: [ButtonLoginComponent, ButtonLogoutComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [ButtonLoginComponent, ButtonLogoutComponent],
})
export class AuthModule { }
