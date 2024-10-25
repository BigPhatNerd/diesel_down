import React, { useEffect, useContext } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks"; // Import the new component
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";

const Landing = () => {
  const registrationContext = useContext(RegistrationContext);
  const { loadUser, user } = registrationContext;

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const styles = getBackgroundStyles();

  return (
    <div id="cover" style={styles.container}>
      <Container className="pt-3">
        <Row className="justify-content-center m-2">
          <img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
        </Row>

        <Row className="justify-content-center m-2">
          <h1>Welcome to Diesel Down – Where Power Meets Performance.</h1>
        </Row>
        <Row className="justify-content-center m-2">
          <h2>Bringing Dyno Testing & Precision Tuning to North Mississippi</h2>
        </Row>

        <Row className="justify-content-center m-2">
          <p>
            At Diesel Down, we’re bringing world-class dyno testing data and analytics right to your backyard. We’ve got the biggest eddy brake on the planet along with the legendary Dynocom 15,000 Series chassis dynometer. This machine is built for those serious about their truck and passionate about performance.
          </p>
        </Row>

        <Row className="justify-content-center m-2">
          <ul style={{ listStylePosition: 'outside', paddingLeft: '20px', textAlign: 'left' }}>
            <li>💪 Handles up to 14,000 lbs – That’s a pretty big boy.</li>
            <li>⚡ 2400 HP Capacity – That’s a shit-ton of power.</li>
            <li>🔥 15,000 ft-lbs of Torque – Get the facts on what your truck can really do.</li>
            <li>🏆 World’s Largest Eddy Brake – The biggest brake there is, capable of handling over 850+ HP and 3000 ft-lbs of torque.</li>
          </ul>
        </Row>

        <Row className="justify-content-center m-2">
          <p style={styles.italicText}>
            "You can't beat power, you gotta love speed, and you can't argue data."
          </p>
        </Row>

        <Row className="justify-content-center m-2">
          <h3>Feature Highlights:</h3>
        </Row>
        <Row className="justify-content-center m-2">
          <p>
            <strong>Real-Time Analytics for Real Drivers:</strong> We’ve combined raw power with precision. Our state-of-the-art 15,000 Series chassis gives you real-world performance data so you can fine-tune your engine to perfection.
          </p>
        </Row>
        <Row className="justify-content-center m-2">
          <p>
            <strong>Get the Facts</strong> – Whether it’s horsepower, torque, throttle response, or fuel efficiency - we provide the data that tells you where you are so we can get you where you want to be.
          </p>
        </Row>
        <Row className="justify-content-center m-2">
          <p>
            <strong>Custom Tuning – Tailored to You: &nbsp;
            </strong> At Diesel Down, we don’t do “one-size-fits-all.” Every vehicle is unique, and so is our approach - that's why we bought the damn thing. From street performance to drag racing to everyday use or heavy-duty work, we create a custom tuning solution that meets your exact needs. And we’re not just passionate about it – we’re <em>obsessive</em>. You won't leave our shop until the data says so.
          </p>
        </Row>

        <Row className="justify-content-center m-4">
          <Link to="/book-dyno" style={{ textDecoration: 'none' }}>
            <Button style={styles.button} className="custom-button">
              Book Your Dyno Session Today!
            </Button>
          </Link>
        </Row>

        <Row className="justify-content-center m-2">
          <p style={styles.italicText}>
            Have Questions? Let’s Chat. <br />Call or Text Us at (901) 921-3757
          </p>
        </Row>

        {/* Use the new NavLinks component */}
        <NavigationLinks user={user} currentPage="landing" />
      </Container>
    </div>
  );
};

export default Landing;
