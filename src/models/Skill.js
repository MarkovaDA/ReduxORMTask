import { Model, attr, fk} from 'redux-orm';
import propTypesMixin from 'redux-orm-proptypes';
import PropTypes from 'prop-types';


import { Estimate } from './Estimate';
import { Category } from './Category';

//const ValidatingModel = propTypesMixin(Model);
export class Skill extends Model {

  getSkillByCategoryEstimate(categoryId, estimateId) {
    console.log('getSkillByCategoryEstimate');
    Skill.all().filter((skill) =>  {
      console.log(skill);
      const {category, estimate} = skill;
      return category.id === categoryId && estimate.id == estimateId;
    });
  }
}
Skill.modelName = 'Skill';

Skill.fields = {
  id: attr(),
  category: fk('Category', 'skills'),
  estimate: fk('Estimate', 'skills')
};

/*Skill.propTypes = {
  category: PropTypes.instanceOf(Category).isRequired,
  estimate: PropTypes.instanceOf(Estimate).isRequired
};*/