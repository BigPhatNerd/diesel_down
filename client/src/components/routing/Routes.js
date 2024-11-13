import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserRegistration from '../pages/auth/UserRegistration'
import NotFound from '../pages/NotFound'
import Login from '../pages/auth/Login'
import Alert from '../Alert';

import MoreInfo from '../pages/MoreInfo';
import AboutUs from '../pages/AboutUs';
import Dashboard from '../pages/Dashboard';
import BookDyno from '../pages/BookDyno';
import HowItWorks from '../pages/HowItWorks';
import ContactUs from '../pages/ContactUs';




const Routes = () => {
	return (
		<>
			<Alert />
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/user-registration" component={UserRegistration} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/more-info' component={MoreInfo} />
				<Route exact path='/book-dyno' component={BookDyno} />
				<Route exact path='/how-it-works' component={HowItWorks} />
				<Route exact path='/about-us' component={AboutUs} />
				<Route exact path='/contact-us' component={ContactUs} />
				<Route component={NotFound} />
			</Switch>
		</>
	)
}

export default Routes