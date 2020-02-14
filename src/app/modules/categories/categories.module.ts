import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
  ],
  exports: [CategoryComponent]
})
export class CategoriesModule { }
