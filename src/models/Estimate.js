import { Model, attr } from 'redux-orm';
import propTypesMixin from 'redux-orm-proptypes';
import PropTypes from 'prop-types';

//const ValidatingModel = propTypesMixin(Model);
//оценка (уровень)
export class Estimate extends Model {

}
Estimate.modelName = 'Estimate';

Estimate.fields = {
  id: attr(),
  value: attr(),
  title: attr()
};

/*Estimate.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};*/