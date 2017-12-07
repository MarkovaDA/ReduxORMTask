import React, { Component } from 'react';
import { Segment, List, Label } from 'semantic-ui-react';

class EmployeeList extends Component {

  render() {
    const employees = this.props.employees.map((employee, index) =>
      <List.Item key={index} onClick = {() => this.props.onSelectEmployee(employee)}>
        <List.Icon name='user circle' size='large' verticalAlign='middle' />
        {employee.surname} {employee.name}
      </List.Item>
    );

    return (
      <Segment className='list-employee'>
        <label>Список сотрудников</label>
        <Label circular color='blue'>{this.props.employees.length}</Label>
        <List divided relaxed animated>
          { employees }
        </List>
      </Segment>
    );
  }
}
export default EmployeeList;