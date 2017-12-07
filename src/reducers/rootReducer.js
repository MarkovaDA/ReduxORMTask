
export const rootReducer = (state = {}, action) => {
  const {type, payload} = action;
  switch(type) {
    case 'SELECT_EMPLOYEE':
      return  Object.assign({}, state, {
        employeeId: payload
      });
    case 'SELECT_FILTER':
      const {filterId, pattern} = payload;
      return  Object.assign({}, state, {
        filterId: filterId,
        pattern: pattern
      });
    default:
      return state;
  }
};