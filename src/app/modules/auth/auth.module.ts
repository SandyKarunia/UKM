import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { AuthComponent } from './auth.component';
import { ButtonLoginComponent } from './button-login.component';

@NgModule({
  declarations: [AuthComponent, ButtonLoginComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  exports: [AuthComponent, ButtonLoginComponent],
})
export class AuthModule { }
