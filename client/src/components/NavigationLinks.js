import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";

const NavigationLinks = ({ user, currentPage }) => {
    return (
        <Row className="justify-content-center m-4">
            {currentPage !== "landing" && (
                <Link to="/" className="custom-link">
                    Home
                </Link>
            )}

            {currentPage !== "Cummins-Tuning" && (
                <Link to="/Cummins-Tuning" className="custom-link">
                    Cummins Tuning
                </Link>
            )}

            {currentPage !== "Powerstroke-Tuning" && (
                <Link to="/Powerstroke-Tuning" className="custom-link">
                    Powerstroke Tuning
                </Link>
            )}

            {currentPage !== "Duramax-Tuning" && (
                <Link to="/Duramax-Tuning" className="custom-link">
                    Duramax Tuning
                </Link>
            )}

            {currentPage !== "GasTuning" && (
                <Link to="/GasTuning" className="custom-link">
                    Gas Tuning
                </Link>
            )}

            {currentPage !== "Dyno-Testing" && (
                <Link to="/Dyno-Testing" className="custom-link">
                    Dyno Testing
                </Link>
            )}


            {/* {currentPage !== "dashboard" && (
                <Link to="/dashboard" className="custom-link">
                    Dashboard
                </Link>

            )} */}

            {/* {currentPage !== "home2" && (
                <Link to="/home2" className="custom-link">
                    Home2
                </Link>
            )} */}

            {/* {currentPage !== "more-info" && (
                <Link to="/more-info" className="custom-link">
                    More Info
                </Link>
            )} */}

            {/* {currentPage !== "how-it-works" && (
                <Link to="/how-it-works" className="custom-link">
                    How It Works
                </Link>
            )} */}


            {/* {currentPage !== "request-quote" &&
                <Link to="/request-quote" className="custom-link">
                    Request Quote
                </Link>
            }

            {currentPage !== "request-info" &&
                <Link to="/request-info" className="custom-link">
                    Request Info
                </Link>
            } */}

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

            {currentPage !== "blog" && (
                <Link to="/blog" className="custom-link">
                    Blog
                </Link>
            )}

            {/* {user && user.isAuthenticated && currentPage !== "logout" && (
                <Link to="/logout" className="custom-link">
                    Logout
                </Link>
            )} */}
        </Row>
    );
};

export default NavigationLinks;
