export const rootReducer = (state = {}, action) => {
  const {type, payload} = action;
  switch(type) {
    case 'SELECT_EMPLOYEE':
      console.log('SELECT_EMPLOYEE_REDUCER');
      //return Object.assign(state, {employeeId: payload});
      return payload;
    default:
      return state;
  }
  return state;
};