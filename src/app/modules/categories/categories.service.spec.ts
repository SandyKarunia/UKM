import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { auth, firestore } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { CategoriesService } from './categories.service';
import { CategoryType } from './category-type.enum';
import { Category } from './category.model';

describe('CategoriesService', () => {
  let _underTest: CategoriesService;
  let _db: AngularFirestore;
  let _afAuth: AngularFireAuth;
  let _uid: string;

  beforeEach(async (): Promise<void> => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ]
    });
    _underTest = TestBed.inject(CategoriesService);
    _db = TestBed.inject(AngularFirestore);
    _afAuth = TestBed.inject(AngularFireAuth);

    // Setup authentication
    await _afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL);
    _uid = (await _afAuth.auth.signInAnonymously()).user?.uid || '';
  });

  /**
   * Helper function for getting category with specified {@param categoryId}.
   */
  const getCategory: (categoryId: string) => Promise<Category> = async (categoryId: string): Promise<Category> => {
    const docSnapshot: firestore.DocumentSnapshot = await _db.collection('users')
      .doc(_uid).collection('categories').doc(categoryId).get().toPromise();

    return Category.fromFirestoreData(docSnapshot);
  };

  describe('createNewCategory', () => {
    it('should create successfully', async (): Promise<void> => {
      const createdCategory: Category =
        await _underTest.createNewCategory(new Category(CategoryType.TRANSFER_IN, '', 'new category', 'desc category'));

      const result: Category = await getCategory(createdCategory.id);
      await expect(result).toEqual(createdCategory);
      await expect(result.name).toBe('new category');
      await expect(result.description).toBe('desc category');
      await expect(result.isDeleted).toBeFalsy();
      await expect(result.parentCategoryId).toBe('');
      await expect(result.type).toBe(CategoryType.TRANSFER_IN);
    });
  });

  describe('updateCategory', () => {
    it('should update successfully', async (): Promise<void> => {
      const createdCategory: Category =
        await _underTest.createNewCategory(new Category(CategoryType.INCOME, '', 'new category', 'desc category'));

      createdCategory.name = 'updated category';
      await _underTest.updateCategory(createdCategory);

      const result: Category = await getCategory(createdCategory.id);
      await expect(result.name).toBe('updated category');
    });
  });

  describe('getAllRootCategories', () => {
    it('should get all root categories', async (): Promise<void> => {
      const rootCategory: Category =
        await _underTest.createNewCategory(new Category(CategoryType.EXPENSE, '', 'root category', 'desc'));
      const childCategory: Category =
        await _underTest.createNewCategory(new Category(CategoryType.EXPENSE, rootCategory.id, 'child category', 'desc'));

      const result: Category[] = await _underTest.getAllRootCategories();
      result.forEach(async (c: Category): Promise<void> => {
        await expect(c.parentCategoryId).toBe('');
        await expect(c.id).not.toBe(childCategory.id);
      });
    });
  });

  describe('getAllChildrenCategoriesOf', () => {
    it('should get all children categories of specified id', async (): Promise<void> => {
      const rootCategory: Category =
        await _underTest.createNewCategory(new Category(CategoryType.TRANSFER_IN, '', 'root category', 'desc'));
      const childCategory1: Category =
        await _underTest.createNewCategory(new Category(CategoryType.TRANSFER_IN, rootCategory.id, 'child category 1', 'desc'));
      const childCategory2: Category =
        await _underTest.createNewCategory(new Category(CategoryType.TRANSFER_IN, rootCategory.id, 'child category 2', 'desc'));
      const numberOfChildren: number = 2;

      const result: Category[] = await _underTest.getAllChildrenCategoriesOf(rootCategory.id);
      await expect(result.length).toBe(numberOfChildren);
      if (result[0].id === childCategory1.id) {
        await expect(result[0]).toEqual(childCategory1);
        await expect(result[1]).toEqual(childCategory2);
      } else {
        await expect(result[0]).toEqual(childCategory2);
        await expect(result[1]).toEqual(childCategory1);
      }
    });
  });

  describe('softDeleteCategory', () => {
    it('should soft-delete the passed category', async (): Promise<void> => {
      const category: Category =
        await _underTest.createNewCategory(new Category(CategoryType.EXPENSE, '', 'category', 'desc'));

      await _underTest.softDeleteCategory(category);

      const result: Category = await getCategory(category.id);
      await expect(result.id).toBe(category.id);
      await expect(result.isDeleted).toBeTruthy();
    });
  });
});
