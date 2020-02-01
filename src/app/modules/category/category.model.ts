export class CategoryModel {
  /**
   * Identifier of a category model.
   */
  id: string;

  /**
   * Identifier of a user (owner) of the category. Only the owner of a category can modify the category.
   *
   * If the value doesn't exist, the category belongs to all users.
   */
  userId?: string;

  /**
   * Type of the category which might be useful to group some categories in summary (e.g. group all INCOME category).
   * For available types list, see {@link CategoryType}.
   */
  type: CategoryType;

  /**
   * Identifier of a category which has parent-child relationship with current category instance. This is useful for keeping the granular
   * categories while having the ability to summarize the similar categories. For example, one might have parent category
   * "Entertainment" with children "Movie Theatre" and "TV Show".
   *
   * The depth of categories tree is not limited.
   *
   * If the value doesn't exist, the category is a root category (i.e. no parent).
   */
  parentCategoryId?: string;

  /**
   * Name of the category.
   */
  name: string;

  /**
   * Optional description of the category.
   */
  description?: string;

  /**
   * A flag which determines whether this category is active or not. When the user is deleting the category, it will flip this flag from
   * {@code false} to {@code true} (soft-delete).
   *
   * qlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeqqlkwjeq
   */
  isDeleted: boolean;
}
