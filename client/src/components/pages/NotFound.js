import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import logo from "../../img/transparent_white_red.png";

const NotFound = () => {
	const styles = getBackgroundStyles();
	return (
		<div id="cover" style={styles.container}>
			<Container>
				<Row className="justify-content-center m-2">
					<img src={logo} alt="Diesel Down Logo" style={{ maxWidth: '60%', height: 'auto', marginBottom: '20px' }} />
				</Row>
				<br />
				<br />
				<h1>🥺 Not Found 🥺</h1>
				<br />
				<p>The page you are looking for does not exist...</p>
			</Container>
		</div>
	)
}

export default NotFound;