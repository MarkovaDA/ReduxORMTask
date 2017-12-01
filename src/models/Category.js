import { Model, attr } from 'redux-orm';
import propTypesMixin from 'redux-orm-proptypes';
import PropTypes from 'prop-types';

//const ValidatingModel = propTypesMixin(Model);
//категория навыка
export class Category extends Model {

}
Category.modelName = 'Category';

Category.fields = {
  id: attr(),
  title: attr()
};

/*Category.propTypes = {
  title: PropTypes.string.isRequired
};*/
