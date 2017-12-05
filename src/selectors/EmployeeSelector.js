import { schema } from './../schema/Schema';
import { createSelector } from 'redux-orm';
import  * as isUndefined from 'lodash.isundefined';
import * as isEmpty from 'lodash.isempty';

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

/*поиск сотрудников по должности*/
export const filterEmployeesByPosition = createSelector(schema, state => state.orm, session => {
  return (positionTitle) => {
    return session.Employee.all().toModelArray().filter((employee) => {
      //выбираем сотрудников,названия должностей которых содержат парметр
      //const positions = employee.positions.toRefArray();
      const { positions } = employee;
      return !isEmpty(positions.filter(item => item.title.toLowerCase().includes(positionTitle.toLowerCase())))
    })
    .map(employee =>  Object.assign({}, employee.ref)); //преобразуем в plain-objects
  };
});

/*поиск сотрудников по имени*/
export const filterEmployeesByName = createSelector(schema, state => state.orm, session => {
  return (namePattern) => {
    return session.Employee.all().toRefArray().filter((employee) => {
      return employee.surname.concat(employee.name).toLowerCase().includes(namePattern.toLowerCase());
    });
  }
});

/*поиск сотрудников по навыкам, которыми он владеет*/
export const filterEmployeesBySkill = createSelector(schema, state => state.orm, session => {

  return (skillTitle) => {
    return session.Employee.all().toModelArray().filter((employee) => {
      const skills = employee.skills.toModelArray();
      skills.filter((skill) => {
        const { category } = skill;
        return category.title.toLowerCase().includes(skillTitle.toLowerCase());
      });
      return !isEmpty(skills);
    })
    .map(employee => Object.assign({}, employee.ref)); //преобразуем в plain-objects
  };
});