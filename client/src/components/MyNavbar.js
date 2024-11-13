import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import RegistrationContext from '../context/registration/registrationContext';

import dieselDownIcon from "../img/profile_avatar.jpg";

const MyNavbar = () => {
  const registrationContext = useContext(RegistrationContext);
  const { logout, user } = registrationContext;
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <Navbar className="color-nav" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/">
        <img
          src={dieselDownIcon}
          alt="Diesel Down"
          height="40" // Adjust height or width as needed
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {currentPath !== "/" && <Nav.Link as={Link} to="/">Home</Nav.Link>}

          {!user.isAuthenticated && currentPath !== "/login" && (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}

          {user.isAuthenticated && currentPath !== "/dashboard" && (
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          )}

          {currentPath !== "/more-info" && (
            <Nav.Link as={Link} to="/more-info">More Info</Nav.Link>
          )}

          {currentPath !== "/how-it-works" && (
            <Nav.Link as={Link} to="/how-it-works">How It Works</Nav.Link>
          )}

          {currentPath !== "/book-dyno" && (
            <Nav.Link as={Link} to={user && user.isAuthenticated ? "/book-dyno" : "/login"}>
              Book a Dyno
            </Nav.Link>
          )}

          {currentPath !== "/about-us" && (
            <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
          )}

          {currentPath !== "/contact-us" && (
            <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
          )}

          {user.isAuthenticated && currentPath !== "/" && (
            <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
