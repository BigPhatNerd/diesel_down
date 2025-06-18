/* global gtag_report_conversion */
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import RequestQuoteButton from "./RequestQuoteButton";

const QuoteAndCallButtons = ({ style }) => {
    const handlePhoneClick = (e) => {
        e.preventDefault(); // prevent default <a> navigation
        gtag_report_conversion('tel:9014437461'); // call the tracking function and continue to call
    };

    return (
        <Row className="justify-content-center mt-3">
            <Col xs="auto">
                <RequestQuoteButton style={style} />
            </Col>
            <Col xs="auto" className="ms-4">
                <Button
                    variant="outline-light"
                    onClick={handlePhoneClick}
                >
                    📞 (901) 443-7461
                </Button>
            </Col>
        </Row>
    );
};

export default QuoteAndCallButtons;
