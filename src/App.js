import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getEmployeeInfoById } from './selectors/EmployeeSelector';
import { selectEmployee } from './actions/selectEmployeeAction';
import  { addEmployee } from './actions/addEmployeeAction';

class App extends Component {

	componentDidMount() {
		//react-material-design
		console.log(this.props.selectedEmployee, this.props.employees);
	}

	componentWillReceiveProps(props) {
	  console.log(props.employees);
  }

	render() {
		return (
			<div>
		  	<h1>Hello world</h1>
        <button onClick={this.props.addNewEmployee}>добавить</button>
			</div>
		);
	}
}

export default connect (
  state => ({
		employees: getEmployees(state),
		selectedEmployee: getEmployeeInfoById(state)(5)
	}),
  dispatch => ({
    addNewEmployee: () => {
      dispatch(addEmployee())
    }
		/*showInfoByEmployeeId: (employeeId) => {
			dispatch(selectEmployee(employeeId));
		}*/
	})
)(App);