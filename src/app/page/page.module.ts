import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';

import { AuthModule } from '../modules/auth/auth.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthModule,
  ],
  exports: [LoginComponent]
})
export class PageModule { }
