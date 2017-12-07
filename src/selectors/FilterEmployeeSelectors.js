import { schema } from './../schema/Schema';
import { createSelector } from 'redux-orm';
import  * as isUndefined from 'lodash.isundefined';
import * as isEmpty from 'lodash.isempty';


const getAllEmployeesSelector = (session, pattern) => {
    const employees = session.Employee.all().toModelArray().map((employee) => {
      return  Object.assign({}, employee.ref);
    });
    return employees.sort(employeeSortComparator);
};

const employeeSortComparator = (employee1, employee2) => {
  return (employee1.surname > employee2.surname) ? 1 : -1;
};

//фильтрация по должностям
const employeesByPositionSelector = (session, pattern) => {
  const entities =  session.Employee.all().toModelArray().filter((employee) => {
    const { positions } = employee;
    return !isEmpty(positions.toRefArray().filter(item => item.title.toLowerCase().includes(pattern.toLowerCase())))
  });
  //возвращаем  lazy-объект без лишних свойств фреймворка orm
  entities.map(employee => {
    return Object.assign({}, employee.ref)
  });
  return entities;
};

//фильтрация сотрудника по имени
const employeesByNameSelector = (session, pattern) => {
  return session.Employee.all().toRefArray().filter((employee) => {
    return employee.surname.concat(employee.name).toLowerCase().includes(pattern.toLowerCase());
  });
};

//фильтрация по навыкам
const employeesBySkillSelector = (session, pattern) => {

  const entities =  session.Employee.all().toModelArray().filter((employee) => {
    let { skills } = employee;
    skills = skills.toModelArray().filter((skill) => {
      const { category } = skill;
      return category.ref.title.toLowerCase().includes(pattern.toLowerCase());
    });
    return !isEmpty(skills);
  });

  return entities.map(employee => Object.assign({}, employee.ref));
};

const transformations = [
  employeesByNameSelector,
  employeesByPositionSelector,
  employeesBySkillSelector,
  getAllEmployeesSelector
];

export const employeesFilterSelector = createSelector(schema, state => state.orm, session => {
  return (filterId, searchPattern) => {
    filterId = isUndefined(filterId) ? transformations.length - 1 : filterId;
    searchPattern = isUndefined(searchPattern) ? '': searchPattern;
    //console.log('employeesFilterSelector', filterId, searchPattern);
    return transformations[filterId](session, searchPattern);
  }
});