import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getEmployeeInfoById } from './selectors/EmployeeSelector';
import { selectEmployee } from './actions/selectEmployeeAction';

class App extends Component {

	componentDidMount() {
		console.log(this.props.selectedEmployee, this.props.employees);
	}

	render() {
		return (
			<div>
		  	<h1>Hello world</h1>
			</div>
		);
	}
}

export default connect (
  state => ({
		employees: getEmployees(state.orm),
		selectedEmployee: getEmployeeInfoById(state.orm, 6)
	}),
  dispatch => ({
		showInfoByEmployeeId: (employeeId) => {
			dispatch(selectEmployee(employeeId));
		}
	})
)(App);