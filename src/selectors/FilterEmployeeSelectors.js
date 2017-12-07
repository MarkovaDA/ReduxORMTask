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
  console.log('FILTER BY POSITION:', pattern);
  return session.Employee.all().toModelArray().filter((employee) => {
    const { positions } = employee;
    return !isEmpty(positions.filter(item => item.title.toLowerCase().includes(pattern.toLowerCase())))
  })
  .map(employee => {
      console.log(employee.positions.toRefArray());
      return Object.assign({}, employee.ref)
    }
  );
};

//фильтрация сотрудника по имени
const employeesByNameSelector = (session, pattern) => {
  return session.Employee.all().toRefArray().filter((employee) => {
    return employee.surname.concat(employee.name).toLowerCase().includes(pattern.toLowerCase());
  });
};

const employeesBySkillSelector = (session, pattern) => {
  return session.Employee.all().toModelArray().filter((employee) => {
    const skills = employee.skills.toModelArray();
    skills.filter((skill) => {
      const { category } = skill;
      return category.title.toLowerCase().includes(pattern.toLowerCase());
    });
    return !isEmpty(skills);
  })
  .map(employee => Object.assign({}, employee.ref));
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