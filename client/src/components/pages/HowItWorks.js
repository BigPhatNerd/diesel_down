import React, { useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import QuoteAndCallButtons from "./QuoteAndCallButtons";
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import SocialMediaLinks from "./SocialMediaLinks";
import AddressComponent from "./AddressComponent";

const HowItWorks = () => {
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;

    useEffect(() => {
        loadUser();
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
                    <h2>How It Works</h2>
                </Row>
                <Row className="m-3 text-left">
                    <ol>
                        <li><strong>Book Your Appointment:</strong> Schedule a time that works best for you.</li>
                        <li><strong>Show Up & Ask Questions:</strong> Arrive on the day, kick back, ask questions, and share any details you might have forgotten.</li>
                        <li><strong>Drop your vehicle:</strong> Depending on if you are just getting dyno data and/or diagnostics or getting your vehicle tuned you will want to either drop your vehicle for a day or stick around and watch the pulls. If just getting data and diagnostics, kick back in the observation room as we test your truck’s performance on the dyno.</li>
                        <li><strong>Receive Your Data:</strong> Get detailed files with all the data produced from the run.</li>
                        <li><strong>Tuning & Re-Running (Optional):</strong> If having the vehicle tuned, it is best to plan on your leaving your truck with us so that we can precisely adjust the vehicle and test the tune thoroughly.</li>
                        <li><strong>Take Your Data, Truck, & Tune:</strong> Leave with your data, truck, and tune, then go show the world just how badass your ride is.</li>
                    </ol>
                    <p>
                        We’re here for you every step of the way. We love what we do, and we want to work with you to build a lasting relationship.
                    </p>
                    <p style={{
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        padding: "10px",
                        backgroundColor: "#2C3539",
                        borderRadius: "5px",
                        border: "1px solid #e0e0e0"
                    }}>
                        <strong>No Limits on Dyno Pulls for Tuning:</strong> If your vehicle is being tuned, we don’t limit the number of dyno pulls. We continue to make pulls and adjustments until the data shows us that we’ve achieved optimal performance. Your truck deserves the best, and we’re committed to making that happen.
                    </p>
                </Row>
                <QuoteAndCallButtons style={styles.button} />
                <Row className="justify-content-center m-2">
                    <p style={styles.italicText}>
                        Have Questions? Let’s Chat. <br />Call or Text Us at <a href="tel:9014437461" style={{ color: "inherit", textDecoration: "none" }}>(901) 443-7461</a>.
                    </p>
                </Row>

                <AddressComponent />
                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>

                <NavigationLinks user={user} currentPage="how-it-works" />

                <br />
            </Container>
        </div>
    );
};

export default HowItWorks;
