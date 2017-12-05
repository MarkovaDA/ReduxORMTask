import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getEmployeeInfoById, filterEmployeesByPosition, filterEmployeesBySkill } from './selectors/EmployeeSelector';
import  { addEmployee } from './actions/addEmployeeAction';
import { selectEmployee} from './actions/selectEmployeeAction';
import FilterPanel from './components/FilterPanel';
import EmployeeList from './components/EmployeeList';
import PersonalCard from './components/PersonalCard';
import AddEmployee from './components/AddEmployee';

class App extends Component {

  onSelectEmployee = (employee) => {
    this.props.switchEmployeeId(employee.id);
  };

  componentDidMount() {
  	//console.log('FILTERED', this.props.filtered);
	}

	render() {
		return (
			<div>
				<FilterPanel />
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
		employees: getEmployees(state),
		filtered: filterEmployeesBySkill(state)('c++'),//некорректен в работе этот фильтр
		employeeInfo:	getEmployeeInfoById(state)(state.app.employeeId)
	}),
  dispatch => ({
		switchEmployeeId: (employeeId) => {
			dispatch(selectEmployee(employeeId));
		}
	})
)(App);