import { schema } from './../schema/Schema';
import { createSelector } from 'redux-orm';

export const listEstimateSelector = createSelector(schema, state => state.orm, session => {
  return () => {
    return session.Estimate.all().toModelArray().map((estimate) => {
      return  Object.assign({}, estimate.ref);
    });
  }
});