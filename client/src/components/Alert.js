import React, { useContext } from 'react';
import RegistrationContext from '../context/registration/registrationContext';

const Alert = () => {
	const registrationContext = useContext(RegistrationContext);

	const { alert } = registrationContext;

	return (
		alert !== null && alert.length !== 0 &&

		alert.map((item, i) => (
			<div key={`alert-${i}`} style={{
				backgroundColor: 'white',
				color: '#C70C18',
				position: 'fixed',
				width: '100%',
				zIndex: 1,
				height: '2rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontWeight: 'bold',
				boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
			}}>
				{item.msg}
			</div>))


	)
}

export default Alert;