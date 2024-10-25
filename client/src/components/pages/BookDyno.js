import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Button, Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import NavigationLinks from "../NavigationLinks";
import 'react-phone-input-2/lib/style.css';
import RegistrationContext from '../../context/registration/registrationContext';
import { getBackgroundStyles } from "../helpers/backgroundStyles";

export const options = [
    {
        name: 'Dyno Run',
        descr: "3 Runs at dyno",
        price: 600,
        id: 100
    },
    {
        name: "Dyno Reel",
        descr: "Short video of dyno experience",
        price: 0,
        id: 101
    },
    {
        name: "Custom Tune",
        descr: "Single tune based off dyno results",
        price: 100,
        id: 102
    },
    {
        name: "Post Tune Dyno Run",
        descr: "Second dyno run after tune to see the improvements",
        price: 300,
        id: 103
    },
];

const BookDyno = ({ history }) => {
    const registrationContext = useContext(RegistrationContext);
    const { getCurrentProfile, profile, loading, addTeamMembers, user } = registrationContext;

    const styles = getBackgroundStyles();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        celPhone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        dob: '',
        vehicleVIN: '',
        vehicleInfoAndUpgrades: '',
        vehiclePics: [],
        vehicleVideos: [],
        desiredMusic: ''
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhone = e => {
        setFormData({ ...formData, celPhone: e });
    };

    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, [type]: files });
    };

    const handleOptionChange = (e, option) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedOptions([...selectedOptions, option]);
            setTotalPrice(totalPrice + option.price);
        } else {
            setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
            setTotalPrice(totalPrice - option.price);
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        addTeamMembers(formData, history);
    };

    useEffect(() => {
        getCurrentProfile();
        //eslint-disable-next-line
    }, []);

    return loading && profile === null ? (
        <Redirect to='/dashboard' />
    ) : (
        <div id='book-dyno' style={styles.container}>
            <Container className='pt-3'>
                <Row className="justify-content-center m-2">
                    <h1>Book Your Dyno Session</h1>
                </Row>
                <Row className="justify-content-center">
                    <p style={styles.italicText}>
                        If you prefer, you can always just call or text. We can handle this bullshit later. <br />(901) 921-3757
                    </p>
                </Row>
                <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.firstName} name="firstName" type="text" placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.lastName} name="lastName" type="text" placeholder="Enter Last Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.email} name="email" type="email" placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCellPhone">
                        <Form.Label>Cell Phone</Form.Label>
                        <PhoneInput country='us' onChange={e => handlePhone(e)} value={formData.celPhone} name="celPhone" />
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.address} name="address" type="text" placeholder="Enter Address" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.city} name="city" type="text" placeholder="Enter City" />
                    </Form.Group>

                    <Form.Group controlId="formBasicState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as='select' onChange={e => onChange(e)} value={formData.state} name="state">
                            <option value="">Select State</option>
                            {/* Add state options here */}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.zip} name="zip" type="text" placeholder="Enter Zip Code" />
                    </Form.Group>

                    <Form.Group controlId="formBasicDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.dob} name="dob" type="date" />
                    </Form.Group>

                    <Form.Group controlId="formBasicVehicleVIN">
                        <Form.Label>Vehicle VIN</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.vehicleVIN} name="vehicleVIN" type="text" placeholder="Enter Vehicle VIN" />
                    </Form.Group>

                    <Form.Group controlId="formBasicVehicleInfo">
                        <Form.Label>Vehicle Info & Upgrades</Form.Label>
                        <Form.Control as="textarea" rows={4} onChange={e => onChange(e)} value={formData.vehicleInfoAndUpgrades} name="vehicleInfoAndUpgrades" placeholder="Enter details about vehicle upgrades and modifications" />
                    </Form.Group>

                    <Form.Group controlId="formBasicVehiclePics">
                        <Form.Label>Upload Vehicle Pics (JPEG, PNG)</Form.Label>
                        <Form.Control onChange={e => handleFileChange(e, 'vehiclePics')} name="vehiclePics" type="file" accept="image/jpeg,image/png" multiple />
                    </Form.Group>

                    <Form.Group controlId="formBasicVehicleVideos">
                        <Form.Label>Upload Vehicle Videos (MP4, AVI)</Form.Label>
                        <Form.Control onChange={e => handleFileChange(e, 'vehicleVideos')} name="vehicleVideos" type="file" accept="video/mp4,video/avi" multiple />
                    </Form.Group>

                    <Form.Group controlId="formBasicDesiredMusic">
                        <Form.Label>Desired Music (Artist and Song)</Form.Label>
                        <Form.Control onChange={e => onChange(e)} value={formData.desiredMusic} name="desiredMusic" type="text" placeholder="Enter desired background music for your video" />
                    </Form.Group>

                    {/* Radio Buttons for Options */}
                    <Form.Group controlId="formOptions">
                        <Form.Label>Select Services:</Form.Label>
                        <div style={styles.serviceOptions}>
                            {options.map(option => (
                                <div key={option.id} style={styles.serviceOptionItem}>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedOptions.some(o => o.id === option.id)}
                                        onChange={(e) => handleOptionChange(e, option)}
                                    />
                                    <span style={styles.serviceLabel}>
                                        {`${option.name} - $${option.price}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Form.Group>

                    {/* Display Total Price */}
                    <Row className="justify-content-center mb-3">
                        <h5>Total Price: ${totalPrice}</h5>
                    </Row>

                    <Button style={styles.button} type="submit" className="custom-button">
                        Submit
                    </Button>
                </Form>
                <NavigationLinks user={user} currentPage="book-dyno" />
            </Container>
        </div >
    );
};

export default BookDyno;
