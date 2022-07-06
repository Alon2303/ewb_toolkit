import React, {Component} from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Motion, spring} from 'react-motion';
import NavigationPanel from './components/Signin/NavigationPanel';
import Modal from './components/Signin/Modal';
import FilesContainer from './components/Files/FilesContainer';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mounted: false
		};
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}
	
	handleSubmit = (e) => {
		console.log(e)
		this.setState({ mounted: false });
		e.preventDefault();
		e.stopPropagation();
		
	}

	render() {
		const {mounted} = this.state;

		let child;

		if(mounted) {
			child = (
				<div className="App_test">
					<NavigationPanel></NavigationPanel>
					{/* <Modal onSubmit={this.handleSubmit}/> */}
					<FilesContainer></FilesContainer>
				</div>
			);
		}
		
		return(
			<div className="App">
				{child}
			</div>
		);
	}
}

export default App;
