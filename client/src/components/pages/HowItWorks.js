import React, { useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";

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
                        <li><strong>Optional Video Experience:</strong> Share info for an optional video documenting your experience—perfect for bragging about your power upgrades.</li>
                        <li><strong>Show Up & Relax:</strong> Arrive on the day, kick back, ask questions, and share any details you might have forgotten.</li>
                        <li><strong>Watch the Dyno Performance:</strong> Sit back and watch as we test your truck’s performance on the dyno.</li>
                        <li><strong>Receive Your Data:</strong> Get detailed files with all the data produced from the run.</li>
                        <li><strong>Tuning & Re-Running (Optional):</strong> Choose to have your truck tuned and run again for even better performance.</li>
                        <li><strong>Take Your Data, Truck, & Video:</strong> Leave with your data, truck, and video, then go show the world just how badass your ride is.</li>
                    </ol>
                    <p>
                        We’re here for you every step of the way. If you have any questions or need more info, don’t hesitate to reach out. We love what we do, and we want to work with you to build a lasting relationship.
                    </p>
                </Row>

                <NavigationLinks user={user} currentPage="how-it-works" />
                {/* <Row className="justify-content-center m-4">
                    <h2 style={{
                        fontWeight: "bold",
                        color: "#FF4500",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        fontStyle: "italic",
                        fontSize: "2.5rem"
                    }}>
                        Fire it up and Diesel Down
                    </h2>
                </Row> */}

                <br />

            </Container>
        </div>
    );
};

export default HowItWorks;
