import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";

const NavigationLinks = ({ user, currentPage }) => {
    return (
        <Row className="justify-content-center m-4">
            {currentPage !== "/" && (
                <Link to="/" className="custom-link">
                    Home
                </Link>
            )}

            {user && user.isAuthenticated ? (
                currentPage !== "dashboard" && (
                    <Link to="/dashboard" className="custom-link">
                        Dashboard
                    </Link>
                )
            ) : (
                currentPage !== "login" && (
                    <Link to="/login" className="custom-link">
                        Login
                    </Link>
                )
            )}

            {currentPage !== "more-info" && (
                <Link to="/more-info" className="custom-link">
                    More Info
                </Link>
            )}

            {currentPage !== "how-it-works" && (
                <Link to="/how-it-works" className="custom-link">
                    How It Works
                </Link>
            )}

            {user && user.isAuthenticated ? (
                currentPage !== "book-dyno" && (
                    <Link to="/book-dyno" className="custom-link">
                        Book a Dyno
                    </Link>
                )
            ) : (
                currentPage !== "login" && (
                    <Link to="/login" className="custom-link">
                        Book a Dyno
                    </Link>
                )
            )}

            {currentPage !== "about-us" && (
                <Link to="/about-us" className="custom-link">
                    About Us
                </Link>
            )}

            {currentPage !== "contact-us" && (
                <Link to="/contact-us" className="custom-link">
                    Contact Us
                </Link>
            )}

            {user && user.isAuthenticated && currentPage !== "logout" && (
                <Link to="/logout" className="custom-link">
                    Logout
                </Link>
            )}
        </Row>
    );
};

export default NavigationLinks;
