import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
} from '@angular/material';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [AuthComponent, LoginComponent],
})
export class AuthModule { }
