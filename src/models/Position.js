import { Model, attr } from 'redux-orm';
import propTypesMixin from 'redux-orm-proptypes';
import PropTypes from 'prop-types';


const ValidatingModel = propTypesMixin(Model);

//должность
export class Position extends ValidatingModel {}
Position.modelName = 'Position';

Position.fields = {
  id: attr(),
  title: attr()
};

/*const propTypes = {
  title: PropTypes.string.isRequired
};*/
