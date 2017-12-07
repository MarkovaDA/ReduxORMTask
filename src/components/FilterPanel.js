import React, { Component } from 'react';
import { Segment, Input, Button, Dropdown } from 'semantic-ui-react';
import 'react-select/dist/react-select.css';

class FilterPanel extends Component {

  onSelectFilter = (e, { value }) => {
    this.props.notifyFilter(value);

    this.setState({
      selectedFilter: this.state.options[value].text
    });
  };

  state =  {
    selectedFilter: 'Фильтр',
    options: [
        {key:0, text:'Имя', value:0},
        {key: 1, text:'Должность', value:1},
        {key: 2, text:'Навык', value:2}
      ],
  };

  render() {
    return (
      <div className='header'>
        <Segment textAlign='right' className='secondary raised segment'>
          <Dropdown text={this.state.selectedFilter} pointing='top right' icon={'filter blue'} options={this.state.options} onChange={this.onSelectFilter} />
          <Input icon='search' placeholder='поиск...' />
          <Button style={{marginLeft: '10px'}} size={'tiny'} primary>найти</Button>
        </Segment>
      </div>
    )
  }
}
export default FilterPanel;