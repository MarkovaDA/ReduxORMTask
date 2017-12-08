import React, { Component } from 'react';
import { connect } from 'react-redux';

import { employeeInfoSelector} from './selectors/EmployeeInfoSelector';
import { employeesFilterSelector } from './selectors/FilterEmployeeSelectors';
import { listPositionSelector } from './selectors/ListPositionSelector';
import { listCategorySelector } from './selectors/ListCategorySelector';
import { listEstimateSelector } from './selectors/ListEstimateSelector';

import { selectEmployee} from './actions/selectEmployeeAction';
import { selectFilter } from './actions/selectFilterAction';

import FilterPanel from './components/FilterPanel';
import EmployeeList from './components/EmployeeList';
import PersonalCard from './components/PersonalCard';
import AddEmployee from './components/AddEmployee';

class App extends Component {

  onSelectEmployee = (employee) => {
    this.props.switchEmployeeId(employee.id);
  };

  onFilterEmployees = (filterId, pattern) => {
    this.props.switchFilter(filterId, pattern);
  };

  onAddEmployee = (employeeData) => {
  	console.log('APP ', employeeData);
	};

	render() {
		return (
			<div>
				<FilterPanel notifyFilter={this.onFilterEmployees} />
				<div className ='wrapper'>
					<div className='body'>
							<EmployeeList employees={this.props.employees} onSelectEmployee ={this.onSelectEmployee}/>
							<div className='right-column'>
								<PersonalCard employeeInfo={this.props.employeeInfo}/>
								<AddEmployee positions={this.props.positions}
														 categories={this.props.categories}
														 estimates={this.props.estimates} onAddEmployee={this.onAddEmployee}/>
							</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect (
  state => ({
    employees: employeesFilterSelector(state)(state.app.filterId, state.app.pattern),
		employeeInfo:	employeeInfoSelector(state)(state.app.employeeId),
		positions: listPositionSelector(state)(), //набор всех должностей в системе
		categories: listCategorySelector(state)(), //набор скиллов в системе
		estimates: listEstimateSelector(state)() //уровни знаний
	}),
  dispatch => ({
		switchEmployeeId: (employeeId) => {
			dispatch(selectEmployee(employeeId));
		},
    switchFilter: (filterId, pattern) => {
		  dispatch(selectFilter(filterId, pattern));
    }
	})
)(App);