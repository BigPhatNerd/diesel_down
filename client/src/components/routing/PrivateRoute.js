import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RegistrationContext from '../../context/registration/registrationContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const registrationContext = useContext(RegistrationContext);
	const { user, loading } = registrationContext;

	return (
		<Route
			{...rest}
			render={props =>
				!user.isAuthenticated && !loading ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)}
		/>
	)
}
export default PrivateRoute;

