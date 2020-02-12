import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
  ],
  exports: [CategoryComponent]
})
export class CategoriesModule { }
