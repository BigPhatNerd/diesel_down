import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";

const NavigationLinks = ({ user, currentPage }) => {
    return (
        <Row className="justify-content-center m-4">
            {/* Conditionally render the links based on the current page */}
            <Link to="/" className="custom-link">
                Home
            </Link>
            {/* Conditionally render the dashboard or login link based on authentication */}
            {user && user.isAuthenticated ? (
                <Link to="/dashboard" className="custom-link">
                    Dashboard
                </Link>
            ) : (
                <Link to="/login" className="custom-link">
                    Login
                </Link>
            )}


            <Link to="/more-info" className="custom-link">
                More Info
            </Link>


            <Link to="/how-it-works" className="custom-link">
                How It Works
            </Link>


            <Link to="/book-dyno" className="custom-link">
                Book a Dyno
            </Link>


            <Link to="/about-us" className="custom-link">
                About Us
            </Link>


            <Link to="/contact-us" className="custom-link">
                Contact Us
            </Link>

            {user && user.isAuthenticated && (
                <Link to="/logout" className="custom-link">
                    Logout
                </Link>
            )}



        </Row>
    );
};

export default NavigationLinks;
