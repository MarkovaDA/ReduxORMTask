import { Model, many, attr } from 'redux-orm';
import propTypesMixin from 'redux-orm-proptypes';
import PropTypes from 'prop-types';

import { Skill } from './Skill';
import { Position} from './Position';

const ValidatingModel = propTypesMixin(Model);
//сотрудник
export class Employee extends ValidatingModel {
  static reducer(state, action, Employee, session) {
    const { type } = action;
    switch(type) {
      case 'ADD_EMPLOYEE':
        //написать селектор для выбора пользователей
        break;
    }
  };
}
Employee.modelName = 'Employee';

Employee.fields = {
  id: attr(),
  surname: attr(),
  name: attr(),
  skills: many('Skill', 'employees'), //множество навыков
  positions: many('Position', 'employees') //занимаемые должности
};
//1. редьюсер для извлечения списка пользователей {surname, name}
//2. извлечение информации о пользователе по id (личная карта)
/*Employee.propTypes = {
  surname: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.instanceOf(Skill),).isRequired,
  positions: PropTypes.arrayOf(PropTypes.instanceOf(Position)).isRequired
};*/