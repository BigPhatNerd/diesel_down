import React, { useState, useContext } from "react";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import { Container, Col, Button, Form, Row } from "react-bootstrap";
import NavigationLinks from "../../NavigationLinks";
import { getBackgroundStyles } from "../../helpers/backgroundStyles";
import logo from "../../../img/transparent_white_red.png";
import RegistrationContext from "../../../context/registration/registrationContext";

const UserRegistration = () => {
  const registrationContext = useContext(RegistrationContext);
  const { user, register, setAlert, setEmail, setName } = registrationContext;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const location = useLocation();
  const history = useHistory();
  const styles = getBackgroundStyles();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "dark");
    } else {
      setEmail(email);
      setName(name);
      await register({ name, email, password });
      const redirectTo = location.state?.from || '/request-quote'; // Fallback to default
      history.push(redirectTo);
    }
  };

  if (user.isAuthenticated) {
    return <Redirect to={location.state?.from || '/request-quote'} />;
  }

  return (
    <div id="cover" style={styles.container}>
      <Container>
        <Row className="justify-content-center m-2">
          <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
        </Row>
        <Row className="justify-content-center m-2">
          <h1>User Registration</h1>
        </Row>
        <Row className="justify-content-center m-2">
          <p style={styles.italicText}>
            Logins not your thing?<br /> (They annoy me too.) <br />Call or Text Us at (901) 443-7461
          </p>
        </Row>
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                onChange={onChange}
                value={name}
                name="name"
                type="text"
                placeholder="Enter your full name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={onChange}
                value={email}
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={onChange}
                value={password}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                onChange={onChange}
                value={password2}
                name="password2"
                type="password"
                placeholder="Password confirmation"
              />
            </Form.Group>
            <Button style={styles.button} type="submit" className="custom-button">
              Submit
            </Button>
          </Form>
        </Col>
        <Row className="ml-2 mt-2">
          <p>
            Already have an account?{' '}
            <Link
              className="custom-link"
              to={{
                pathname: '/login',
                state: { from: location.state?.from || '/' }, // Pass `from` state
              }}
            >
              Sign In
            </Link>
          </p>
        </Row>
        <NavigationLinks user={user} currentPage="user-registration" />
      </Container>
    </div>
  );
};

export default UserRegistration;
