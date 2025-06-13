import React, { useEffect, useContext, useState } from "react";
import TuningCatalogue from './TuningCatalogue';
import { Container, Row, Button, Collapse } from "react-bootstrap";
import { Helmet } from "react-helmet";

import RequestQuoteButton from "./RequestQuoteButton";
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import SocialMediaLinks from "./SocialMediaLinks";
import AddressComponent from "./AddressComponent";
import GoogleReviews from "./GoogleReviews";

const Landing = () => {
  const registrationContext = useContext(RegistrationContext);
  const { loadUser, user } = registrationContext;

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const styles = getBackgroundStyles();

  return (
    <><Helmet>
      <title>Diesel Tuning & Dyno Services in Mississippi | Diesel Down</title>
      <meta
        name="description"
        content="Get more power, better mileage, and real dyno data. We tune Cummins, Powerstroke, Duramax, and more. Call Diesel Down today for performance tuning!"
      />
    </Helmet>


      <div id="cover" style={styles.container} >
        <Container className="pt-3">
          <Row className="justify-content-center m-2">
            <img
              src={logo}
              alt="Diesel Down Logo"
              style={{ maxWidth: "60%", height: "auto", marginBottom: "20px" }}
            />
          </Row>

          <Row className="justify-content-center">
            <GoogleReviews widgetId="elfsight-app-80158f93-3ced-4d95-8b99-2fdf3a45c161" />
          </Row>

          <Row className="justify-content-center m-4">
            <TuningCatalogue />
          </Row>

          <Row className="justify-content-center m-2">
            <h1 style={{ fontSize: "2rem", textAlign: "center", color: "#fff" }}>
              Diesel Tuning and Dyno Services in Mississippi
            </h1>

          </Row>

          <Row className="justify-content-center m-2">
            <p>
              <strong>We Tune More Than Diesels:</strong> While Diesel Down was born out of a passion for tuning Cummins, Powerstroke, and Duramax, we don’t stop there. We dyno and tune gas trucks, street cars, muscle cars, and modern performance vehicles too. If it runs, we’ll get the data — and then we’ll make it better.
            </p>
          </Row>

          <Row className="justify-content-center m-2">
            <p>
              At Diesel Down, we’re bringing world-class dyno testing data and
              analytics right to your backyard.{" "}

            </p>
          </Row>
          {!expanded && (
            <Row className="justify-content-center m-2">
              <strong>...</strong>
              <Button
                variant="link"
                onClick={() => setExpanded(true)}
                style={{
                  padding: 0,
                  marginLeft: "5px",
                  color: "#fff",
                  textDecoration: "underline",
                }}
              >
                Read More
              </Button>
            </Row>
          )}



          <Collapse in={expanded}>
            <div>
              <Row className="justify-content-center m-2">
                <p>
                  We’ve got the biggest eddy brake on the planet along with the
                  legendary Dynocom 15,000 Series chassis dynometer. This machine
                  is built for those serious about their truck and passionate
                  about performance.
                </p>
              </Row>

              <Row className="justify-content-center m-2">
                <ul
                  style={{
                    listStylePosition: "outside",
                    paddingLeft: "20px",
                    textAlign: "left",
                  }}
                >
                  <li>Handles up to 14,000 lbs – That’s a pretty big boy.</li>
                  <li>
                    <strong>DC AFM Module:</strong> Industry-leading data analysis
                    for accurate adjustments.
                  </li>
                  <li>
                    <strong>CAN Complete Module:</strong> Advanced integration
                    with your truck’s onboard systems for seamless tuning.
                  </li>
                  <li>
                    <strong>Opacity Meter:</strong> Measure and optimize emissions
                    without compromising power.
                  </li>
                  <li>2400 HP Capacity – That’s a lot of power.</li>
                  <li>
                    15,000 ft-lbs of Torque – Get the facts on what your truck can
                    really do.
                  </li>
                  <li>
                    World’s Largest Eddy Brake – The biggest brake there is,
                    capable of handling over 850+ HP and 3000 ft-lbs of torque.
                  </li>
                </ul>
              </Row>

              <Row className="justify-content-center m-2">
                <p style={styles.italicText}>"You can't argue data."</p>
              </Row>

              <Row className="justify-content-center m-2">
                <h3>Feature Highlights:</h3>
              </Row>

              <Row className="justify-content-center m-2">
                <p>
                  <strong>Real-Time Analytics for Real Drivers:</strong> We’ve
                  combined raw power with precision. Our state-of-the-art 15,000
                  Series chassis gives you real-world performance data so you can
                  fine-tune your engine to perfection.
                </p>
              </Row>

              <Row className="justify-content-center m-2">
                <p>
                  <strong>Get the Facts</strong> – Whether it’s horsepower, torque,
                  throttle response, or fuel efficiency - we provide the data that
                  tells you where you are so we can get you where you want to be.
                </p>
              </Row>

              <Row className="justify-content-center m-2">
                <p>
                  <strong>
                    Specialized Tuning for Cummins (Dodge/RAM), Duramax
                    (GMC/Chevy), and Power Stroke (Ford):
                  </strong>{" "}
                  While we dyno test most all vehicles, we focus on delivering
                  efficient and powerful custom tunes specifically for Cummins,
                  Powerstroke and Duramax engines. With our expertise in these
                  brands, we ensure that your engine reaches its peak performance.
                  Armed with our dyno data, you get the insights you need for a
                  smoother, more powerful ride that’s built for your goals.
                </p>
              </Row>

              <Row className="justify-content-center m-2">
                <p>
                  <strong>Custom Tuning – Tailored to You: &nbsp;</strong> At
                  Diesel Down, we know that every vehicle is unique, and so is our
                  approach - that's why we bought the damn thing. From street
                  performance to towing to everyday use or heavy-duty work, we
                  create a custom tuning solution that meets your exact needs. And
                  we’re not just passionate about it – we’re{" "}
                  <em>obsessive</em>. You won't leave our shop until the data says
                  so.
                </p>
              </Row>
            </div>
          </Collapse>
          {expanded && <Row className="justify-content-center m-2">
            <Button
              variant="link"
              onClick={() => setExpanded(false)}
              style={{
                padding: 0,
                marginTop: "10px",
                color: "#fff",
                textDecoration: "underline",
              }}
            >
              Read Less
            </Button>
          </Row>}




          <Row className="justify-content-center mt-3">
            <RequestQuoteButton style={styles.button} />
            <Button
              href="tel:9014437461"
              className="ms-3"
              variant="outline-light"
            >📞 (901) 443-7461</Button>
          </Row>


          <Row className="justify-content-center m-2">
            <p style={styles.italicText}>
              Have Questions? Let’s Chat. <br />
              Call or Text Us at{" "}
              <a
                href="tel:9014437461"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                (901) 443-7461
              </a>
              .
            </p>
          </Row>

          <AddressComponent />

          <Row className="justify-content-center m-4">
            <SocialMediaLinks />
          </Row>

          <NavigationLinks user={user} currentPage="landing" />
        </Container>
      </div>
    </>
  );
};

export default Landing;
