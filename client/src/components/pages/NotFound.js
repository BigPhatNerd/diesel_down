import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { getBackgroundStyles } from "../helpers/backgroundStyles";

const NotFound = () => {
	const styles = getBackgroundStyles();
	return (
		<div id="cover" style={styles.container}>
			<Container>
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