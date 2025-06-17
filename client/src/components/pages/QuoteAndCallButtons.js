import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import RequestQuoteButton from "./RequestQuoteButton";

const QuoteAndCallButtons = ({ style }) => {
    return (
        <Row className="justify-content-center mt-3">
            <Col xs="auto">
                <RequestQuoteButton style={style} />
            </Col>
            <Col xs="auto" className="ms-4">
                <Button href="tel:9014437461" variant="outline-light">
                    📞 (901) 443-7461
                </Button>
            </Col>
        </Row>
    );
};

export default QuoteAndCallButtons;
