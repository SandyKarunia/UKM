import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginPageComponent } from './login/login.component';

import { AuthModule } from 'src/app/modules/auth/auth.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    AuthModule,
  ],
  exports: [LoginPageComponent]
})
export class PageModule { }
