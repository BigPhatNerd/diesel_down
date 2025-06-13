import React, { useContext, useState } from 'react';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
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
  });
  const { email, password } = formData;
  const location = useLocation();
  const history = useHistory();
  const styles = getBackgroundStyles();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      await login(email, password);
      const redirectTo = location.state?.from || '/request-quote'; // Fallback to default
      history.push(redirectTo);
    }
  };

  if (user.isAuthenticated && user.email) {
    return <Redirect to={location.state?.from || '/request-quote'} />;
  }

  return (
    <div style={styles.container}>
      <Container className='pt-3'>
        <Row className="justify-content-center m-2">
          <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
        </Row>
        <Row className="justify-content-center m-2">
          <p style={styles.italicText}>
            Don’t hesitate to reach out. <br />Call or Text Us at (901) 443-7461
          </p>
        </Row>
        <Row className="justify-content-center m-2">
          <h1>Sign In</h1>
        </Row>

        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={onChange}
              value={email}
              name="email"
              type="text"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={onChange}
              value={password}
              name="password"
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          <Button style={styles.button} type="submit" className="custom-button">
            Submit
          </Button>
        </Form>
        <Row className="ml-2 mt-2">
          <p>
            Don't have an account?{' '}
            <Link
              className="custom-link"
              to={{
                pathname: '/user-registration',
                state: { from: location.state?.from || '/' }, // Pass `from` state
              }}
            >
              Create Account
            </Link>
          </p>
        </Row>
        <NavigationLinks user={user} currentPage="login" />
      </Container>
    </div>
  );
};

export default Login;
