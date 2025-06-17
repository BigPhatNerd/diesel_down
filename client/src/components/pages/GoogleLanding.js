import React, { useEffect, useContext } from "react";
import TuningCatalogue from './TuningCatalogue';
import { Container, Row, Button } from "react-bootstrap";
import QuoteAndCallButtons from "./QuoteAndCallButtons";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks";
import SocialMediaLinks from "./SocialMediaLinks";
import AddressComponent from "./AddressComponent";
import GoogleReviews from "./GoogleReviews";

const GoogleLanding = () => {

    const styles = getBackgroundStyles();
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        // --- Above the Fold ---
        <div id="cover" style={styles.container}>
            <Container className="pt-3">
                <Row className="justify-content-center m-2">
                    <img
                        src={logo}
                        alt="Diesel Down Logo"
                        style={{ maxWidth: "60%", height: "auto", marginBottom: "20px" }}
                    />
                </Row>
                <Row className="justify-content-center">
                    <h1 className="text-white text-center">
                        Unlock Peak Performance with Custom Diesel Tuning in Mississippi
                    </h1>
                    <h4 className="text-white text-center">
                        Real Dyno Data. Real Results. Tuning for Cummins, Powerstroke, Duramax & More.
                    </h4>
                </Row>
                <QuoteAndCallButtons style={styles.button} />
                <Row className="justify-content-center m-4">
                    <TuningCatalogue />
                </Row>
                <Row className="justify-content-center m-2">
                    <hr style={{
                        border: 'none',
                        borderTop: '1px solid #ccc',
                        margin: '40px 0',
                        width: '100%'
                    }} />
                </Row>


                {/* --- Section 1: Why Diesel Down --- */}
                <Row className="justify-content-center">
                    <h2>Performance Backed by Data – Built for Serious Drivers</h2>
                </Row>
                <Row className="justify-content-center">
                    <ul
                        style={{
                            listStylePosition: "outside",
                            paddingLeft: "20px",
                            textAlign: "left",
                        }}
                    >
                        <li>✔ World’s largest eddy brake (850+ HP & 3000 ft-lbs torque)</li>
                        <li>✔ Custom tuning for Cummins, Powerstroke, Duramax & gas vehicles</li>
                        <li>✔ 15,000 Series Dyno with real-time analytics</li>
                        <li>✔ Dyno-tested for fuel efficiency, horsepower & torque</li>
                    </ul>
                </Row>

                <Row className="justify-content-center m-2">
                    <hr style={{
                        border: 'none',
                        borderTop: '1px solid #ccc',
                        margin: '40px 0',
                        width: '100%'
                    }} />
                </Row>

                {/* --- Section 2: What We Tune --- */}
                <Row className="justify-content-center">
                    <h2>Built for Trucks — But We Don’t Stop There</h2>
                </Row>
                <Row className="justify-content-center">
                    <ul
                        style={{
                            listStylePosition: "outside",
                            paddingLeft: "20px",
                            textAlign: "left",
                        }}
                    >
                        <li>✅ Diesel Trucks: RAM Cummins, Ford Powerstroke, Chevy/GMC Duramax</li>
                        <li>✅ Gas Trucks, Street Cars, Muscle Cars</li>
                        <li>✅ Custom tunes for towing, performance, daily driving, or work trucks</li>
                    </ul>
                </Row>

                <Row className="justify-content-center m-2">
                    <hr style={{
                        border: 'none',
                        borderTop: '1px solid #ccc',
                        margin: '40px 0',
                        width: '100%'
                    }} />
                </Row>

                {/* --- Section 3: Real Reviews --- */}
                <Row className="justify-content-center">
                    <GoogleReviews widgetId="elfsight-app-01b90faf-ad03-459f-9f63-4c9dbf527bf2" />
                </Row>
                <Row className="justify-content-center">
                    <GoogleReviews widgetId="elfsight-app-80158f93-3ced-4d95-8b99-2fdf3a45c161" />
                </Row>

                <Row className="justify-content-center m-2">
                    <hr style={{
                        border: 'none',
                        borderTop: '1px solid #ccc',
                        margin: '40px 0',
                        width: '100%'
                    }} />
                </Row>
                {/* --- Section 4: What to Expect --- */}
                <Row className="justify-content-center">
                    <h2>Here’s What Happens When You Book</h2>
                </Row>
                <Row className="justify-content-center">

                    <ul
                        style={{
                            listStylePosition: "outside",
                            paddingLeft: "20px",
                            textAlign: "left",
                        }}
                    >
                        <li>Choose your vehicle + request a quote</li>
                        <li>We schedule your dyno session</li>
                        <li>Drop your vehicle with us.</li>
                        <li>You get performance data + a custom tune</li>
                        <li>You leave with more power, better fuel efficiency & smoother performance</li>
                    </ul>
                </Row>

                {/* --- Sticky CTA Section --- */}
                <h2>Ready to Get Tuned?</h2>
                <QuoteAndCallButtons style={styles.button} />
                <AddressComponent />
                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>
                <NavigationLinks user={user} currentPage="google-landing" />
            </Container>
        </div>)

}

export default GoogleLanding;
