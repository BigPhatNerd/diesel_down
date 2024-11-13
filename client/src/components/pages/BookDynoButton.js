// BookDynoButton.js

import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RegistrationContext from '../../context/registration/registrationContext';

const BookDynoButton = ({ style }) => {
    const registrationContext = useContext(RegistrationContext);
    const { user } = registrationContext;
    const history = useHistory();

    const handleBookDynoClick = () => {
        if (!user?.isAuthenticated) {
            history.push('/login');
        } else {
            history.push('/book-dyno');
        }
    };

    return (
        <Button
            style={style}
            className="custom-button"
            onClick={handleBookDynoClick}
        >
            Book Your Dyno Session Today!
        </Button>
    );
};

export default BookDynoButton;
