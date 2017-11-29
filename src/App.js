import React, { Component } from 'react';
import { connect } from 'react-redux';


class App extends Component {
	componentWillReceiveProps(props) {
		console.log(props.state);
	}

	render() {
		return (
		  <h1>Hello world</h1>
		);
	}
}

export default connect (
  state => ({
		state: state
	}),
  dispatch => ({})
)(App);