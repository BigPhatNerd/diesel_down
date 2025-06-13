// RequestQuoteButton.js

import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const RequestQuoteButton = ({ style }) => {
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
