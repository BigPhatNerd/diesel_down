import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/src/collapse.js";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import MyNavbar from './components/MyNavbar'
import Routes from './components/routing/Routes'
import Landing from './components/pages/Landing'
import ScrollToTop from './components/ScrollToTop';

import RegistrationState from './context/registration/RegistrationState'


function App() {

	return (

		<RegistrationState>
			<Router>
				<ScrollToTop />
				<MyNavbar />
				<div className="content-container">

					{/*<Spinner />*/}
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route component={Routes} />

					</Switch>
				</div>
			</Router>
		</RegistrationState>

	)
}

export default App