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


const VehiclInfo = ({ history }) => {
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;

    const styles = getBackgroundStyles();

    useEffect(() => {
        loadUser();
        if (window.fbq) {
            window.fbq('track', 'ViewContent', {
                content_name: 'Book Dyno',
                content_category: 'Booking Page',
                value: 800,
                currency: 'USD'
            });
        }
        //eslint-disable-next-line
    }, []);

    return (
        <div id='vehicle-info' style={styles.container}>
            <Container className='pt-3'>
                <Row className="justify-content-center m-2">
                    <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
                </Row>
                <Row className="justify-content-center m-2">
                    <p style={{ fontStyle: 'italic', textAlign: 'center', maxWidth: '700px' }}>
                        Dyno + custom dyno-tune: <strong>$800</strong><br />
                        Hardware/Credits (if needed) is additional — ranges from <strong>$100–$400</strong>.
                    </p>
                </Row>
                <Row className="justify-content-center">
                    <p style={styles.italicText}>
                        Happy to answer any questions (901) 443-7461
                    </p>
                </Row>

                {/* <GoogleReviews /> */}

                {/* PRODUCTION Book Dyno */}
                <Row className="justify-content-center">
                    <iframe
                        title="JotForm"
                        src="https://form.jotform.com/250867077755167"
                        width="100%"
                        height="600px"
                        frameBorder="0"
                        style={{ border: 'none' }}
                        allow="geolocation; microphone; camera"
                    ></iframe>
                </Row>

                {/* Development Book Dyno */}
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

                <NavigationLinks user={user} currentPage="book-dyno" />
            </Container>
        </div>
    )
};

export default VehiclInfo;
