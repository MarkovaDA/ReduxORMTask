import React, { Component } from 'react';
import { Segment, Input, Button, Dropdown } from 'semantic-ui-react';
import 'react-select/dist/react-select.css';

class FilterPanel extends Component {

  onSelectFilter = (e, { value }) => {
    this.setState({
      filterId: value,
      filterText: this.state.options[value].text
    });

  };

  onPatternChange = (e) => {
    this.setState({
      searchPattern: e.target.value
    });
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSearchClick();
    }
  };

  onSearchClick = () => {
    const { filterId, searchPattern } = this.state;
    this.props.notifyFilter(filterId, searchPattern);
  };

  state =  {
    filterText: 'Фильтр',
    options: [
        {key: 0, text:'Имя', value: 0},
        {key: 1, text:'Должность', value: 1},
        {key: 2, text:'Навык', value: 2},
        {key: 3, text:'Все пользователи', value: 3}
      ],
  };

  render() {
    return (
      <div className='header'>
        <Segment textAlign='right' className='secondary raised segment'>
          <Dropdown text={this.state.filterText} pointing='top right' icon={'filter'} options={this.state.options} onChange={this.onSelectFilter} />
          <Input icon='search' placeholder='поиск...' onChange = {this.onPatternChange} onKeyPress={this.onKeyPress } />
          <Button style={{marginLeft: '10px'}} size={'tiny'} primary
                  onClick={this.onSearchClick}>
                  найти
          </Button>
        </Segment>
      </div>
    )
  }
}
export default FilterPanel;