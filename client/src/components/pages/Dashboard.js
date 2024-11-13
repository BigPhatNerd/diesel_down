import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Accordion, Card, Button } from 'react-bootstrap';
import NavigationLinks from "../NavigationLinks";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import RegistrationContext from '../../context/registration/registrationContext';

const Dashboard = () => {
    const registrationContext = useContext(RegistrationContext);
    const { loadUser, user } = registrationContext;
    const [expanded, setExpanded] = useState(null); // Track which appointment is expanded

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
                <Row className="justify-content-center m-3">
                    <h3>Welcome {user?.name}</h3>
                </Row>

                <Row className="justify-content-center m-3">
                    <h4>Your Appointments</h4>
                </Row>
                {user?.appointments?.map((appointment, index) => {
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
                })}



                <NavigationLinks user={user} currentPage="dashboard" />
            </Container>
        </div>
    );
};

export default Dashboard;
