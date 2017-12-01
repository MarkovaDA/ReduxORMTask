import { schema } from './../schema/Schema';
import { createSelector } from 'redux-orm';


export  const getEmployees = createSelector(schema, state => state.orm, session => {
  const employees = session.Employee.all().toModelArray().map((employee) => {
    return  Object.assign({}, employee.ref);
  });
  return employees.sort(employeeSortComparator);
});

const employeeSortComparator = (employee1, employee2) => {
  return (employee1.surname > employee2.surname) ? 1 : -1;
};

//информация о сотруднике по id (личная карта сотрудника)
/*id: ...,
* surname: ...,
* name:...,
* positions: [
*   {
*     title:... ,
*     id: ...
*   },
*   {
*
*   },
*   ...
* ],
* skills: [
*   {
*     category: {
*       id: ...,
*       title:...,
*     },
*     estimate: {
*       id:...,
*       value: ...,
*       description: ...
*     }
*   },
*   {
*     ...
*   },
*   ...
* ]
*
* */
export const getEmployeeInfoById = createSelector(schema, state => state.orm, session => {
  return (employeeId) => {
    //const employeeId = 3;
    const employee = session.Employee.withId(employeeId);
    const item = Object.assign({},
      employee.ref, {
        positions: employee.positions.all().toModelArray().map((position) => {
          return Object.assign({}, position.ref)
        }),
        skills: employee.skills.all().toModelArray().map((skill) => {
          return Object.assign({},
            {
              category: Object.assign({}, skill.category.ref)
            },
            {
              estimate: Object.assign({}, skill.estimate.ref)
            })
        })
      });
    return item;
  };
});