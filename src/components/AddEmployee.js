import React, { Component } from 'react';
import { Segment  } from 'semantic-ui-react';

class AddEmployee extends Component {

  render() {
    return(
      <Segment className='add-employee blue'>
        <label>Добавить сотрудника</label>
      </Segment>
    );
  }
}

export default AddEmployee;