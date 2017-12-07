import React, { Component } from 'react';
import { connect } from 'react-redux';


import { getAllEmployeesSelector } from './selectors/GetEmployeesSelector';
import { getEmployeeInfoSelector} from './selectors/GetEmployeeInfoSelector';
import { employeesFilterSelector } from './selectors/FilterEmployeeSelectors';

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

  componentDidMount() {
    //console.log(this.props.employees);
  }

	render() {
		return (
			<div>
				<FilterPanel notifyFilter = {this.onFilterEmployees} />
				<div className ='wrapper'>
					<div className='body'>
							<EmployeeList employees = {this.props.employees} onSelectEmployee = {this.onSelectEmployee}/>
							<div className='right-column'>
								<PersonalCard employeeInfo = {this.props.employeeInfo}/>
								<AddEmployee />
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
		employeeInfo:	getEmployeeInfoSelector(state)(state.app.employeeId)
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