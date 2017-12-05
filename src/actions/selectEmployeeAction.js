
export const selectEmployee = id => {
  return {
    type: 'SELECT_EMPLOYEE',
    payload: id
  }
};