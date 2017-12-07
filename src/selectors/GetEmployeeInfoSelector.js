import { schema } from './../schema/Schema';
import { createSelector } from 'redux-orm';
import  * as isUndefined from 'lodash.isundefined';


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
export const getEmployeeInfoSelector = createSelector(schema, state => state.orm, session => {
  return (employeeId) => {
    if (isUndefined(employeeId)) {
      return undefined;
    }

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