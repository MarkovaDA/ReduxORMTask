import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';

class PersonalCard extends Component {

  render() {
    return(
      <Segment className='info-employee blue'>
        <label>Личная карта сотрудника</label>
        <List as='ul'>
          <List.Item as='li'><b>Занимаемые должности</b></List.Item>
          <List.Item style={{marginLeft: '20px'}}>
            <List as='ol'>
              <List.Item as='li'>Java-разработчик</List.Item>
              <List.Item as='li'>Менеджер</List.Item>
              <List.Item as='li'>Аналитик</List.Item>
            </List>
          </List.Item >
          <List.Item as='li'>
            <b>Навыки</b>
            <List as='ol' style={{marginLeft: '20px'}}>
              <List.Item as='li'>Java <span>(отлично)</span></List.Item>
              <List.Item as='li'>Angular <span>(хорошо)</span></List.Item>
              <List.Item as='li'>Spring MVC <span>(отлично)</span></List.Item>
            </List>
          </List.Item>
        </List>
      </Segment>
    );
  }
}

export default PersonalCard;