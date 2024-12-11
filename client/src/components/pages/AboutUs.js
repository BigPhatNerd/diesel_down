import React, { useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import BookDynoButton from "./BookDynoButton";
import NavigationLinks from "../NavigationLinks";
import RegistrationContext from "../../context/registration/registrationContext";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";
import SocialMediaLinks from "./SocialMediaLinks";
import AddressComponent from "./AddressComponent";
const AboutUs = () => {
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
                <Row className="justify-content-center m-4">
                    <h2 style={{ fontWeight: "bold" }}>How It All Started</h2>
                </Row>
                <Row className="m-3 text-left">
                    <p style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                        I’ve always had an affinity for power, speed, and noise. I drove a 1998 Dodge Ram 3500 dually for 15 years and was endlessly fascinated by its power and output. In 2007, I tuned my first diesel and was blown away by the transformation in power and responsiveness. It was a thrill to see how much of a difference tuning a diesel engine could make.
                    </p>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                        In 2011, I rebuilt my first gas engine and, after adding modifications and a tune, was less than impressed. It just didn't deliver the same thrill.
                    </p>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                        Over the years, I continued to add modifications and tunes to various diesel trucks – Ford, Chevy, and Dodge – but I always favored the Dodge (Cummins) diesel. Recently, I found an old 2000 Dodge Ram 2500 5.9L 24-valve Cummins, and I knew I had to have it.
                    </p>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                        My son and I started working on it together, turning it from a simple project into more of an obsession, a passion, and most importantly, something we loved doing together. The hours we spent under the hood weren’t just about building a badass truck; they were about bonding, learning, and creating memories that would last a lifetime.
                    </p>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                        School has never been my strong suit, but data and numbers have always come easily to me. For 20 years, I owned a landscape construction company before unexpectedly finding a new path in computer programming. My career as a software developer allowed me to dive deep into data— reading, analyzing, and manipulating it every day. Between my passion for data, speed, power, and noise, the decision was simple: buy a dyno and master the art of tuning, where I could create more of all the things I loved.
                    </p>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                        That’s how Diesel Down was born, and we’re here to make your truck perform at its absolute best as well as build relationships with our customers that allows them to feel comfortable coming to us with any questions, concerns, dad jokes or shitty riddles. I don't recall working a job I didn’t enjoy doing and Diesel Down will be no different.
                    </p>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1rem", textAlign: "right", fontStyle: "italic", marginTop: "20px" }}>
                        – Wilson Horrell
                    </p>
                </Row>
                <Row className="justify-content-center m-4">
                    <BookDynoButton style={styles.button} />
                </Row>

                <Row className="justify-content-center m-2">
                    <p style={styles.italicText}>
                        Want to learn more?  <br />Call or Text Us at <a href="tel:9014437461" style={{ color: "inherit", textDecoration: "none" }}>(901) 443-7461</a>
                    </p>
                </Row>

                <AddressComponent />

                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>

                <NavigationLinks user={user} currentPage="about-us" />
            </Container>

        </div>
    );
};

export default AboutUs;
