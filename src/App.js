import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getEmployeeInfoById } from './selectors/EmployeeSelector';
import { selectEmployee } from './actions/selectEmployeeAction';
import  { addEmployee } from './actions/addEmployeeAction';

import { Grid, Cell, Card } from 'react-mdl';

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
			<div className='wrapper-section'>
				<Grid className="search-section">
					<Cell col={12}>
					</Cell>
				</Grid>
				<Grid noSpacing>
					<Cell col={6}  className='list-section'>
						<h1>Hello world</h1>
						<button onClick={this.props.addNewEmployee}>добавить</button>
					</Cell>
					<Cell col={6} >
						<Grid noSpacing>
							<Cell col={12} className='info-section'></Cell>
						</Grid>
						<Grid noSpacing>
							<Cell col={12} className='add-employee-section'></Cell>
						</Grid>
					</Cell>
				</Grid>
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