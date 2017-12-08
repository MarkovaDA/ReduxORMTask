import { Model, many, attr } from 'redux-orm';
import propTypesMixin from 'redux-orm-proptypes';
import PropTypes from 'prop-types';

import { Skill } from './Skill';
import { Position} from './Position';

//const ValidatingModel = propTypesMixin(Model);

export class Employee extends Model {

  static reducer(action, Employee, session) {
    const { type, data } = action;
    switch (type) {
      case 'ADD_EMPLOYEE':
        //this.addNewOne(data, Employee, session);
        session.Skill.getSkillByCategoryEstimate(6, 0);
        break;
    }
    //return session.state;
  };

  /*
  * surname
  * name
  * positions - ids выбранных должностей
  * skills - [{estimateId, categoryId}]
  * */
  addNewOne(data, Employee, session) {
    const {surname, name, positions, skills} = data;

    const employee = Employee.create({
      surname: surname,
      name: name
    });

    positions.forEach((posIndex) => {
      employee.positions.add(session.Position.at(posIndex));
    });

    skills.forEach((skill) => {
      //skill.category, skill.estimate
      //ищем skillId с такими параметрами
      /*const skillId = 1;
      employee.skills.add(session.Skill.at(skillId));*/
    });
  }
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