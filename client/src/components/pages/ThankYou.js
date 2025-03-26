import React, { useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import NavigationLinks from "../NavigationLinks";
import RegistrationContext from "../../context/registration/registrationContext";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import SocialMediaLinks from "./SocialMediaLinks";
import AddressComponent from "./AddressComponent";

const ThankYou = () => {
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;

    useEffect(() => {
        loadUser();

        // Fire Google Ads Conversion Event
        if (window.gtag) {
            window.gtag('event', 'conversion', {
                send_to: 'AW-11555277884/XXXXXXX12345abcde' // Replace this with your actual ID
            });
        }

        //eslint-disable-next-line
    }, []);

    const styles = getBackgroundStyles();

    return (
        <div id="cover" style={styles.container}>
            <Container className="pt-3">
                <Row className="justify-content-center m-2">
                    <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
                </Row>
                <Row className="justify-content-center m-4">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                        Thanks for Booking with Diesel Down!
                    </h2>
                </Row>
                <Row className="justify-content-center m-3">
                    <p style={{ lineHeight: "1.8", fontSize: "1.1rem", maxWidth: "700px", textAlign: "center" }}>
                        We appreciate your interest in getting your vehicle dialed in! We'll review your submission and get back to you ASAP to confirm your appointment or answer any questions.
                    </p>
                </Row>
                <Row className="justify-content-center m-4">
                    <p style={styles.italicText}>
                        Need to talk now? <br />
                        Call or Text Us at <a href="tel:9014437461" style={{ color: "inherit", textDecoration: "none" }}>(901) 443-7461</a>
                    </p>
                </Row>

                <AddressComponent />

                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>

                <NavigationLinks user={user} currentPage="thank-you" />
            </Container>
        </div>
    );
};

export default ThankYou;
