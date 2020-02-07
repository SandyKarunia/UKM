import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  MatButtonModule,
  MatCardModule,
} from '@angular/material';
import { environment } from 'src/environments/environment';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  exports: [AuthComponent, LoginComponent],
})
export class AuthModule { }
