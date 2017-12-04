import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';

class EmployeeList extends Component {

  render() {
    const employees = this.props.employees.map((employee, index) =>
      <List.Item key={index}>
        <List.Icon name='user circle' size='large' verticalAlign='middle' />
        {employee.surname} {employee.name}
      </List.Item>
    );

    return (
      <Segment className='list-employee blue'>
        <label>Список сотрудников</label>
        <List divided relaxed animated>
          { employees }
        </List>
      </Segment>
    );

  }
}
export default EmployeeList;