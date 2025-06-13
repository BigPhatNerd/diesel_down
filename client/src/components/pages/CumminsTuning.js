// CumminsTuning.js
import React, { useEffect, useContext } from "react";
import { Container, Row, Button } from "react-bootstrap";
import RequestQuoteButton from "./RequestQuoteButton";
import logo from "../../img/transparent_white_red.png";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import { Helmet } from "react-helmet";
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks";
import SocialMediaLinks from "./SocialMediaLinks";
import AddressComponent from "./AddressComponent";
import GoogleReviews from "./GoogleReviews";

const CumminsTuning = () => {
    const styles = getBackgroundStyles();
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="pt-3">
            <Helmet>
                <title>Custom Cummins Tuning in Mississippi | Diesel Down</title>
                <meta name="description" content="Unlock your Cummins 6.7L’s full potential with custom tuning from Diesel Down. Improve horsepower, fuel economy, and towing power." />
            </Helmet>

            <Row className="justify-content-center m-2">
                <img
                    src={logo}
                    alt="Diesel Down Logo"
                    style={{ maxWidth: "60%", height: "auto", marginBottom: "20px" }}
                />
            </Row>

            <h1 className="text-white text-center">Cummins Tuning in Mississippi</h1>
            <p>
                Unlock your Cummins full potential with custom tuning from Diesel Down. Whether you tow heavy, daily drive, or want improved throttle response, our dyno-tested tuning will deliver. We optimize fuel economy, horsepower, and torque while maintaining reliability.
            </p>

            <Row className="justify-content-center mt-3">
                <RequestQuoteButton style={styles.button} />
                <Button
                    href="tel:9014437461"
                    className="ms-3"
                    variant="outline-light"
                >📞 (901) 443-7461</Button>
            </Row>
            <Row className="justify-content-center">
                <GoogleReviews widgetId="elfsight-app-01b90faf-ad03-459f-9f63-4c9dbf527bf2" />
            </Row>
            <AddressComponent />
            <Row className="justify-content-center m-4">
                <SocialMediaLinks />
            </Row>
            <NavigationLinks user={user} currentPage="Cummins-Tuning" />
        </Container>
    );
};

export default CumminsTuning;


// Repeat structure for other service pages with different content:

// PowerstrokeTuning.js
// DuramaxTuning.js
// DynoTesting.js
