import { schema } from './../schema/Schema';
import { createSelector } from 'redux-orm';

export const listPositionSelector = createSelector(schema, state => state.orm, session => {
  return () => {
    return session.Position.all().toModelArray().map((position) => {
      return  Object.assign({}, position.ref);
    });
  }
});