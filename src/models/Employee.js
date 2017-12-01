import { Model, many, attr } from 'redux-orm';
import propTypesMixin from 'redux-orm-proptypes';
import PropTypes from 'prop-types';

import { Skill } from './Skill';
import { Position} from './Position';

//const ValidatingModel = propTypesMixin(Model);

export class Employee extends Model {
  //вариант редьюсера внутри класса модели
  static reducer(action, Employee, session) {
    const { type } = action;
    switch (type) {
      case 'ADD_EMPLOYEE':
        const employee = Employee.create({
          surname: 'MARKOVA',
          name: 'DARYA',
        });
        employee.positions.add(session.Position.at(3));
        employee.positions.add(session.Position.at(4));
        employee.skills.add(session.Skill.at(0));
        employee.skills.add(session.Skill.at(3));
        employee.skills.add(session.Skill.at(6));
        employee.skills.add(session.Skill.at(9));
        employee.skills.add(session.Skill.at(12));
        break;
    }
    //return session.state;
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