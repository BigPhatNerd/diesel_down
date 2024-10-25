import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RegistrationContext from '../../../context/registration/registrationContext';
import { Container, Row, Button, Form } from 'react-bootstrap';
import NavigationLinks from "../../NavigationLinks";
import { getBackgroundStyles } from "../../helpers/backgroundStyles";
import logo from "../../../img/transparent_white_red.png";
const Login = () => {
  const registrationContext = useContext(RegistrationContext);
  const { user, login, setAlert } = registrationContext;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const styles = getBackgroundStyles();
  const { email, password, } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    }
    else {
      login(email, password)
    }

  }
  if (user.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div style={styles.container}>
      <Container className='pt-3'>
        <Row className="justify-content-center m-2">
          <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
        </Row>
        <Row className="justify-content-center m-2">
          <h1>Sign In </h1>
        </Row>

        <Form onSubmit={e => onSubmit(e)}>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={e => onChange(e)} value={email} name="email" type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={e => onChange(e)} value={password} name="password" type="password" placeholder="Enter password" />
          </Form.Group>
          <Button style={styles.button} type="submit" className="custom-button">
            Submit
          </Button>
        </Form>
        <Row className="ml-2 mt-2">
          <p>Don't have an account? <Link className='custom-link' to='/user-registration'>Create Account</Link></p>
        </Row>
        <NavigationLinks user={user} currentPage="login" />
      </Container>
    </div>)
}

export default Login;