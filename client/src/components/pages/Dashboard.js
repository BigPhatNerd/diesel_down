import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Accordion, Card, Button } from 'react-bootstrap';
import NavigationLinks from "../NavigationLinks";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import { useHistory } from 'react-router-dom';
import RegistrationContext from '../../context/registration/registrationContext';
import SocialMediaLinks from "./SocialMediaLinks";

const Dashboard = () => {
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;
    const [expanded, setExpanded] = useState(null);
    const history = useHistory();

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    const styles = getBackgroundStyles();

    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index); // Toggle expansion
    };

    return (
        <div id='cover' style={styles.container}>
            <Container className='pt-3'>
                <Row className="justify-content-center m-2">
                    <img
                        src={logo}
                        alt="Diesel Down Logo"
                        style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }}
                    />
                </Row>

                {user?.isAuthenticated ? (
                    <>
                        <Row className="justify-content-center m-3">
                            <h3>Welcome {user?.name}</h3>
                        </Row>

                        <Row className="justify-content-center m-3">
                            <h4>Your Appointments</h4>
                        </Row>

                        {user?.appointments && user.appointments.length > 0 ? (
                            user.appointments.map((appointment, index) => {
                                const formattedDate = new Date(appointment.appointmentDetails.date).toLocaleDateString('en-US', {
                                    weekday: 'long', // Display full day name
                                    year: 'numeric',
                                    month: 'long', // Display full month name
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                });

                                return (
                                    <Card key={index} className="mb-3">
                                        <Card.Header>
                                            <Row
                                                style={{
                                                    ...styles.row,
                                                    ...(expanded === index ? styles.rowHover : {}),
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.rowHover.backgroundColor}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.row.backgroundColor}
                                                onClick={() => toggleExpand(index)}
                                            >
                                                <strong>
                                                    {`${formattedDate} - ${appointment.vehicle.info}`}
                                                </strong>
                                            </Row>
                                        </Card.Header>
                                        {expanded === index && (
                                            <Card.Body>
                                                <p><strong>Name:</strong> {appointment.name.first} {appointment.name.last}</p>
                                                <p><strong>Email:</strong> {appointment.email}</p>
                                                <p><strong>Phone:</strong> {appointment.phone}</p>
                                                <p><strong>Address:</strong> {appointment.address.line1}, {appointment.address.city}, {appointment.address.state}, {appointment.address.postal}</p>
                                                <p><strong>Vehicle:</strong> {appointment.vehicle.info}</p>
                                                <p><strong>Engine Type:</strong> {appointment.vehicle.engineType}</p>
                                                <p><strong>Transmission Type:</strong> {appointment.vehicle.transmissionType}</p>
                                                <p><strong>Tuning Goal:</strong> {appointment.tuningGoal}</p>
                                                <p><strong>Primary Use:</strong> {appointment.primaryUse}</p>
                                                <p><strong>Known Issues:</strong> {appointment.knownIssues || 'None'}</p>
                                            </Card.Body>
                                        )}
                                    </Card>
                                );
                            })
                        ) : (
                            <Row className="justify-content-center m-3">
                                <p>🥹 You have no appointments 🥹</p>
                            </Row>
                        )}
                    </>
                ) : (
                    <div>
                        <Row className="justify-content-center m-3 text-center">
                            <p>
                                If you want access to your previous appointment information,
                                <br />please log in or sign up.
                            </p>

                        </Row>
                        <Row className="justify-content-center m-4">
                            <Button
                                style={styles.button}
                                className="custom-button"
                                onClick={() => history.push("/login")}
                            >
                                Register or login
                            </Button>
                        </Row>
                    </div>
                )}
                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>
            </Container>
        </div>
    );
};


export default Dashboard;
