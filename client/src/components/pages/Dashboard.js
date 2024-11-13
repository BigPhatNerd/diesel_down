import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import NavigationLinks from "../NavigationLinks";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";

import RegistrationContext from '../../context/registration/registrationContext';

const Dashboard = () => {
    const registrationContext = useContext(RegistrationContext)
    const {
        loadUser,
        profile,
        user,
    } = registrationContext

    useEffect(() => {
        loadUser()
        //eslint-disable-next-line
    }, [])
    console.log("in dashboard", { user, profile })
    const styles = getBackgroundStyles();

    return (
        <div id='cover' style={styles.container}>
            <Container className='pt-3'>
                <Row className="justify-content-center m-2">
                    <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
                </Row>
                <Row className="justify-content-center m-3">
                    <h3>Welcome {user?.name}</h3>
                </Row>

                <NavigationLinks user={user} currentPage="dashboard" />
            </Container>
        </div>
    )
}

export default Dashboard