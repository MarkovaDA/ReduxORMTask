
export const rootReducer = (state = {}, action) => {
  const {type, payload} = action;

  if (type === 'SELECT_EMPLOYEE') {
    /*return  Object.assign(state, {
      employeeId: payload
    });*/
    return {employeeId: payload};
  }
  if (type == 'SELECT_FILTER') {
    const {filterId, pattern} = payload;
    //внести action & pattern
    /*return  Object.assign(state, {
      filterId: payload
    });*/
    return { filterId: filterId, pattern: pattern};
  }
  return state;
};