import React, { useState, useContext } from 'react';
import { Container, Row, Button, Form } from 'react-bootstrap';
import NavigationLinks from "../NavigationLinks";
import RegistrationContext from '../../context/registration/registrationContext';
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";

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

    if (formSubmitted) {
        return (
            <div id='contact-us' style={styles.container}>
                <Container className='pt-3'>
                    <Row className="justify-content-center m-2">
                        <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
                    </Row>
                    <Row className="justify-content-center m-2">
                        <h1>Thank You!</h1>
                    </Row>
                    <Row className="justify-content-center">
                        <p style={styles.italicText}>
                            Thank you for contacting us! We will get back to you soon.
                        </p>
                    </Row>
                    <NavigationLinks user={user} currentPage='contact-us' />
                </Container>
            </div>
        );
    }

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
                        Have questions? We're here to help. <br />Fill out the form below, or give us a call or text at (901) 443-7461.
                    </p>
                </Row>
                <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.name} name="name" type="text" placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.email} name="email" type="email" placeholder="Enter your email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.phone} name="phone" type="text" placeholder="Enter your phone number" />
                    </Form.Group>

                    <Form.Group controlId="formBasicSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.subject} name="subject" type="text" placeholder="Enter subject" />
                    </Form.Group>

                    <Form.Group controlId="formBasicMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={4} onChange={e => onChange(e)} value={formData.message} name="message" placeholder="Enter your message" />
                    </Form.Group>

                    <Button style={styles.button} type="submit" className="custom-button">
                        Submit
                    </Button>
                </Form>
                <NavigationLinks user={user} currentPage='contact-us' />
            </Container>
        </div>
    );
};

export default ContactUs;
