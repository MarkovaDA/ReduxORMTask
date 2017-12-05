
export const rootReducer = (state = {}, action) => {
  const {type, payload} = action;

  if (type === 'SELECT_EMPLOYEE') {
    return  {employeeId: payload};
  }
  return state;
};