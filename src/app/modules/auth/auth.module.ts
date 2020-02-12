import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthComponent } from './auth.component';
import { ButtonLoginComponent } from './button-login.component';

@NgModule({
  declarations: [AuthComponent, ButtonLoginComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [AuthComponent, ButtonLoginComponent],
})
export class AuthModule { }
