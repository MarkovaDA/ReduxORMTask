import { schema } from './../schema/Schema';
import { createSelector } from 'redux-orm';

export const listCategorySelector = createSelector(schema, state => state.orm, session => {
  return () => {
    return session.Category.all().toModelArray().map((category) => {
      return  Object.assign({}, category.ref);
    });
  }
});