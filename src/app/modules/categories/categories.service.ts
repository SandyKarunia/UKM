import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { CategoryType } from './category-type.enum';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly db: AngularFirestore;
  private readonly afAuth: AngularFireAuth;

  constructor(db: AngularFirestore, afAuth: AngularFireAuth) {
    this.db = db;
    this.afAuth = afAuth;
  }

  /**
   * Creates a new document of category in firestore based on the specified
   * {@param category}.
   *
   * @param category instance of {@link Category} to be saved into firestore
   * @returns new instance of {@link Category} if successful, {@code undefined} otherwise
   */
  async saveCategory(category: Category): Promise<Category | undefined> {
    const docRef: firestore.DocumentReference = await this.db.collection('users')
      .doc(this.afAuth.auth.currentUser?.uid)
      .collection('categories')
      .add(category.toFirestoreData());

    return Category.fromFirestoreData(await docRef.get());
  }
}
