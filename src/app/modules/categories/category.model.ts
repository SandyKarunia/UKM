import { firestore } from 'firebase';
import { CategoryType } from './category-type.enum';

export class Category {

  private _id: string;
  private _type: CategoryType;
  private _parentCategoryId: string;
  private _name: string;
  private _description: string;
  private _isDeleted: boolean;

  constructor(type: CategoryType, parentCategoryId: string, name: string, description: string, isDeleted: boolean) {
    this._type = type;
    this._parentCategoryId = parentCategoryId;
    this._name = name;
    this._description = description;
    this._isDeleted = isDeleted;
  }

  /**
   * An identifier string of a category model.
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Type of this category which might be useful to group some categories in summary (e.g. group all INCOME category).
   * For available types list, see {@link CategoryType}.
   */
  public get type(): CategoryType {
    return this._type;
  }
  public set type(v: CategoryType) {
    this._type = v;
  }

  /**
   * An identifier string of a category which has parent-child relationship with current category instance. This is useful for keeping the
   * granular categories while having the ability to summarize the similar categories. For example, one might have parent category
   * "Entertainment" with children "Movie Theatre" and "TV Show".
   *
   * The depth of categories tree is not limited.
   *
   * If the value doesn't exist, the category is a root category (i.e. no parent).
   */
  public get parentCategoryId(): string {
    return this._parentCategoryId;
  }
  public set parentCategoryId(v: string) {
    this._parentCategoryId = v;
  }

  /**
   * The display name of the category.
   */
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  /**
   * The description of the category.
   */
  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v;
  }

  /**
   * A flag which determines whether this category is active or not.
   * When the user is deleting the category, it will flip this flag from {@code false} to {@code true} (soft-delete).
   */
  public get isDeleted(): boolean {
    return this._isDeleted;
  }
  public set isDeleted(v: boolean) {
    this._isDeleted = v;
  }

  /**
   * Creates a new instance of {@link Category} from {@link firestore.DocumentSnapshot}.
   */
  public static fromFirestoreData(snapshot: firestore.DocumentSnapshot): Category {
    const data: firestore.DocumentData | undefined = snapshot.data();
    if (typeof data === 'undefined') {
      throw new Error(`data for category document with id = '${snapshot.id}' is undefined`);
    }

    const res: Category = new Category(data.type, data.parentCategoryId, data.name, data.description, data.isDeleted);
    res._id = snapshot.id;

    return res;
  }

  /**
   * Converts current instance of {@link Category} to {@link firestore.DocumentData}.
   */
  public toFirestoreData(): firestore.DocumentData {
    const data: firestore.DocumentData = {
      type: this.type,
      parentCategoryId: this.parentCategoryId,
      description: this.description,
      name: this.name,
      isDeleted: this.isDeleted,
    };

    if (this.id) {
      data.id = this.id;
    }

    return data;
  }
}
