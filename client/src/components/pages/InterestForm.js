
import React, { useEffect, useContext, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavigationLinks from "../NavigationLinks";
import 'react-phone-input-2/lib/style.css';
import RegistrationContext from '../../context/registration/registrationContext';
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import AddressComponent from './AddressComponent';
import SocialMediaLinks from "./SocialMediaLinks";
// import GoogleReviews from "./GoogleReviews";


const InterestForm = ({ history }) => {
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;

    const styles = getBackgroundStyles();

    useEffect(() => {
        loadUser();
        if (window.fbq) {
            window.fbq('track', 'ViewContent', {
                content_name: 'Request Info',
                content_category: 'Lead Page',
                value: 800,
                currency: 'USD'
            });
        }
        //eslint-disable-next-line
    }, []);

    const [showInfo, setShowInfo] = useState(false);


    return (
        <div id='request-info' style={styles.container}>
            <Container className='pt-3'>
                <Row className="justify-content-center m-2">
                    <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
                </Row>

                <Row className="justify-content-center m-2 text-center">
                    <h1>Want a Custom Dyno Tune for Your Diesel?</h1>
                    <p>Fill this out and I’ll text or email you the details — no pressure. no ongoing marketing.</p>
                </Row>

                <Row className="justify-content-center mb-5">
                    <iframe
                        title="JotForm"
                        src="https://form.jotform.com/250863857819170"
                        width="100%"
                        height="600px"
                        frameBorder="0"
                        style={{ border: 'none' }}
                        allow="geolocation; microphone; camera"
                    ></iframe>
                </Row>

                <Row className="justify-content-center m-4">
                    <button
                        className="btn btn-outline-light"
                        onClick={() => setShowInfo(!showInfo)}
                        style={{ fontSize: '1.1rem' }}
                    >
                        {showInfo ? 'Hide Details' : 'What to Expect'}
                    </button>
                </Row>

                {showInfo && (
                    <>
                        <Row className="justify-content-center m-2">
                            <h2>What You Can Expect When You Work with Diesel Down</h2>
                            <p>We make it easy to get your diesel dialed in — from power to drivability to shift control. Here’s how it works:</p>
                        </Row>

                        <Row className="justify-content-center m-2">
                            <ul style={{ listStylePosition: 'outside', paddingLeft: '20px', textAlign: 'left', maxWidth: '800px' }}>
                                <li><strong>Custom Dyno Tune:</strong> Our base dyno tune is $800. This includes being strapped to the dyno and building a custom tune tailored to your goals.</li>
                                <li><strong>Tuning Delivery Options:</strong>
                                    <ul style={{ marginTop: '8px' }}>
                                        <li>Flash directly to your ECM/PCM using a credit-based system — typically $100–$200.</li>
                                        <li>Use a tuning device that lets you switch between modes — usually $350 and up.</li>
                                    </ul>
                                </li>
                            </ul>
                        </Row>

                        <Row className="justify-content-center m-2">
                            <p style={{ textAlign: 'center', maxWidth: '800px' }}>
                                <strong>Want an accurate quote?</strong><br />
                                <Link to="/vehicle-info" style={{ color: '#C70C18', textDecoration: 'underline' }}>
                                    Fill out vehicle information here
                                </Link>
                                — I’ll get back to you with specific pricing and options based on your truck.
                            </p>
                        </Row>
                    </>
                )}


                <Row className="justify-content-center m-2">
                    <p><strong>Have questions?</strong><br />
                        Text or call <a href="tel:9014437461" style={{ color: "inherit", textDecoration: "none" }}>(901) 443-7461</a>. I’m always down to talk trucks.
                    </p>
                </Row>

                <Row className="justify-content-center">
                    <p style={styles.italicText}>
                        Feel free to reach out anytime at <a href="tel:9014437461" style={{ color: "inherit", textDecoration: "none" }}>(901) 443-7461</a>.
                    </p>
                </Row>

                <AddressComponent />

                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>

                <NavigationLinks user={user} currentPage="interest-form" />
            </Container>
        </div>
    )

};

export default InterestForm;
