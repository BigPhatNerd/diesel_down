import React, { useState, useContext } from 'react';
import { Container, Row, Button, Form } from 'react-bootstrap';
import NavigationLinks from "../NavigationLinks";
import RegistrationContext from '../../context/registration/registrationContext';
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import SocialMediaLinks from "./SocialMediaLinks";
import AddressComponent from './AddressComponent';

const ContactUs = () => {
    const registrationContext = useContext(RegistrationContext);
    const { contactUs, setAlert, user } = registrationContext;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setAlert('Please fill in all required fields.', 'danger');
            return;
        }

        // Attempt to send the contact form
        const success = await contactUs(formData);

        if (success) {
            setFormSubmitted(true);
        }
    };

    const styles = getBackgroundStyles();



    return (
        <div id='contact-us' style={styles.container}>
            <Container className='pt-3'>
                <Row className="justify-content-center m-2">
                    <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
                </Row>
                <Row className="justify-content-center m-2">
                    <h1>Contact Us</h1>
                </Row>
                <Row className="justify-content-center">
                    <p style={styles.italicText}>
                        Have questions? We're here to help. <br />Fill out the form below, or give us a call or text at <a href="tel:9014437461" style={{ color: "inherit", textDecoration: "none" }}>(901) 443-7461</a>.
                    </p>
                </Row>
                <Row className="justify-content-center">
                    <iframe
                        title="JotForm"
                        src={"https://form.jotform.com/243177505176156"} // Replace with your JotForm URL
                        width="100%"
                        height="600px"
                        frameBorder="0"
                        style={{ border: 'none' }}
                        allow="geolocation; microphone; camera"
                    ></iframe>
                </Row>
                <AddressComponent />
                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>

                <NavigationLinks user={user} currentPage='contact-us' />
            </Container>
        </div>
    );
};

export default ContactUs;
