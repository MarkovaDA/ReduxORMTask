import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getEmployeeInfoById } from './selectors/EmployeeSelector';
import { selectEmployee } from './actions/selectEmployeeAction';
import  { addEmployee } from './actions/addEmployeeAction';
import FilterPanel from './components/FilterPanel';
import EmployeeList from './components/EmployeeList';
import PersonalCard from './components/PersonalCard';
import AddEmployee from './components/AddEmployee';

class App extends Component {

	render() {
		//только этот компонент будет соединняться с редаксом и передавать данные остальным компонентам
		//1 Следующая задача - отображение лично карты
		return (
			<div>
				<FilterPanel />
				<div className ='wrapper'>
					<div className='body'>

							<EmployeeList employees = {this.props.employees} />

							<div className='right-column'>
								<PersonalCard />
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