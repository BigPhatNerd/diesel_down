import React, { useContext, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import RegistrationContext from '../context/registration/registrationContext';

import dieselDownIcon from "../img/profile_avatar.jpg";

const MyNavbar = () => {
  const registrationContext = useContext(RegistrationContext);
  const { logout, user } = registrationContext;
  const location = useLocation();

  const currentPath = location.pathname;
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    setExpanded(false); // Collapse the menu
  };

  return (
    <Navbar
      className="color-nav"
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={(isOpen) => setExpanded(isOpen)}
    >
      <Navbar.Brand as={Link} to="/">
        <img
          src={dieselDownIcon}
          alt="Diesel Down"
          height="40" // Adjust height or width as needed
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {currentPath !== "/" && (
            <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
          )}

          {!user.isAuthenticated && currentPath !== "/login" && (
            <Nav.Link as={Link} to="/login" onClick={handleLinkClick}>Login</Nav.Link>
          )}

          {currentPath !== "/dashboard" && (
            <Nav.Link as={Link} to="/dashboard" onClick={handleLinkClick}>Dashboard</Nav.Link>
          )}

          {currentPath !== "/more-info" && (
            <Nav.Link as={Link} to="/more-info" onClick={handleLinkClick}>More Info</Nav.Link>
          )}

          {currentPath !== "/how-it-works" && (
            <Nav.Link as={Link} to="/how-it-works" onClick={handleLinkClick}>How It Works</Nav.Link>
          )}

          {currentPath !== "/book-dyno" && (
            <Nav.Link as={Link} to="/book-dyno" onClick={handleLinkClick}>Schedule Dyno Tuning</Nav.Link>
          )}

          {currentPath !== "/about-us" && (
            <Nav.Link as={Link} to="/about-us" onClick={handleLinkClick}>About Us</Nav.Link>
          )}

          {currentPath !== "/contact-us" && (
            <Nav.Link as={Link} to="/contact-us" onClick={handleLinkClick}>Contact Us</Nav.Link>
          )}
          {currentPath !== "/blog" && (
            <Nav.Link as={Link} to="/blog" onClick={handleLinkClick}>Blog</Nav.Link>
          )}

          {user.isAuthenticated && currentPath !== "/" && (
            <Nav.Link as={Link} to="/" onClick={() => { handleLinkClick(); logout(); }}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
