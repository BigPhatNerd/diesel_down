import React, { useEffect, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import NavigationLinks from "../NavigationLinks";
import 'react-phone-input-2/lib/style.css';
import RegistrationContext from '../../context/registration/registrationContext';
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import AddressComponent from './AddressComponent';
import SocialMediaLinks from "./SocialMediaLinks";
// import GoogleReviews from "./GoogleReviews";


const RequestQuote = ({ history }) => {
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;

    const styles = getBackgroundStyles();

    useEffect(() => {
        loadUser();
        if (window.fbq) {
            window.fbq('track', 'ViewContent', {
                content_name: 'Request Quote',
                content_category: 'Booking Page',
                value: 800,
                currency: 'USD'
            });
        }
        //eslint-disable-next-line
    }, []);

    return (
        <div id='request-quote' style={styles.container}>
            <Container className='pt-3'>
                <Row className="justify-content-center m-2">
                    <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
                </Row>

                <Row className="justify-content-center">
                    <p style={styles.italicText}>
                        Happy to answer any questions (901) 443-7461
                    </p>
                </Row>

                {/* <GoogleReviews /> */}

                {/* PRODUCTION Request Quote */}
                <Row className="justify-content-center">
                    <iframe
                        title="JotForm"
                        src={`https://form.jotform.com/243176354266157?email=${user && user.email ? user.email : ''}`} // Replace with your JotForm URL
                        width="100%"
                        height="600px"
                        frameBorder="0"
                        style={{ border: 'none' }}
                        allow="geolocation; microphone; camera"
                    ></iframe>
                </Row>

                {/* Development Request Quote */}
                {/* <Row className="justify-content-center">
                    <iframe
                        title="JotForm"
                        src={`https://form.jotform.com/243137760742154?name[first]=Wilson&name[last]=Horrell&email=wilsonhorrell@gmail.com&celPhone=1234567890&address[addr_line1]=123+Main+St&address[city]=City&address[state]=State&address[postal]=12345&appointment=2024-11-10+4%3A00+PM&vehicleVin=1HGCM82633A123456&vehicleInfo=2000+Dodge+Ram+2500&engineType=5.9L+Cummins&transmissionType=Automatic&tuningGoal=Performance&primaryUse=Daily+Driving`}

                        width="100%"
                        height="600px"
                        frameBorder="0"
                        style={{ border: 'none' }}
                        allow="geolocation; microphone; camera"
                    ></iframe>
                </Row> */}


                <br />
                <Row className="justify-content-center">
                    <p style={styles.italicText}>
                        Feel free to reach out via text or phone at <a href="tel:9014437461" style={{ color: "inherit", textDecoration: "none" }}>(901) 443-7461</a>.
                    </p>
                </Row>
                <AddressComponent />
                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>

                <NavigationLinks user={user} currentPage="request-quote" />
            </Container>
        </div>
    )
};

export default RequestQuote;
