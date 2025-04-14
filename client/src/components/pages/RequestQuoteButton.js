// RequestQuoteButton.js

import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RegistrationContext from '../../context/registration/registrationContext';

const RequestQuoteButton = ({ style }) => {
    const registrationContext = useContext(RegistrationContext);
    const history = useHistory();

    const handleRequestQuoteClick = () => {
        history.push('/request-quote');
    };

    return (
        <Button
            style={style}
            className="custom-button"
            onClick={handleRequestQuoteClick}
        >
            Request Quote Today!
        </Button>
    );
};

export default RequestQuoteButton;
