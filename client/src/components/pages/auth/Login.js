import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RegistrationContext from '../../../context/registration/registrationContext';
import { Container, Row, Button, Form } from 'react-bootstrap';
import background from '../../../img/diesel_down_black.jpg';

const Login = () => {
  const registrationContext = useContext(RegistrationContext);
  const { user, login, setAlert } = registrationContext;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const styles = {
    container: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, .9), rgba(0, 0, 0, .9)),url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    },
    button: {
      backgroundColor: '#C70C18', // Red color
      color: 'white',
      borderColor: '#C70C18',
      transition: 'background-color 0.3s, color 0.3s'
    },

  };
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
      </Container>
    </div>)
}

export default Login;