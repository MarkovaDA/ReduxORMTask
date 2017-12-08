import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';
import  * as isUndefined from 'lodash.isundefined' ;
class PersonalCard extends Component {

  buildCard = (employee) => {
    if (isUndefined(employee)) {
      return <p>Кликните на элемент списка для просмотра</p>
    }
    const {surname, name} = this.props.employeeInfo;

    return (
        <List as='ul' style={{height: '80%', overflowY: 'scroll'}}>
          <List.Item as='li'><u>{surname} {name}</u></List.Item>
          <List.Item as='li'><b>Занимаемые должности</b></List.Item>
          <List.Item style={{marginLeft: '20px'}}>
            <List as='ol'>
              {
                employee.positions.map((position, index) =>
                  <List.Item as='li' key={index}>{position.title}</List.Item>
                )
              }
            </List>
          </List.Item >
          <List.Item as='li'>
            <b>Навыки</b>
            <List as='ol' style={{marginLeft: '20px'}}>
              {
                  employee.skills.map((skill, index) => {
                    const {category, estimate} = skill;
                    return (<List.Item as='li' key={index}>{category.title} <span>({estimate.title})</span></List.Item>)
                  }
                )
              }
            </List>
          </List.Item>
        </List>
    );
  };

  render() {
    const card = this.buildCard(this.props.employeeInfo);
    return(
      <Segment className='info-employee'>
        <h4>Личная карта сотрудника</h4>
        {card}
      </Segment>
    );
  }
}

export default PersonalCard;