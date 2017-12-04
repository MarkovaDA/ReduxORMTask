import React, { Component } from 'react';
import { Segment, Dropdown,  Input, Button } from 'semantic-ui-react';

class FilterPanel extends Component {
  selectFilter = (data) => {
    console.log('filter', data);
  };

  render() {
    return (
      <div className='header'>
        <Segment className='ui right aligned secondary raised segment'>
          <Dropdown icon='filter' className='filterIcon' text='Фильтрация'>
            <Dropdown.Menu >
              <Dropdown.Item text='Имя' onClick = {() => this.selectFilter(0)}/>
              <Dropdown.Item text='Должность' onClick = {() => this.selectFilter(1)}/>
              <Dropdown.Item text='Навыки' onClick = {() => this.selectFilter(2)}/>
            </Dropdown.Menu>
          </Dropdown>
          <Input icon='search' placeholder='поиск...' />
          <Button style={{marginLeft: '10px'}} size={'tiny'} primary>найти</Button>
        </Segment>
      </div>
    )
  }
}
export default FilterPanel;