import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
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

          <NavDropdown title="Services" id="services-dropdown">
            <NavDropdown.Item as={Link} to="/Cummins-Tuning" onClick={handleLinkClick}>
              Cummins Tuning
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Powerstroke-Tuning" onClick={handleLinkClick}>
              Powerstroke Tuning
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Duramax-Tuning" onClick={handleLinkClick}>
              Duramax Tuning
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/GasTuning" onClick={handleLinkClick}>
              Gas Tuning
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Dyno-Testing" onClick={handleLinkClick}>
              Dyno Testing
            </NavDropdown.Item>
          </NavDropdown>

          {/* {currentPath !== "/home2" && (
            <Nav.Link as={Link} to="/home2" onClick={handleLinkClick}>Home2</Nav.Link>
          )} */}

          {/* {!user.isAuthenticated && currentPath !== "/login" && (
            <Nav.Link as={Link} to="/login" onClick={handleLinkClick}>Login</Nav.Link>
          )} */}

          {/* {currentPath !== "/dashboard" && (
            <Nav.Link as={Link} to="/dashboard" onClick={handleLinkClick}>Dashboard</Nav.Link>
          )} */}

          {/* {currentPath !== "/more-info" && (
            <Nav.Link as={Link} to="/more-info" onClick={handleLinkClick}>More Info</Nav.Link>
          )} */}

          {/* {currentPath !== "/how-it-works" && (
            <Nav.Link as={Link} to="/how-it-works" onClick={handleLinkClick}>How It Works</Nav.Link>
          )} */}

          {/* {currentPath !== "/request-quote" && (
            <Nav.Link as={Link} to="/request-quote" onClick={handleLinkClick}>Request Quote</Nav.Link>
          )} */}

          {/* {currentPath !== "/request-info" && (
            <Nav.Link as={Link} to="/request-info" onClick={handleLinkClick}>Request Info</Nav.Link>
          )} */}

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
