import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import NavigationLinks from "../NavigationLinks";
import 'react-phone-input-2/lib/style.css';
import RegistrationContext from '../../context/registration/registrationContext';

import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";

export const options = [
    {
        name: 'Dyno Run',
        descr: "3 Runs at dyno",
        price: 220,
        id: 100
    },
    {
        name: "Custom Tuning (per tune)",
        descr: "Single tune based off dyno results. Price includes dyno runs pre and post tuning",
        price: 350,
        id: 102
    },
    {
        name: "EFI Auto Cal",
        descr: "Device allowing you to load different tunes as well as have us make adjustments and create new tunes.",
        price: 650,
        id: 103
    },
];

const BookDyno = ({ history }) => {
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;

    const styles = getBackgroundStyles();


    console.log("bookdyno: ", { user })

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    if (!user || !user.isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <div id='book-dyno' style={styles.container}>
            <Container className='pt-3'>
                <Row className="justify-content-center m-2">
                    <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
                </Row>
                <Row className="justify-content-center m-2">
                    <h1>Book Your Dyno Session</h1>
                </Row>
                <Row className="justify-content-center">
                    <p style={styles.italicText}>
                        If you prefer, you can always just call or text. <br /> Happy to answer any questions (901) 443-7461
                    </p>
                </Row>

                {/* PRODUCTION Book Dyno */}
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
                        Feel free to reach out via text or phone at (901) 443-7461.
                    </p>
                </Row>
                <NavigationLinks user={user} currentPage="book-dyno" />
            </Container>
        </div>
    )
};

export default BookDyno;
