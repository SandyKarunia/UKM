import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { ButtonLoginComponent } from './button-login.component';
import { MatListModule } from '@angular/material/list';
import { ButtonLogoutComponent } from './button-logout.component';

@NgModule({
  declarations: [ButtonLoginComponent, ButtonLogoutComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatListModule,
  ],
  exports: [ButtonLoginComponent, ButtonLogoutComponent],
})
export class AuthModule { }
