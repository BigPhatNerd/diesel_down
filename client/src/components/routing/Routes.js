import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import UserRegistration from '../pages/auth/UserRegistration'
import NotFound from '../pages/NotFound'
// import Login from '../pages/auth/Login'
import Alert from '../Alert';

import MoreInfo from '../pages/MoreInfo';
import AboutUs from '../pages/AboutUs';
// import Dashboard from '../pages/Dashboard';
import RequestQuote from '../pages/RequestQuote';
// import HowItWorks from '../pages/HowItWorks';
import ContactUs from '../pages/ContactUs';
import BlogList from '../pages/BlogList'; // Adjust the import path
import BlogDetails from '../pages/BlogDetails';
import ThankYouInterestForm from '../pages/ThankYouInterestForm';
import ThankYouInfoForm from '../pages/ThankYouInfoForm';
import InterestForm from '../pages/InterestForm';
import VehicleInfo from '../pages/VehicleInfo';
import PricingInfo from '../pages/PricingInfo';
import GoogleLanding from '../pages/GoogleLanding';
import CumminsTuning from '../pages/CumminsTuning';
import PowerstrokeTuning from '../pages/PowerstrokeTuning';
import DuramaxTuning from '../pages/DuramaxTuning';
import GasTuning from '../pages/GasTuning';
import DynoTesting from '../pages/DynoTesting';




const Routes = () => {
	return (
		<>
			<Alert />
			<Switch>
				{/* <Route exact path="/login" component={Login} /> */}
				{/* <Route exact path="/user-registration" component={UserRegistration} /> */}
				{/* <Route exact path='/dashboard' component={Dashboard} /> */}
				<Route exact path='/more-info' component={MoreInfo} />
				<Route exact path='/google-landing' component={GoogleLanding} />
				<Route exact path='/request-quote' component={RequestQuote} />
				<Route exact path='/request-info' component={InterestForm} />
				<Route exact path='/vehicle-info' component={VehicleInfo} />
				{/* <Route exact path='/how-it-works' component={HowItWorks} /> */}
				<Route exact path='/about-us' component={AboutUs} />
				<Route exact path='/pricing-info' component={PricingInfo} />
				<Route exact path='/contact-us' component={ContactUs} />
				<Route exact path='/blog' component={BlogList} />
				<Route exact path='/blog/:slug' component={BlogDetails} />
				<Route exact path='/thank-you' component={ThankYouInterestForm} />
				<Route exact path='/thank-you-info' component={ThankYouInfoForm} />
				<Route exact path='/Cummins-Tuning' component={CumminsTuning} />
				<Route exact path='/Powerstroke-Tuning' component={PowerstrokeTuning} />
				<Route exact path='/Duramax-Tuning' component={DuramaxTuning} />
				<Route exact path='/GasTuning' component={GasTuning} />
				<Route exact path='/Dyno-Testing' component={DynoTesting} />
				<Route component={NotFound} />
			</Switch>
		</>
	)
}

export default Routes