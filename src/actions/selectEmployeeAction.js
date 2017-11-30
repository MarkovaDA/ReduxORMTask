export const selectEmployee = id => {
  console.log('SELECT EMPLOYEE ACTION');
  return {
    type: 'SELECT_EMPLOYEE',
    payload: id
  }
};