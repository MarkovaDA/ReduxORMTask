import React, { Component } from 'react';
import { Segment, Form, Button, Divider, Dropdown, List, Label } from 'semantic-ui-react';

class AddEmployee extends Component {
  state = {
    surname: '',
    name: '',
    employeeSkills: [],
    employeePositions: []
  };

  transformToDropdownOptions = (positions) => {
    return positions.map(item => Object.assign({}, {value: item.id}, {text: item.title}, {key: item.id}));
  };

  getEmployeeData = () => {
    const employee = {
      surname: this.state.surname,
      name: this.state.name,
      positions: this.state.employeePositions,
      skills: this.state.employeeSkills
    };
    return employee;
  };

  onSelectPosition = (e, { value }) => {
    this.setState({
      employeePositions: value
    });
  };

  onSelectSkill = (e, {value, options} ) => {
    this.setState({
      employeeSkills: value.map((skillId) => Object.assign({},
        {categoryId: skillId},
        {categoryTitle:options[skillId].text}))
    });
  };

  onSelectEstimate = (e, {value}, categoryId) => {
    const skills = this.state.employeeSkills;

    skills.map((skill) => {
      if (skill.categoryId === categoryId) {
          skill.estimateId = value;
          return skill;
      }
    });

    this.setState({
      employeeSkills: skills
    });
  };

  onInputChange = (e) => {
    const property =  e.target.name;
    const value = e.target.value;

    if (property === 'surname') {
      this.setState({
        surname: value
      });
    }
    else if (property === 'name') {
      this.setState({
        name: value
      });
    }
  };

  render() {
    const positions = this.transformToDropdownOptions(this.props.positions);
    const categories = this.transformToDropdownOptions(this.props.categories);
    const estimates = this.transformToDropdownOptions(this.props.estimates);

    return(
      <Segment className='add-employee'>
        <Form>
          <Form.Field>
            <h4>Добавить сотрудника</h4>
          </Form.Field>
          <Form.Field>
            <input placeholder='фамилия' onChange={this.onInputChange} name='surname'/>
          </Form.Field>
          <Form.Field>
            <input placeholder='имя'  onChange={this.onInputChange} name='name'/>
          </Form.Field>
          <Form.Field>
            <Divider/>
            <Dropdown text='должности' fluid multiple selection options={positions} onChange={this.onSelectPosition} />
          </Form.Field>
          <Form.Field>
            <Divider/>
            <Dropdown text='навыки' fluid multiple selection options={categories} onChange={this.onSelectSkill} />
          </Form.Field>
          <Form.Field>
            <List divided verticalAlign='middle'>
              {
                this.state.employeeSkills.map((skill, index) =>
                  <List.Item key={index}>
                    <Label>
                      {skill.categoryTitle}
                    </Label>
                    <Dropdown options={estimates} onChange={(e, opt, categoryId) => this.onSelectEstimate(e, opt, skill.categoryId)} />
                  </List.Item>
                )
              }
            </List>
          </Form.Field>
          <Button primary className='tiny' onClick={(data) => this.props.onAddEmployee(this.getEmployeeData())}>добавить</Button>
        </Form>
      </Segment>
    );
  }
}
export default AddEmployee;