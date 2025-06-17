// GasTuning.js
import React, { useEffect, useContext } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";

import logo from "../../img/transparent_white_red.png";
import QuoteAndCallButtons from "./QuoteAndCallButtons";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks";
import SocialMediaLinks from "./SocialMediaLinks";
import AddressComponent from "./AddressComponent";
import GoogleReviews from "./GoogleReviews";

const GasTuning = () => {
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
                <title>Custom Gas Vehicle Tuning in Mississippi | Diesel Down</title>
                <meta
                    name="description"
                    content="We tune gas-powered trucks, muscle cars, and modern performance vehicles. Get dyno-proven results from Diesel Down in Mississippi."
                />
            </Helmet>

            <Row className="justify-content-center m-2">
                <img
                    src={logo}
                    alt="Diesel Down Logo"
                    style={{ maxWidth: "60%", height: "auto", marginBottom: "20px" }}
                />
            </Row>

            <h1 className="text-white text-center">Gas Tuning in Mississippi</h1>
            <p>
                Diesel Down might be known for diesels, but our shop is fully equipped
                and experienced in tuning a wide range of gas-powered vehicles. Whether
                you're looking to improve throttle response, increase horsepower, or
                squeeze out better fuel efficiency, we've got you covered.
            </p>

            <p>
                From naturally aspirated muscle cars to turbocharged street builds and
                late-model trucks, we bring the same dyno-driven precision and custom
                tuning experience that our diesel clients trust — now for your gas ride.
            </p>

            <QuoteAndCallButtons style={styles.button} />

            <Row className="justify-content-center">
                <GoogleReviews widgetId="elfsight-app-01b90faf-ad03-459f-9f63-4c9dbf527bf2" />
            </Row>

            <AddressComponent />

            <Row className="justify-content-center m-4">
                <SocialMediaLinks />
            </Row>

            <NavigationLinks user={user} currentPage="Gas-Tuning" />
        </Container>
    );
};

export default GasTuning;
