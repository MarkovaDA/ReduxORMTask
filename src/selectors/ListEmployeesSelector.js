import { schema } from './../schema/Schema';
import { createSelector } from 'redux-orm';

export  const getAllEmployeesSelector = createSelector(schema, state => state.orm, session => {
  return () => {
    const employees = session.Employee.all().toModelArray().map((employee) => {
      return  Object.assign({}, employee.ref);
    });
    return employees.sort(employeeSortComparator);
  }
});

const employeeSortComparator = (employee1, employee2) => {
  return (employee1.surname > employee2.surname) ? 1 : -1;
};