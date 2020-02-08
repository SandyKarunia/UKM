import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
