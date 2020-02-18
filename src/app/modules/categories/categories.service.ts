import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Category } from './category.model';

const USERS: string = 'users';
const CATEGORIES: string = 'categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _db: AngularFirestore;
  private readonly _afAuth: AngularFireAuth;

  constructor(db: AngularFirestore, afAuth: AngularFireAuth) {
    this._db = db;
    this._afAuth = afAuth;
  }

  /**
   * Creates a new document of category in firestore based on the specified
   * {@param category}.
   *
   * @param category instance of {@link Category} to be saved into firestore
   * @returns new instance of {@link Category} with its id filled
   */
  async createNewCategory(category: Category): Promise<Category> {
    const docRef: firestore.DocumentReference = await this._db.collection(USERS)
      .doc(this._afAuth.auth.currentUser?.uid)
      .collection(CATEGORIES)
      .add(category.toFirestoreData());

    return Category.fromFirestoreData(await docRef.get());
  }

  /**
   * Updates an existing category in firestore based on the specified
   * {@param category}.
   *
   * @param category instance of {@link Category} to be updated in firestore
   */
  async updateCategory(category: Category): Promise<void> {
    await this._db.collection(USERS)
      .doc(this._afAuth.auth.currentUser?.uid)
      .collection(CATEGORIES)
      .doc(category.id)
      .update(category.toFirestoreData());
  }

  /**
   * Gets all categories which don't have any parents (i.e. parent id is a zero-value).
   */
  async getAllRootCategories(): Promise<Category[]> {
    return this.getAllChildrenCategoriesOf('');
  }

  /**
   * Gets all categories which have parent's category id equals to
   * {@param parentCategoryId}.
   *
   * @param parentCategoryId the id of parent category which the children will
   * be returned
   */
  async getAllChildrenCategoriesOf(parentCategoryId: string): Promise<Category[]> {
    const querySnapshot: firestore.QuerySnapshot = await this._db.collection(USERS)
      .doc(this._afAuth.auth.currentUser?.uid)
      .collection(CATEGORIES, (ref: firestore.CollectionReference) => {
        if (!parentCategoryId) {
          return ref.where('parentCategoryId', 'in', ['', 0, undefined]);
        }

        return ref.where('parentCategoryId', '==', parentCategoryId);
      })
      .get()
      .toPromise();

    const res: Category[] = [];
    querySnapshot.forEach((doc: firestore.QueryDocumentSnapshot) => {
      if (!doc.exists) {
        console.error(`data for category document with id = '${doc.id}' doesn't exist, but queried`);

        return;
      }

      res.push(Category.fromFirestoreData(doc));
    });

    return res;
  }

  /**
   * Soft-deletes a category in firestore. The passed {@param category} will
   * have {@code isDeleted} property set to true.
   *
   * @param category the category that will be soft-deleted
   */
  async softDeleteCategory(category: Category): Promise<void> {
    category.isDeleted = true;
    await this.updateCategory(category);
  }
}
