import { schema } from './../schema/Schema';

//подумать о кешировании с помощью lodash memoize
export const getEmployees = schema.createSelector((orm) => {
  return orm.Employee.all().toModelArray().map((employee) => {
    return  Object.assign({}, employee.ref);
  });
});

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

export const getEmployeeInfoById = schema.createSelector((orm, employeeId) => {
  const employee = orm.Employee.withId(employeeId);
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
});